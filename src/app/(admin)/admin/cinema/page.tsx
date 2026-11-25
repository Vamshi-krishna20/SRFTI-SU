import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Film, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const mockScreenings = [
  { id: "1", title: "The 400 Blows", type: "New CRT", date: "2026-11-20", venue: "Main Auditorium", status: "Active" },
  { id: "2", title: "Persona", type: "New CRT", date: "2026-11-22", venue: "Screening Room 2", status: "Active" },
  { id: "3", title: "Chungking Express", type: "Student's Vote", date: "2026-11-25", venue: "Main Auditorium", status: "Scheduled" },
];

export default function AdminCinemaPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cinema Management</h1>
            <p className="text-muted-foreground mt-1">Manage New CRT and Student's Vote screenings</p>
          </div>
          <Button asChild>
            <Link href="/cinema">
              <Film className="h-4 w-4 mr-2" /> View Screenings
            </Link>
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Screening
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Screenings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockScreenings.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.title}</TableCell>
                      <TableCell>
                        <Badge variant={s.type === "Student's Vote" ? "secondary" : "default"}>
                          {s.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{s.date}</TableCell>
                      <TableCell>{s.venue}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{s.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/cinema/${s.id}`}>
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
