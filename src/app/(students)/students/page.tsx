import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, User, GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";

const mockStudents = [
  { id: "1", name: "Arjun Patel", wing: "Film Wing", department: "Direction", batch: "2023", group: "A", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { id: "2", name: "Priya Sharma", wing: "Film Wing", department: "Cinematography", batch: "2024", group: "B", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { id: "3", name: "Rahul Singh", wing: "Film Wing", department: "Editing", batch: "2022", group: "A", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { id: "4", name: "Ananya Das", wing: "Electronic Dance Music", department: "Electronic Music Production", batch: "2024", group: "C", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { id: "5", name: "Vikram Mehta", wing: "Film Wing", department: "Sound Recording & Design", batch: "2023", group: "B", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { id: "6", name: "Sneha Reddy", wing: "Electronic Dance Music", department: "Sound Design", batch: "2025", group: "A", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
];

const wings = ["Film Wing", "Electronic Dance Music"];
const departments = ["Direction", "Cinematography", "Editing", "Sound Recording & Design", "Producing", "Screenwriting", "Animation", "Film Studies", "Electronic Music Production", "Sound Design", "Music Technology", "Performance & DJ"];
const batches = ["2025", "2024", "2023", "2022", "2021"];
const groups = ["A", "B", "C", "D"];

export default function StudentsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Alumni</h1>
            <p className="text-muted-foreground mt-1">Search and filter alumni by wing, department, batch, and group</p>
          </div>
          <Button asChild>
            <Link href="/students/me">Edit My Profile</Link>
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Wing" />
                  <Filter className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {wings.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                  <GraduationCap className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Batch" />
                  <Building2 className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Student Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockStudents.map(student => (
            <Link key={student.id} href={`/students/${student.id}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-lg text-center">
                <CardContent className="pt-6 pb-4 px-4">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors">
                    <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{student.department} · Batch {student.batch}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <Badge variant="secondary" className="text-xs">{student.wing}</Badge>
                    <Badge variant="outline" className="text-xs">Group {student.group}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty state fallback */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>Showing {mockStudents.length} students</p>
        </div>
      </div>
    </main>
  );
}