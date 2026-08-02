"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Editor } from "@tiptap/react";
import type { Entry, FamilyMember, Media, Trip } from "@/db/schema";
import {
  deleteEntry,
  deleteMediaRow,
  publishEntry,
  saveEntry,
  unpublishEntry,
  type SaveEntryInput,
} from "@/actions/entries";
import { TiptapEditor } from "./TiptapEditor";
import { PhotoUploader } from "./PhotoUploader";
import { AudioRecorder } from "./AudioRecorder";
import { AudioBlock } from "@/components/entry/AudioBlock";
import { Avatar } from "@/components/ui/Avatar";

type SaveState = "clean" | "dirty" | "saving" | "saved";

export function EntryEditor({
  entry,
  initialMedia,
  kids,
  trips,
  initialTagNames,
  initialKidIds,
}: {
  entry: Entry;
  initialMedia: Media[];
  kids: FamilyMember[];
  trips: Trip[];
  initialTagNames: string[];
  initialKidIds: string[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(entry.title ?? "");
  const [entryDate, setEntryDate] = useState(entry.entryDate);
  const [entryType, setEntryType] = useState<Entry["entryType"]>(entry.entryType);
  const [milestoneLabel, setMilestoneLabel] = useState(entry.milestoneLabel ?? "");
  const [tripId, setTripId] = useState(entry.tripId ?? "");
  const [kidIds, setKidIds] = useState<string[]>(initialKidIds);
  const [tagsInput, setTagsInput] = useState(initialTagNames.join(", "));
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [isPending, startTransition] = useTransition();

  const bodyRef = useRef<unknown>(entry.body ?? null);
  const editorRef = useRef<Editor | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const collectInput = useCallback((): SaveEntryInput => {
    return {
      id: entry.id,
      title,
      body: bodyRef.current,
      entryDate,
      entryType,
      milestoneLabel: milestoneLabel || null,
      tripId: tripId || null,
      kidIds,
      tagNames: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
  }, [entry.id, title, entryDate, entryType, milestoneLabel, tripId, kidIds, tagsInput]);

  const collectRef = useRef(collectInput);
  collectRef.current = collectInput;

  const doSave = useCallback(async () => {
    setSaveState("saving");
    try {
      await saveEntry(collectRef.current());
      setSaveState("saved");
    } catch {
      setSaveState("dirty");
    }
  }, []);

  const scheduleSave = useCallback(() => {
    setSaveState("dirty");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(doSave, 1500);
  }, [doSave]);

  // Any field change schedules an autosave (skip initial mount).
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    scheduleSave();
  }, [title, entryDate, entryType, milestoneLabel, tripId, kidIds, tagsInput, scheduleSave]);

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  function toggleKid(id: string) {
    setKidIds((prev) => (prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]));
  }

  async function handlePublish() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    startTransition(async () => {
      await saveEntry(collectRef.current());
      await publishEntry(entry.id);
    });
  }

  function handleDelete() {
    if (!confirm("Delete this memory forever? This can't be undone.")) return;
    startTransition(async () => {
      await deleteEntry(entry.id);
    });
  }

  async function handleDeleteMedia(id: string) {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    await deleteMediaRow(id);
  }

  const photos = media.filter((m) => m.kind === "photo" && !m.inline);
  const audio = media.filter((m) => m.kind === "audio");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5 text-sm">
        <span className="text-ink-faint">
          {entry.status === "draft" ? "Draft" : "Published"} ·{" "}
          <span data-testid="save-state">
            {saveState === "saving"
              ? "Saving…"
              : saveState === "saved"
                ? "Saved just now"
                : saveState === "dirty"
                  ? "Unsaved changes"
                  : "Up to date"}
          </span>
        </span>
        <div className="flex gap-2">
          {entry.status === "draft" ? (
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPending}
              data-testid="publish-button"
              className="rounded-full bg-terracotta hover:bg-terracotta-deep text-card font-semibold px-5 py-2 transition-colors disabled:opacity-60"
            >
              {isPending ? "Publishing…" : "Publish memory"}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => startTransition(async () => {
                  await saveEntry(collectRef.current());
                  router.push(`/entries/${entry.id}`);
                })}
                disabled={isPending}
                data-testid="done-button"
                className="rounded-full bg-terracotta hover:bg-terracotta-deep text-card font-semibold px-5 py-2 transition-colors disabled:opacity-60"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => startTransition(async () => unpublishEntry(entry.id))}
                disabled={isPending}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
              >
                Back to draft
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-line p-6 sm:p-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give this memory a name…"
          data-testid="title-input"
          className="w-full font-display text-3xl font-semibold text-ink placeholder:text-ink-faint outline-none bg-transparent"
        />

        <div className="flex flex-wrap items-center gap-3 mt-4 pb-4 border-b border-line">
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            data-testid="date-input"
            className="rounded-xl border border-line bg-cream px-3 py-1.5 text-sm outline-none focus:border-terracotta"
          />
          <div className="flex rounded-xl border border-line overflow-hidden text-sm font-semibold">
            {(["daily", "trip", "milestone"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setEntryType(t)}
                data-testid={`type-${t}`}
                className={`px-3 py-1.5 capitalize transition-colors ${
                  entryType === t ? "bg-terracotta text-card" : "text-ink-soft hover:bg-cream"
                }`}
              >
                {t === "daily" ? "Everyday" : t}
              </button>
            ))}
          </div>
          {entryType === "milestone" && (
            <input
              value={milestoneLabel}
              onChange={(e) => setMilestoneLabel(e.target.value)}
              placeholder='e.g. "First steps"'
              data-testid="milestone-input"
              className="rounded-xl border border-gold bg-gold/10 px-3 py-1.5 text-sm outline-none"
            />
          )}
          {entryType === "trip" && (
            <select
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              data-testid="trip-select"
              className="rounded-xl border border-sage bg-sage/10 px-3 py-1.5 text-sm outline-none"
            >
              <option value="">Which trip?</option>
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {kids.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-3 border-b border-line">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Who&apos;s in it?
            </span>
            {kids.map((kid) => {
              const active = kidIds.includes(kid.id);
              return (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => toggleKid(kid.id)}
                  data-testid={`kid-toggle-${kid.name.replace(/\s+/g, "-").toLowerCase()}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border pl-1 pr-3 py-0.5 text-sm font-medium transition-all ${
                    active
                      ? "border-transparent text-card"
                      : "border-line text-ink-soft hover:border-ink-faint bg-cream"
                  }`}
                  style={active ? { backgroundColor: kid.accentColor ?? "#c4664b" } : undefined}
                >
                  <Avatar
                    name={kid.name}
                    imageUrl={kid.avatarUrl}
                    accentColor={kid.accentColor}
                    size={22}
                  />
                  {kid.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <TiptapEditor
            initialContent={entry.body}
            onUpdate={(json) => {
              bodyRef.current = json;
              scheduleSave();
            }}
            onEditorReady={(editor) => {
              editorRef.current = editor;
              bodyRef.current = editor.getJSON();
            }}
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-line">
          <PhotoUploader
            entryId={entry.id}
            onUploaded={(m) => {
              setMedia((prev) => [...prev, m]);
              setSaveState("saved");
            }}
          />
          <AudioRecorder
            entryId={entry.id}
            onUploaded={(m) => {
              setMedia((prev) => [...prev, m]);
              router.refresh();
            }}
          />
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt=""
                  className="w-full aspect-square object-cover rounded-xl border border-line"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(photo.id)}
                  aria-label="Remove photo"
                  className="absolute top-1 right-1 rounded-full bg-ink/70 text-card w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {audio.length > 0 && (
          <div className="space-y-3 mt-4">
            {audio.map((m) => (
              <div key={m.id} className="relative group">
                <AudioBlock media={m} editable />
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(m.id)}
                  aria-label="Remove recording"
                  className="absolute top-2 right-2 rounded-full bg-ink/70 text-card w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-line">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-faint block mb-1">
            Tags <span className="normal-case font-normal">(comma separated)</span>
          </label>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="beach, grandma, first snow…"
            className="w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleDelete}
          className="text-xs text-ink-faint hover:text-terracotta-deep transition-colors"
        >
          Delete this memory
        </button>
      </div>
    </div>
  );
}
