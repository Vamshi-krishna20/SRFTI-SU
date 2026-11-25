"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const wings = ["Film Wing", "Electronic Dance Music"];
const departments = ["Direction", "Cinematography", "Editing", "Sound Recording & Design", "Producing", "Screenwriting", "Animation", "Film Studies", "Electronic Music Production", "Sound Design", "Music Technology", "Performance & DJ"];
const batches = ["2025", "2024", "2023", "2022", "2021"];
const groups = ["A", "B", "C", "D"];

export default function StudentProfileEditPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "Arjun Patel",
    email: "arjun.patel@srfti.ac.in",
    phone: "+91 98765 43210",
    instagram: "@arjunpatel_films",
    linkedin: "arjun-patel-srfti",
    website: "arjunpatel.com",
    bio: "Third-year Direction student passionate about narrative cinema and visual storytelling.",
    wing: "Film Wing",
    department: "Direction",
    batch: "2023",
    group: "A",
    specialisation: "Narrative Direction",
    visibility: { phone: true, instagram: true, linkedin: true, website: true, other: true },
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        visibility: { ...prev.visibility, [name]: (e.target as HTMLInputElement).checked }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    router.refresh();
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your public profile and visibility settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" /> Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                  <img src={formData.photo_url} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <Button type="button" variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" /> Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG up to 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
              <TabsTrigger value="bio">Bio</TabsTrigger>
            </TabsList>

            {/* Basic Info */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="example.com" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="username" />
                </div>
              </div>
            </TabsContent>

            {/* Academic */}
            <TabsContent value="academic" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="wing">Wing</Label>
                  <Select value={formData.wing} onValueChange={v => setFormData(prev => ({ ...prev, wing: v ?? prev.wing }))}>
                    <SelectTrigger><SelectValue placeholder="Select wing" /></SelectTrigger>
                    <SelectContent>{wings.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={v => setFormData(prev => ({ ...prev, department: v ?? prev.department }))}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Select value={formData.batch} onValueChange={v => setFormData(prev => ({ ...prev, batch: v ?? prev.batch }))}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>{batches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group">Group</Label>
                  <Select value={formData.group} onValueChange={v => setFormData(prev => ({ ...prev, group: v ?? prev.group }))}>
                    <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                    <SelectContent>{groups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialisation">Specialisation</Label>
                <Input id="specialisation" name="specialisation" value={formData.specialisation} onChange={handleChange} placeholder="e.g., Narrative Direction" />
              </div>
            </TabsContent>

            {/* Visibility */}
            <TabsContent value="visibility" className="space-y-6">
              <p className="text-muted-foreground">Control which contact details are visible on your public profile.</p>
              <div className="space-y-4">
{[
  { key: "phone" as const, label: "Phone Number", icon: "📞" },
  { key: "instagram" as const, label: "Instagram", icon: "📷" },
  { key: "linkedin" as const, label: "LinkedIn", icon: "💼" },
  { key: "website" as const, label: "Website", icon: "🌐" },
  { key: "other" as const, label: "Other Links", icon: "🔗" },
].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label className="font-normal cursor-pointer flex items-center gap-2">{item.icon} {item.label}</Label>
                    <Switch
                      checked={formData.visibility[item.key]}
                      onCheckedChange={checked => setFormData(prev => ({ ...prev, visibility: { ...prev.visibility, [item.key]: checked } }))}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Bio */}
            <TabsContent value="bio" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about yourself, your interests, your filmmaking journey..."
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">This will be displayed on your public profile page.</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}