import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Film, Users, FileText, FileIcon, Megaphone, 
  Calendar, Building2, Settings, Shield, 
  Plus, BarChart3, LayoutGrid 
} from "lucide-react";
import Link from "next/link";

const adminSections = [
  { id: "cinema", title: "Cinema", icon: Film, description: "Manage New CRT & Student's Vote screenings", href: "/admin/cinema" },
  { id: "students-cut", title: "Student's Vote", icon: Film, description: "Rotation, recommendations, polls, winners", href: "/admin/students-cut" },
  { id: "awaz-do", title: "Awaz Do", icon: FileText, description: "Articles, bulletins, Drive PDFs", href: "/admin/awaz-do" },
  { id: "notices", title: "Notices", icon: FileText, description: "Notice board management", href: "/admin/notices" },
  { id: "events", title: "Events", icon: Calendar, description: "Events calendar management", href: "/admin/events" },
  { id: "students", title: "Alumni", icon: Users, description: "Profiles, alumni directory, portfolios", href: "/admin/students" },
  { id: "academic", title: "Academic Structure", icon: Building2, description: "Wings, departments, batches, groups", href: "/admin/academic" },
  { id: "users", title: "Users & Roles", icon: Shield, description: "User accounts and role management", href: "/admin/users" },
  { id: "analytics", title: "Analytics", icon: BarChart3, description: "Platform usage and engagement", href: "/admin/analytics" },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage all aspects of the SRFTI Student Union platform</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <LayoutGrid className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="cinema">Cinema</TabsTrigger>
            <TabsTrigger value="students-cut">Student's Vote</TabsTrigger>
            <TabsTrigger value="awaz-do">Awaz Do</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {adminSections.map(section => (
                <Card key={section.id} className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="pt-6">
                    <Link href={section.href} className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-1">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                      <Button variant="ghost" className="mt-auto w-full justify-start">
                        Manage →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cinema">
            <AdminSectionCards sections={adminSections.filter(s => ["cinema"].includes(s.id))} />
          </TabsContent>

          <TabsContent value="students-cut">
            <AdminSectionCards sections={adminSections.filter(s => ["students-cut"].includes(s.id))} />
          </TabsContent>

          <TabsContent value="awaz-do">
            <AdminSectionCards sections={adminSections.filter(s => ["awaz-do"].includes(s.id))} />
          </TabsContent>

          <TabsContent value="community">
            <AdminSectionCards sections={adminSections.filter(s => ["notices", "events", "students"].includes(s.id))} />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSectionCards sections={adminSections.filter(s => ["academic", "users", "analytics"].includes(s.id))} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function AdminSectionCards({ sections }: { sections: typeof adminSections }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sections.map(section => (
        <Card key={section.id} className="h-full transition-shadow hover:shadow-lg">
          <CardContent className="pt-6">
            <Link href={section.href} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg mb-1">{section.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <Button variant="ghost" className="mt-auto w-full justify-start">
                Manage →
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}