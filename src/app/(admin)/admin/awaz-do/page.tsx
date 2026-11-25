import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Edit, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockArticles = [
  { id: "1", title: "Union Elections 2026: Results Announced", category: "Announcement", status: "Published", date: "2026-11-15" },
  { id: "2", title: "New Screening Equipment Arrives", category: "Infrastructure", status: "Published", date: "2026-11-10" },
  { id: "3", title: "Student Film Festival Call for Entries", category: "Events", status: "Published", date: "2026-11-05" },
];

const mockBulletins = [
  { id: "1", title: "Awaz Do Bulletin - November 2026", status: "Published", date: "2026-11-01" },
  { id: "2", title: "Awaz Do Bulletin - October 2026", status: "Published", date: "2026-10-01" },
];

export default function AdminAwazDoPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Awaz Do Management</h1>
            <p className="text-muted-foreground mt-1">Manage articles and Drive PDF bulletins</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/awaz-do">
                <FileText className="h-4 w-4 mr-2" /> View Awaz Do
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Article
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockArticles.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{a.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{a.status}</Badge>
                        </TableCell>
                        <TableCell>{a.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/awaz-do/${a.id}`}>
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

          <Card>
            <CardHeader>
              <CardTitle>Bulletins (Drive PDFs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBulletins.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{b.status}</Badge>
                        </TableCell>
                        <TableCell>{b.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/awaz-do/bulletin/${b.id}`} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
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
