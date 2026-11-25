import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, MapPin, Filter, Archive } from "lucide-react";
import Link from "next/link";

const mockNotices = [
  { id: "1", title: "Semester Registration Deadline Extended", body: "The deadline for semester registration has been extended to Nov 30.", category: "Academic", date: "2026-11-20", venue: "Admin Office", author: "Registrar", is_archived: false },
  { id: "2", title: "Hostel Maintenance Schedule", body: "Water supply will be interrupted on Nov 25 for maintenance.", category: "Facilities", date: "2026-11-18", venue: "All Hostels", author: "Maintenance Dept", is_archived: false },
  { id: "3", title: "Library Holiday Hours", body: "Library will operate on reduced hours during the winter break.", category: "Library", date: "2026-11-15", venue: "Central Library", author: "Librarian", is_archived: false },
  { id: "4", title: "Previous: Exam Schedule Published", body: "Mid-term exam schedule for Batch 2023-2025.", category: "Academic", date: "2026-10-10", venue: "Notice Board", author: "Exam Cell", is_archived: true },
];

const categories = ["All", "Academic", "Facilities", "Library", "Admin", "Events"];

export default function NoticesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notice Board</h1>
            <p className="text-muted-foreground mt-1">Official notices, announcements, and archive</p>
          </div>
          <Button asChild>
            <Link href="/admin/notices">Manage Notices</Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              <FileText className="h-4 w-4 mr-2" /> Active
            </TabsTrigger>
            <TabsTrigger value="archived">
              <Archive className="h-4 w-4 mr-2" /> Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {mockNotices.filter(n => !n.is_archived).map(notice => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="space-y-4">
              {mockNotices.filter(n => n.is_archived).map(notice => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function NoticeCard({ notice }: { notice: typeof mockNotices[0] }) {
  return (
    <Card className={notice.is_archived ? "opacity-70" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary">{notice.category}</Badge>
              {notice.is_archived && <Badge variant="outline">Archived</Badge>}
            </div>
            <h3 className="font-semibold mb-1">{notice.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{notice.author} · {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
            <p className="text-sm mb-2">{notice.body}</p>
            {notice.venue && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {notice.venue}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}