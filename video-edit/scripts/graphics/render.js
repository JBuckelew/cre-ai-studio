// Step 7: a graphic on every word.
// Renders each beat's graphic as a transparent web page with Puppeteer.
//   node render.js <job.json> video   -> frames/*.png + overlay.ffconcat (entrance, hold, exit)
//   node render.js <job.json> stills  -> stills/beat_<id>.png (fully-entered state, for the storyboard)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const here = path.dirname(fileURLToPath(import.meta.url));
const [jobPath, mode = "video"] = process.argv.slice(2);
if (!jobPath) {
  console.error("usage: node render.js <job.json> video|stills");
  process.exit(1);
}
const job = JSON.parse(fs.readFileSync(jobPath, "utf8"));
const outDir = path.dirname(jobPath);
const { width: W, height: H, fps } = job;
const ENTER = Math.round(fps * 0.27);
const EXIT = Math.round(fps * 0.17);

const browser = await puppeteer.launch({ headless: true, args: ["--allow-file-access-from-files", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(here, "template.html")).href);
await page.evaluate((b, w, h) => window.setup(b, w, h), job.brand, W, H);
await page.evaluate(() => window.ready());

const shot = async file => page.screenshot({ path: file, omitBackground: true, type: "png" });
const show = async beat => {
  const g = { ...beat.graphic };
  if (g.type === "image" && g.src) g.src_url = pathToFileURL(path.resolve(job.kit, g.src)).href;
  await page.evaluate((g, z, f, w, h) => window.show(g, z, f, w, h), g, job.zone, beat.face, W, H);
  await page.evaluate(() => window.ready());
};

if (mode === "stills") {
  const dir = path.join(outDir, "stills");
  fs.mkdirSync(dir, { recursive: true });
  for (const beat of job.beats) {
    await show(beat);
    await page.evaluate(n => window.frame(1, 0, n), 99);
    await shot(path.join(dir, `beat_${beat.id}.png`));
  }
  console.log(`${job.beats.length} storyboard stills -> ${dir}`);
} else {
  const dir = path.join(outDir, "frames");
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  await page.evaluate(() => window.show(null));
  await shot(path.join(dir, "blank.png"));

  // Timeline in whole frames so nothing drifts over a long video.
  const total = Math.round(job.duration * fps);
  const timeline = [];
  let cursor = 0, n = 0;
  const push = (file, frames) => { if (frames > 0) { timeline.push([file, frames]); cursor += frames; } };
  const frame = async (enter, exit, reveal) => {
    await page.evaluate((a, b, c) => window.frame(a, b, c), enter, exit, reveal);
    const f = `f_${String(++n).padStart(6, "0")}.png`;
    await shot(path.join(dir, f));
    return f;
  };

  for (const beat of job.beats) {
    if (!beat.graphic || beat.graphic.type === "none") continue;
    const s = Math.max(Math.round(beat.g_start * fps), cursor);
    const e = Math.min(Math.round(beat.g_end * fps), total);
    if (e - s < ENTER + EXIT + 2) continue;
    push("blank.png", s - cursor);
    await show(beat);
    const reveals = (beat.reveal_at || []).map(t => Math.round(t * fps) - s);
    const shown = f => reveals.length ? reveals.filter(r => r <= f).length : 99;
    for (let i = 0; i < ENTER; i++) push(await frame((i + 1) / ENTER, 0, shown(i)), 1);
    // Hold, split wherever a list item reveals.
    const holdEnd = e - s - EXIT;
    const cuts = [ENTER, ...reveals.filter(r => r > ENTER && r < holdEnd), holdEnd];
    for (let i = 0; i < cuts.length - 1; i++) push(await frame(1, 0, shown(cuts[i])), cuts[i + 1] - cuts[i]);
    for (let i = 0; i < EXIT; i++) push(await frame(1, (i + 1) / EXIT, shown(holdEnd)), 1);
  }
  push("blank.png", total - cursor);

  const lines = ["ffconcat version 1.0"];
  for (const [file, frames] of timeline) lines.push(`file 'frames/${file}'`, `duration ${(frames / fps).toFixed(6)}`);
  lines.push("file 'frames/blank.png'"); // concat demuxer ignores the last entry's duration
  fs.writeFileSync(path.join(outDir, "overlay.ffconcat"), lines.join("\n") + "\n");
  console.log(`${n} graphic frames over ${job.beats.filter(b => b.graphic?.type && b.graphic.type !== "none").length} beats -> ${outDir}`);
}
await browser.close();
