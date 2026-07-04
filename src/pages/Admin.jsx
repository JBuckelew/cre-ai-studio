import React, { useState, useEffect } from 'react';
import { usePageMeta } from "@/hooks/usePageMeta";
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, UserPlus, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function AdminPage() {
  usePageMeta({ title: "Admin", path: "/Admin", noindex: true });
  const [user, setUser] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser?.role !== 'admin') {
          window.location.href = '/';
          return;
        }
        setUser(currentUser);
      } catch (error) {
        window.location.href = '/';
      }
    };
    checkAuth();
  }, []);

  const { data: emailSignups = [], isLoading } = useQuery({
    queryKey: ['emailSignups'],
    queryFn: () => base44.entities.EmailSignup.list(),
    enabled: !!user,
  });

  const { data: affiliateApplications = [], isLoading: affiliatesLoading, refetch: refetchAffiliates } = useQuery({
    queryKey: ['affiliateApplications'],
    queryFn: () => base44.entities.AffiliateApplication.list('-created_date'),
    enabled: !!user,
  });

  const [affiliateLink, setAffiliateLink] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);

  const handleExportCSV = () => {
    const csv = ['Email,Source,Date\n'];
    emailSignups.forEach(signup => {
      csv.push(`${signup.email},${signup.source || 'N/A'},${new Date(signup.created_date).toLocaleDateString()}\n`);
    });
    
    const blob = new Blob(csv, { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-signups-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const handleInviteAdmin = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setIsInviting(true);
    setInviteMessage('');

    try {
      await base44.users.inviteUser(inviteEmail, 'admin');
      setInviteMessage(`✓ Admin invite sent to ${inviteEmail}`);
      setInviteEmail('');
    } catch (error) {
      setInviteMessage(`✗ Error: ${error.message}`);
    } finally {
      setIsInviting(false);
    }
  };

  const handleApproveAffiliate = async (affiliate) => {
    if (!affiliateLink.trim()) {
      alert('Please enter a Rewardful affiliate link');
      return;
    }

    try {
      await base44.entities.AffiliateApplication.update(affiliate.id, {
        status: 'approved',
        rewardful_link: affiliateLink
      });

      await base44.integrations.Core.SendEmail({
        to: affiliate.email,
        subject: 'Your CRE AI Studio Affiliate Application is Approved!',
        body: `Hi ${affiliate.name},\n\nGreat news! Your affiliate application has been approved.\n\nYour unique affiliate link: ${affiliateLink}\n\nStart sharing this link to earn commissions on every referral!\n\nBest regards,\nCRE AI Studio Team`
      });

      alert('Affiliate approved and email sent!');
      setAffiliateLink('');
      setSelectedAffiliate(null);
      refetchAffiliates();
    } catch (error) {
      alert('Error approving affiliate: ' + error.message);
    }
  };

  const handleRejectAffiliate = async (affiliate) => {
    if (!confirm(`Reject application from ${affiliate.name}?`)) return;

    try {
      await base44.entities.AffiliateApplication.update(affiliate.id, {
        status: 'rejected'
      });
      alert('Application rejected');
      refetchAffiliates();
    } catch (error) {
      alert('Error rejecting affiliate: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage users and view analytics</p>
          </div>
          <Badge className="bg-blue-600 text-white">Admin Access</Badge>
        </div>

        {/* Invite Co-Founders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Invite Co-Founders as Admins
            </CardTitle>
            <CardDescription>
              Send admin invitations to your co-founders to give them full access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteAdmin} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter co-founder email..."
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit" 
                disabled={isInviting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isInviting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invite
                  </>
                )}
              </Button>
            </form>
            {inviteMessage && (
              <p className={`mt-3 text-sm ${inviteMessage.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {inviteMessage}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Affiliate Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Affiliate Applications
            </CardTitle>
            <CardDescription>
              Total applications: {affiliateApplications.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {affiliatesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : affiliateApplications.length === 0 ? (
              <p className="text-center py-8 text-slate-500">No affiliate applications yet</p>
            ) : (
              <div className="space-y-4">
                {affiliateApplications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-slate-900">{app.name}</p>
                          <Badge 
                            variant={app.status === 'approved' ? 'default' : app.status === 'rejected' ? 'destructive' : 'outline'}
                            className={
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {app.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {app.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                            {app.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm">{app.email}</p>
                        <p className="text-slate-500 text-xs mt-1">
                          Applied: {new Date(app.created_date).toLocaleDateString()}
                        </p>
                        {app.rewardful_link && (
                          <p className="text-blue-600 text-sm mt-2 break-all">
                            Link: {app.rewardful_link}
                          </p>
                        )}
                      </div>
                      
                      {app.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          {selectedAffiliate?.id === app.id ? (
                            <div className="flex gap-2 items-center">
                              <Input
                                placeholder="Paste Rewardful link"
                                value={affiliateLink}
                                onChange={(e) => setAffiliateLink(e.target.value)}
                                className="w-64"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleApproveAffiliate(app)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedAffiliate(null);
                                  setAffiliateLink('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                onClick={() => setSelectedAffiliate(app)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectAffiliate(app)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Signups */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Signups
                </CardTitle>
                <CardDescription>
                  Total signups: {emailSignups.length}
                </CardDescription>
              </div>
              <Button 
                onClick={handleExportCSV}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : emailSignups.length === 0 ? (
              <p className="text-center py-8 text-slate-500">No email signups yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Source</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailSignups.map((signup) => (
                      <tr key={signup.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-slate-900">{signup.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{signup.source || 'N/A'}</Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {new Date(signup.created_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}