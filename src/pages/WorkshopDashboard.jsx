import React, { useEffect, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, Wallet } from "lucide-react";

const SOURCES = {
  "cre-ai-studio": { label: "CRE AI Studio", keepPct: 1.0, partner: null },
  "cre-daily": { label: "CRE Daily", keepPct: 0.5, partner: "CRE Daily" },
  "mfn": { label: "Multifamily Media Network", keepPct: 0.75, partner: "MMN" },
};

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);

export default function WorkshopDashboard() {
  usePageMeta({ title: "Workshop Dashboard", path: "/WorkshopDashboard", noindex: true });
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [pwAuthed, setPwAuthed] = useState(() => sessionStorage.getItem("wdAuthed") === "true");
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pwAuthed) return;
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser?.role !== "admin") {
          window.location.href = "/";
          return;
        }
        setUser(currentUser);
      } catch {
        window.location.href = "/";
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [pwAuthed]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwLoading(true);
    setPwError(false);
    try {
      const res = await base44.functions.invoke("verifyWorkshopDashboardPassword", { password: pwInput });
      if (res.authorized) {
        sessionStorage.setItem("wdAuthed", "true");
        setPwAuthed(true);
      } else {
        setPwError(true);
      }
    } catch {
      setPwError(true);
    }
    setPwLoading(false);
  };

  const { data: signups = [], isLoading } = useQuery({
    queryKey: ["workshopSignups"],
    queryFn: () => base44.entities.WorkshopSignup.list("-created_date"),
    enabled: !!user,
  });

  // Auto-update when a new signup lands
  useEffect(() => {
    if (!user) return;
    const unsubscribe = base44.entities.WorkshopSignup.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ["workshopSignups"] });
    });
    return unsubscribe;
  }, [user, queryClient]);

  if (!pwAuthed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Access</h1>
            <p className="text-sm text-slate-500 mb-6">Enter the password to view the workshop dashboard.</p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                autoFocus
                className="h-11"
              />
              {pwError && <p className="text-sm text-red-600">Incorrect password. Try again.</p>}
              <Button
                type="submit"
                disabled={pwLoading || !pwInput}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {pwLoading ? "Checking..." : "Unlock Dashboard"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!authChecked || (isLoading && !signups.length)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  const totalSignups = signups.length;
  const totalRevenue = signups.reduce((sum, s) => sum + (s.amount || 0), 0);

  const bySource = Object.keys(SOURCES).reduce((acc, key) => {
    acc[key] = { ...SOURCES[key], signups: 0, revenue: 0 };
    return acc;
  }, {});

  signups.forEach((s) => {
    const src = bySource[s.source];
    if (src) {
      src.signups++;
      src.revenue += s.amount || 0;
    }
  });

  const netRevenue = Object.values(bySource).reduce(
    (sum, s) => sum + s.revenue * s.keepPct,
    0
  );
  const owedCREDaily = bySource["cre-daily"].revenue * 0.5;
  const owedMMN = bySource["mfn"].revenue * 0.25;
  const totalOwed = owedCREDaily + owedMMN;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workshop Signup Dashboard</h1>
        <p className="text-slate-500 mb-8">
          Live tracking of Vibe Code Workshop signups by referral source
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Signups</p>
                  <p className="text-3xl font-bold text-slate-900">{totalSignups}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">{fmt(totalRevenue)}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Net Revenue (Our Share)</p>
                  <p className="text-3xl font-bold text-slate-900">{fmt(netRevenue)}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Owed to Partners</p>
                  <p className="text-3xl font-bold text-slate-900">{fmt(totalOwed)}</p>
                </div>
                <Wallet className="w-10 h-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Signups by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Source</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Signups</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Our Share</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Partner Share</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(bySource).map(([key, src]) => (
                    <tr key={key} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{src.label}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-700">{src.signups}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-700">{fmt(src.revenue)}</td>
                      <td className="py-3 px-4 text-sm text-right text-green-600 font-medium">
                        {fmt(src.revenue * src.keepPct)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-orange-600 font-medium">
                        {fmt(src.revenue * (1 - src.keepPct))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Partner Payouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Owed to CRE Daily</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-600">{fmt(owedCREDaily)}</p>
              <p className="text-sm text-slate-500 mt-2">50% of CRE Daily referral revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Owed to Multifamily Media Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-600">{fmt(owedMMN)}</p>
              <p className="text-sm text-slate-500 mt-2">25% of MMN referral revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Source</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm text-slate-400">
                        No signups yet
                      </td>
                    </tr>
                  )}
                  {signups.slice(0, 20).map((s) => (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm text-slate-700">{s.email || "N/A"}</td>
                      <td className="py-3 px-4 text-sm text-slate-700">
                        {SOURCES[s.source]?.label || s.source}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-slate-700">{fmt(s.amount)}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {new Date(s.created_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}