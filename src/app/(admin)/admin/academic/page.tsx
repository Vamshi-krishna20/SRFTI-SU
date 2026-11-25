import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Edit, Trash2, GraduationCap, Calendar } from "lucide-react";
import Link from "next/link";

const mockWings = [
  { id: "1", name: "Film Wing", departments: 8 },
  { id: "2", name: "Electronic Dance Music", departments: 4 },
];

const mockDepartments = [
  { id: "1", name: "Direction", wing: "Film Wing" },
  { id: "2", name: "Cinematography", wing: "Film Wing" },
  { id: "3", name: "Editing", wing: "Film Wing" },
  { id: "4", name: "Electronic Music Production", wing: "Electronic Dance Music" },
];

const mockBatches = [
  { id: "1", year: 2025, name: "Batch 2025" },
  { id: "2", year: 2024, name: "Batch 2024" },
  { id: "3", year: 2023, name: "Batch 2023" },
  { id: "4", year: 2022, name: "Batch 2022" },
];

export default function AdminAcademicPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Academic Structure</h1>
            <p className="text-muted-foreground mt-1">Manage wings, departments, batches, and groups</p>
          </div>
          <Button>
            <Building2 className="h-4 w-4 mr-2" /> Add Structure
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Wings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWings.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.departments} departments</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/wings/${w.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDepartments.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.wing}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/departments/${d.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBatches.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-muted-foreground">Year {b.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/batches/${b.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
