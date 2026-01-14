import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, UserPlus, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function AdminPage() {
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