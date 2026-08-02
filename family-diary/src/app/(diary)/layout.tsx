import Link from "next/link";
import { getFamilySettings, getKids } from "@/lib/data";
import { createDraft } from "@/actions/entries";
import { logoutAction } from "@/actions/auth";
import { Avatar } from "@/components/ui/Avatar";

const NAV = [
  { href: "/", label: "Timeline" },
  { href: "/trips", label: "Trips" },
  { href: "/milestones", label: "Milestones" },
  { href: "/on-this-day", label: "On this day" },
  { href: "/settings", label: "Settings" },
];

export default async function DiaryLayout({ children }: { children: React.ReactNode }) {
  const [family, kids] = await Promise.all([getFamilySettings(), getKids()]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <span className="text-2xl" aria-hidden>
                🏡
              </span>
              <span className="font-display text-xl sm:text-2xl font-semibold truncate">
                {family.familyName}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex -space-x-2">
                {kids.map((kid) => (
                  <Link key={kid.id} href={`/kids/${kid.id}`} title={kid.name}>
                    <Avatar
                      name={kid.name}
                      imageUrl={kid.avatarUrl}
                      accentColor={kid.accentColor}
                      size={32}
                    />
                  </Link>
                ))}
              </div>
              <form action={createDraft}>
                <button
                  type="submit"
                  className="rounded-full bg-terracotta hover:bg-terracotta-deep text-card font-semibold text-sm px-4 py-2 transition-colors"
                >
                  + New entry
                </button>
              </form>
            </div>
          </div>
          <nav className="flex items-center gap-1 overflow-x-auto pb-2 -mb-px text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-ink-soft hover:text-ink hover:bg-cream transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <form action={logoutAction} className="ml-auto">
              <button
                type="submit"
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-ink-faint hover:text-ink transition-colors"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      <footer className="max-w-4xl mx-auto px-6 pb-10 text-center text-xs text-ink-faint">
        {family.tagline ?? "Made with love, for us."}
      </footer>
    </div>
  );
}
