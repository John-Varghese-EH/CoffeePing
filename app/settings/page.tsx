"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/components/ui/use-toast";
import { SettingsSkeleton } from "@/components/skeletons";
import {
  User,
  Mail,
  Shield,
  Trash2,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
  Server,
  Bell,
  Globe,
  AlertTriangle,
  Download,
  Coffee,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

type AccountInfo = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  counts: { servers: number; notifications: number; statusPages: number };
};

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Profile form
  const [displayName, setDisplayName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Danger zone
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Auth guard
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [supabase, router]);

  // Fetch account
  useEffect(() => {
    if (!authChecked) return;
    const fetchAccount = async () => {
      try {
        const res = await fetch("/api/account");
        if (res.ok) {
          const data = await res.json();
          setAccount(data);
          setDisplayName(data.name || "");
        } else if (res.status === 401) {
          router.push("/login");
        }
      } catch {
        toast({ title: "Failed to load account info", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [authChecked, router, toast]);

  async function saveProfile() {
    setSavingProfile(true);
    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName }),
      });
      if (res.ok) {
        toast({ title: "Profile updated", description: "Your display name has been saved." });
        setAccount((prev) => prev ? { ...prev, name: displayName } : prev);
      } else {
        const data = await res.json();
        toast({ title: "Update failed", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword() {
    if (newPassword.length < 8) {
      toast({ title: "Password too short", description: "Must be at least 8 characters.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      if (res.ok) {
        toast({ title: "Password changed", description: "Your new password is active." });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        toast({ title: "Failed to change password", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setSavingPassword(false);
    }
  }

  async function deleteAccount() {
    if (deleteConfirm !== "DELETE") {
      toast({ title: "Type DELETE to confirm", variant: "destructive" });
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Account deleted", description: "All your data has been removed." });
        await supabase.auth.signOut();
        router.push("/");
      } else {
        toast({ title: "Failed to delete account", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  }

  async function exportData() {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `coffeeping-export-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Data exported", description: "Your data has been downloaded." });
      }
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    }
  }

  if (!authChecked || loading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard/notifications">
              <Bell className="h-4 w-4" />
              Alerts
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard/status-pages">
              <Globe className="h-4 w-4" />
              Status Pages
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="gap-2 bg-coffee hover:bg-coffee-light text-white">
            <Link href="/settings">
              <Coffee className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  value={account?.email || ""}
                  disabled
                  className="bg-muted"
                />
                <Badge variant="outline" className="shrink-0">
                  <Mail className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Joined {account?.createdAt ? new Date(account.createdAt).toLocaleDateString() : "—"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Server className="h-3.5 w-3.5" />
                {account?.counts.servers || 0} servers
              </span>
              <span className="inline-flex items-center gap-1">
                <Bell className="h-3.5 w-3.5" />
                {account?.counts.notifications || 0} channels
              </span>
            </div>

            <Button
              onClick={saveProfile}
              disabled={savingProfile || displayName === (account?.name || "")}
              className="bg-coffee hover:bg-coffee-light text-white"
            >
              {savingProfile ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={8}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords don&apos;t match</p>
              )}
            </div>

            <Button
              onClick={changePassword}
              disabled={savingPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              variant="outline"
            >
              {savingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Export
            </CardTitle>
            <CardDescription>Download all your monitoring data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export your servers, ping history, and monitoring stats as a JSON file.
            </p>
            <Button variant="outline" onClick={exportData} className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <h4 className="font-semibold mb-1">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This will permanently delete all your servers, ping history, incidents, notification channels, and status pages. This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder='Type "DELETE" to confirm'
                  className="sm:w-64"
                />
                <Button
                  variant="destructive"
                  onClick={deleteAccount}
                  disabled={deleting || deleteConfirm !== "DELETE"}
                  className="gap-2"
                >
                  {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
