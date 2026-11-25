import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockNotices = [
  { id: "1", title: "Semester Registration Deadline Extended", category: "Academic", date: "2026-11-20", venue: "Admin Office", status: "Active" },
  { id: "2", title: "Hostel Maintenance Schedule", category: "Facilities", date: "2026-11-18", venue: "All Hostels", status: "Active" },
  { id: "3", title: "Library Holiday Hours", category: "Library", date: "2026-11-15", venue: "Central Library", status: "Active" },
];

export default function AdminNoticesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notice Board Management</h1>
            <p className="text-muted-foreground mt-1">Manage official notices and announcements</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/notices">
                <FileText className="h-4 w-4 mr-2" /> View Notices
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Notice
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNotices.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell className="font-medium">{n.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{n.category}</Badge>
                      </TableCell>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{n.venue}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{n.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/notices/${n.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
