import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, User, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";

const mockStudents = [
  { id: "1", name: "Arjun Patel", wing: "Film Wing", department: "Direction", batch: "2023", group: "A", email: "arjun.patel@srfti.ac.in" },
  { id: "2", name: "Priya Sharma", wing: "Film Wing", department: "Cinematography", batch: "2024", group: "B", email: "priya.sharma@srfti.ac.in" },
  { id: "3", name: "Rahul Singh", wing: "Film Wing", department: "Editing", batch: "2022", group: "A", email: "rahul.singh@srfti.ac.in" },
];

export default function AdminStudentsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Alumni Management</h1>
            <p className="text-muted-foreground mt-1">Manage alumni profiles and portfolios</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/students">
                <Users className="h-4 w-4 mr-2" /> View Alumni
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Alumni
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Wing</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.wing}</TableCell>
                      <TableCell>{s.department}</TableCell>
                      <TableCell>{s.batch}</TableCell>
                      <TableCell>{s.group}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/students/${s.id}`}>
                            <User className="h-4 w-4" />
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
