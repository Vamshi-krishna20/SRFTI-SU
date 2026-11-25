import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus, Edit, Trash2, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockUsers = [
  { id: "1", name: "Arjun Patel", email: "arjun.patel@srfti.ac.in", role: "Student", status: "Active" },
  { id: "2", name: "Priya Sharma", email: "priya.sharma@srfti.ac.in", role: "Cinema Curator", status: "Active" },
  { id: "3", name: "Admin User", email: "admin@srfti.ac.in", role: "Super Admin", status: "Active" },
];

const mockRoles = [
  { id: "1", name: "Super Admin", permissions: "All permissions" },
  { id: "2", name: "Union Admin", permissions: "Manage users, roles, academic, all content" },
  { id: "3", name: "Awaz Do Editor", permissions: "Manage articles, bulletins, notices" },
  { id: "4", name: "Cinema Curator", permissions: "Manage screenings, rotation, polls, recommendations" },
  { id: "5", name: "Student", permissions: "View, recommend, vote, manage own profile" },
];

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users & Roles</h1>
            <p className="text-muted-foreground mt-1">Manage user accounts and role assignments</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Shield className="h-4 w-4 mr-2" /> Manage Roles
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Invite User
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{u.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/users/${u.id}`}>
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
              <CardTitle>Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRoles.map((r) => (
                  <div key={r.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.permissions}</p>
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
