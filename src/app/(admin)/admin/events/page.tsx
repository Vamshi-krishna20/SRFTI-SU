import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const mockEvents = [
  { id: "1", title: "Student Film Festival 2027 - Submissions Open", date: "2026-12-01", time: "09:00", venue: "Online Portal", organiser: "Festival Committee" },
  { id: "2", title: "Direction Masterclass with Alumni", date: "2026-11-25", time: "14:00", venue: "Screening Room 1", organiser: "Direction Dept" },
  { id: "3", title: "Sound Design Workshop", date: "2026-11-28", time: "10:00", venue: "Sound Studio", organiser: "Sound Dept" },
];

export default function AdminEventsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events Management</h1>
            <p className="text-muted-foreground mt-1">Manage events, workshops, and gatherings</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/events">
                <Calendar className="h-4 w-4 mr-2" /> View Events
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Event
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Organiser</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.title}</TableCell>
                      <TableCell>{e.date}</TableCell>
                      <TableCell>{e.time}</TableCell>
                      <TableCell>{e.venue}</TableCell>
                      <TableCell>{e.organiser}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/events/${e.id}`}>
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
