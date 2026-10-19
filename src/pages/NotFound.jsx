import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found | CRE AI Studio",
    description: "The page you were looking for could not be found.",
    robots: "noindex, nofollow",
    appendSiteName: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-6xl font-light text-slate-300">404</p>
        <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-600 leading-relaxed">
          The page you were looking for doesn't exist or may have been moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}