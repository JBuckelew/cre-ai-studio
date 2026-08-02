import { getFamilySettings, getKids, getTrips } from "@/lib/data";
import {
  changePassword,
  deleteKid,
  deleteTrip,
  saveFamilySettings,
  saveKid,
  saveTrip,
} from "@/actions/settings";
import { Avatar } from "@/components/ui/Avatar";
import { formatDateShort } from "@/lib/dates";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-xl border border-line bg-cream px-3 py-2 text-sm outline-none focus:border-terracotta w-full";
const buttonClass =
  "rounded-full bg-terracotta hover:bg-terracotta-deep text-card text-sm font-semibold px-4 py-1.5 transition-colors";
const smallLabel = "block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1";

export default async function SettingsPage() {
  const [family, kids, trips] = await Promise.all([getFamilySettings(), getKids(), getTrips()]);

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <h1 className="font-display text-4xl font-semibold">Settings</h1>

      <section className="bg-card rounded-2xl border border-line p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Our family</h2>
        <form action={saveFamilySettings} className="space-y-3">
          <div>
            <label className={smallLabel}>Family name (shown in the header)</label>
            <input name="familyName" defaultValue={family.familyName} className={inputClass} />
          </div>
          <div>
            <label className={smallLabel}>Tagline</label>
            <input name="tagline" defaultValue={family.tagline ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={smallLabel}>Cover image</label>
            <input name="coverImage" type="file" accept="image/*" className="text-sm" />
          </div>
          <button type="submit" className={buttonClass}>
            Save
          </button>
        </form>
      </section>

      <section className="bg-card rounded-2xl border border-line p-6">
        <h2 className="font-display text-2xl font-semibold mb-1">The kids</h2>
        <p className="text-sm text-ink-soft mb-4">
          Their birthdays power the &ldquo;how old were they&rdquo; magic on every entry.
        </p>
        <div className="space-y-6">
          {kids.map((kid) => (
            <div key={kid.id} className="border border-line rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  name={kid.name}
                  imageUrl={kid.avatarUrl}
                  accentColor={kid.accentColor}
                  size={40}
                />
                <span className="font-semibold">{kid.name}</span>
              </div>
              <form action={saveKid} className="grid sm:grid-cols-2 gap-3">
                <input type="hidden" name="id" value={kid.id} />
                <div>
                  <label className={smallLabel}>Name</label>
                  <input name="name" defaultValue={kid.name} className={inputClass} />
                </div>
                <div>
                  <label className={smallLabel}>Birthday</label>
                  <input
                    name="birthdate"
                    type="date"
                    defaultValue={kid.birthdate}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={smallLabel}>Accent color</label>
                  <input
                    name="accentColor"
                    type="color"
                    defaultValue={kid.accentColor ?? "#c4664b"}
                    className="h-9 w-16 rounded-lg border border-line bg-cream"
                  />
                </div>
                <div>
                  <label className={smallLabel}>Photo</label>
                  <input name="avatar" type="file" accept="image/*" className="text-sm" />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <button type="submit" className={buttonClass}>
                    Save {kid.name}
                  </button>
                </div>
              </form>
              <form action={deleteKid} className="mt-2">
                <input type="hidden" name="id" value={kid.id} />
                <button
                  type="submit"
                  className="text-xs text-ink-faint hover:text-terracotta-deep transition-colors"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}

          <details className="border border-dashed border-line rounded-xl p-4">
            <summary className="cursor-pointer text-sm font-semibold text-ink-soft">
              + Add a family member
            </summary>
            <form action={saveKid} className="grid sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className={smallLabel}>Name</label>
                <input name="name" required className={inputClass} />
              </div>
              <div>
                <label className={smallLabel}>Birthday</label>
                <input name="birthdate" type="date" required className={inputClass} />
              </div>
              <div>
                <label className={smallLabel}>Accent color</label>
                <input
                  name="accentColor"
                  type="color"
                  defaultValue="#7c8f6f"
                  className="h-9 w-16 rounded-lg border border-line bg-cream"
                />
              </div>
              <div>
                <label className={smallLabel}>Photo</label>
                <input name="avatar" type="file" accept="image/*" className="text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className={buttonClass}>
                  Add
                </button>
              </div>
            </form>
          </details>
        </div>
      </section>

      <section className="bg-card rounded-2xl border border-line p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Trips</h2>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="border border-line rounded-xl p-4">
              <p className="font-semibold">
                {trip.name}{" "}
                <span className="text-xs text-ink-faint font-normal">
                  {formatDateShort(trip.startDate)}
                  {trip.endDate ? ` – ${formatDateShort(trip.endDate)}` : ""}
                </span>
              </p>
              <form action={saveTrip} className="grid sm:grid-cols-2 gap-3 mt-3">
                <input type="hidden" name="id" value={trip.id} />
                <div>
                  <label className={smallLabel}>Name</label>
                  <input name="name" defaultValue={trip.name} className={inputClass} />
                </div>
                <div>
                  <label className={smallLabel}>Blurb</label>
                  <input name="blurb" defaultValue={trip.blurb ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={smallLabel}>Start</label>
                  <input
                    name="startDate"
                    type="date"
                    defaultValue={trip.startDate}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={smallLabel}>End</label>
                  <input
                    name="endDate"
                    type="date"
                    defaultValue={trip.endDate ?? ""}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={smallLabel}>Cover image</label>
                  <input name="coverImage" type="file" accept="image/*" className="text-sm" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <button type="submit" className={buttonClass}>
                    Save
                  </button>
                </div>
              </form>
              <form action={deleteTrip} className="mt-2">
                <input type="hidden" name="id" value={trip.id} />
                <button
                  type="submit"
                  className="text-xs text-ink-faint hover:text-terracotta-deep transition-colors"
                >
                  Delete trip
                </button>
              </form>
            </div>
          ))}

          <details className="border border-dashed border-line rounded-xl p-4">
            <summary className="cursor-pointer text-sm font-semibold text-ink-soft">
              + Add a trip
            </summary>
            <form action={saveTrip} className="grid sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className={smallLabel}>Name</label>
                <input name="name" required className={inputClass} placeholder="Beach Week 2027" />
              </div>
              <div>
                <label className={smallLabel}>Blurb</label>
                <input name="blurb" className={inputClass} />
              </div>
              <div>
                <label className={smallLabel}>Start</label>
                <input name="startDate" type="date" required className={inputClass} />
              </div>
              <div>
                <label className={smallLabel}>End</label>
                <input name="endDate" type="date" className={inputClass} />
              </div>
              <div>
                <label className={smallLabel}>Cover image</label>
                <input name="coverImage" type="file" accept="image/*" className="text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className={buttonClass}>
                  Add trip
                </button>
              </div>
            </form>
          </details>
        </div>
      </section>

      <section className="bg-card rounded-2xl border border-line p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Change my password</h2>
        <form action={changePassword} className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={smallLabel}>Current password</label>
            <input name="current" type="password" required className={inputClass} />
          </div>
          <div>
            <label className={smallLabel}>New password (8+ characters)</label>
            <input name="next" type="password" required minLength={8} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={buttonClass}>
              Update password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
