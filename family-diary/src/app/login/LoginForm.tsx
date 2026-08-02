"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink-soft mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-ink outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-ink-soft mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-ink outline-none focus:border-terracotta transition-colors"
        />
      </div>
      {state.error && (
        <p className="text-sm text-terracotta-deep bg-terracotta/10 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-terracotta hover:bg-terracotta-deep text-card font-semibold py-2.5 transition-colors disabled:opacity-60"
      >
        {pending ? "Coming in…" : "Come on in"}
      </button>
    </form>
  );
}
