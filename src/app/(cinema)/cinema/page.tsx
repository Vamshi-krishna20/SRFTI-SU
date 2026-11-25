import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Film } from "lucide-react";

const mockScreenings = [
  {
    id: "1",
    title: "The 400 Blows",
    director: "François Truffaut",
    year: 1959,
    country: "France",
    language: "French",
    duration: 99,
    poster_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    description: "A young boy's experience of school, family, and the streets of Paris.",
    screening_date: "2026-11-20",
    screening_time: "18:30",
    venue: "Main Auditorium",
    program_type: "new_crt",
    is_active: true,
  },
  {
    id: "2",
    title: "Persona",
    director: "Ingmar Bergman",
    year: 1966,
    country: "Sweden",
    language: "Swedish",
    duration: 85,
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=400&h=600&fit=crop",
    description: "A nurse and her mute patient form a complex psychological bond.",
    screening_date: "2026-11-22",
    screening_time: "19:00",
    venue: "Screening Room 2",
    program_type: "new_crt",
    is_active: true,
  },
  {
    id: "3",
    title: "Student's Vote Winner: Chungking Express",
    director: "Wong Kar-wai",
    year: 1994,
    country: "Hong Kong",
    language: "Cantonese",
    duration: 102,
    poster_url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    description: "Two intersecting love stories in neon-lit Hong Kong.",
    screening_date: "2026-11-25",
    screening_time: "18:00",
    venue: "Main Auditorium",
    program_type: "students_cut",
    is_active: true,
  },
];

export default function CinemaPage() {
  const today = new Date().toISOString().split("T")[0];
  const todayScreenings = mockScreenings.filter(s => s.screening_date === today && s.is_active);
  const upcomingScreenings = mockScreenings.filter(s => s.screening_date > today && s.is_active);
  const pastScreenings = mockScreenings.filter(s => s.screening_date < today && s.is_active);

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">New CRT Screenings</h1>
            <p className="text-muted-foreground mt-1">Today's screening, weekly schedule, and archive</p>
          </div>
          <Button asChild>
            <a href="/admin/cinema">Manage Screenings</a>
          </Button>
        </div>

        {/* Today's Screening */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Film className="h-5 w-5" /> Today's Screening
          </h2>
          {todayScreenings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {todayScreenings.map(screening => (
                <ScreeningCard key={screening.id} screening={screening} />
              ))}
            </div>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="py-12 text-center text-muted-foreground">
                No screening scheduled for today.
              </CardContent>
            </Card>
          )}
        </section>

        {/* This Week */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">This Week</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingScreenings.slice(0, 6).map(screening => (
              <ScreeningCard key={screening.id} screening={screening} />
            ))}
          </div>
        </section>

        {/* Archive */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Archive</h2>
            <Button variant="ghost" asChild>
              <a href="/cinema/archive">View All →</a>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastScreenings.slice(0, 6).map(screening => (
              <ScreeningCard key={screening.id} screening={screening} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ScreeningCard({ screening }: { screening: typeof mockScreenings[0] }) {
  const isStudentsCut = screening.program_type === "students_cut";
  
  return (
    <Card className="h-full overflow-hidden">
      {screening.poster_url && (
        <div className="relative h-64 overflow-hidden">
          <img 
            src={screening.poster_url} 
            alt={screening.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={isStudentsCut ? "secondary" : "default"}>
              {isStudentsCut ? "Student's Vote" : "New CRT"}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{screening.title}</CardTitle>
          {screening.year && <span className="text-sm text-muted-foreground">{screening.year}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{screening.director}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{new Date(screening.screening_date!).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
          <Clock className="h-4 w-4 ml-4" />
          <span>{screening.screening_time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{screening.venue}</span>
        </div>
        {screening.description && (
          <p className="text-sm line-clamp-2">{screening.description}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          {screening.country && <span>{screening.country}</span>}
          {screening.language && <span>· {screening.language}</span>}
          {screening.duration && <span>· {screening.duration} min</span>}
        </div>
      </CardContent>
    </Card>
  );
}