import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, CalendarDays, Plus } from "lucide-react";
import Link from "next/link";

const mockEvents = [
  { id: "1", title: "Student Film Festival 2027 - Submissions Open", description: "Submit your films for the annual SRFTI Student Film Festival.", date: "2026-12-01", time: "09:00", venue: "Online Portal", organiser: "Festival Committee", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop" },
  { id: "2", title: "Direction Masterclass with Alumni", description: "Interactive session with award-winning director alumni.", date: "2026-11-25", time: "14:00", venue: "Screening Room 1", organiser: "Direction Dept", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=800&h=400&fit=crop" },
  { id: "3", title: "Sound Design Workshop", description: "Hands-on workshop on field recording and sound design.", date: "2026-11-28", time: "10:00", venue: "Sound Studio", organiser: "Sound Dept", poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop" },
  { id: "4", title: "Alumni Meet 2026", description: "Annual alumni gathering with screenings and networking.", date: "2026-12-15", time: "18:00", venue: "Main Auditorium", organiser: "Alumni Association", poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop" },
];

export default function EventsPage() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const upcoming = mockEvents.filter(e => e.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date));
  const past = mockEvents.filter(e => e.date < todayStr).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events Calendar</h1>
            <p className="text-muted-foreground mt-1">Upcoming events, workshops, screenings, and gatherings</p>
          </div>
          <Button asChild>
            <Link href="/admin/events">
              <Plus className="h-4 w-4 mr-2" /> Add Event
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              <CalendarDays className="h-4 w-4 mr-2" /> Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function EventCard({ event }: { event: typeof mockEvents[0] }) {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <Card className="overflow-hidden h-full">
      {event.poster && (
        <img src={event.poster} alt={event.title} className="w-full h-48 object-cover" />
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          {isPast && <Badge variant="outline">Past</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{eventDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>By: {event.organiser}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}