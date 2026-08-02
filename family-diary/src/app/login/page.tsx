import { getFamilySettings } from "@/lib/data";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const family = await getFamilySettings();
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-4xl mb-3" aria-hidden>
            🏡
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink">{family.familyName}</h1>
          {family.tagline && <p className="mt-2 text-ink-soft italic">{family.tagline}</p>}
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-line p-8">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-ink-faint mt-6">
          A private diary, just for our family.
        </p>
      </div>
    </main>
  );
}
