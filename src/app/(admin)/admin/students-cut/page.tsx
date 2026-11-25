import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const mockRotation = [
  { id: "1", week: "Nov 16-22", group: "Direction - Batch 2023", films: 3, status: "Completed" },
  { id: "2", week: "Nov 23-29", group: "Cinematography - Batch 2024", films: 5, status: "Current" },
  { id: "3", week: "Nov 30 - Dec 6", group: "Editing - Batch 2022", films: 0, status: "Upcoming" },
];

const mockPolls = [
  { id: "1", title: "Week of Nov 23-29", status: "Open", votes: 156, shortlist: true },
  { id: "2", title: "Week of Nov 16-22", status: "Closed", votes: 142, shortlist: true },
];

export default function AdminStudentsCutPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student's Vote Management</h1>
            <p className="text-muted-foreground mt-1">Manage rotation, recommendations, and polls</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/students-cut">
                <Trophy className="h-4 w-4 mr-2" /> View Student's Vote
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create Poll
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rotation Schedule</CardTitle>
                <Button size="sm" asChild>
                  <Link href="/admin/academic">
                    <Users className="h-4 w-4 mr-2" /> Manage Groups
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Week</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Films</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRotation.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.week}</TableCell>
                        <TableCell className="font-medium">{r.group}</TableCell>
                        <TableCell>{r.films}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === "Current" ? "secondary" : r.status === "Completed" ? "default" : "outline"}>
                            {r.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Polls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Poll</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Votes</TableHead>
                      <TableHead>Shortlist</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPolls.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.title}</TableCell>
                        <TableCell>
                          <Badge variant={p.status === "Open" ? "secondary" : "default"}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{p.votes}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{p.shortlist ? "Published" : "Draft"}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/students-cut/poll/${p.id}`}>
                              <Clock className="h-4 w-4" />
                            </Link>
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
      </div>
    </main>
  );
}
