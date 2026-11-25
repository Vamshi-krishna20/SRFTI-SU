import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Clock } from "lucide-react";
import Link from "next/link";

const mockRotation = [
  { week: "Nov 16-22, 2026", group: "Direction - Batch 2023", status: "completed" as const, films: 3 },
  { week: "Nov 23-29, 2026", group: "Cinematography - Batch 2024", status: "current" as const, films: 5 },
  { week: "Nov 30 - Dec 6, 2026", group: "Editing - Batch 2022", status: "upcoming" as const, films: 0 },
];

const mockCurrentPoll = {
  id: "1",
  title: "Student's Vote Poll: Week of Nov 23-29",
  status: "open" as const,
  shortlist_published: true,
  voting_start: "2026-11-20T10:00:00Z",
  voting_end: "2026-11-22T23:59:00Z",
  films: [
    { id: "1", title: "Chungking Express", director: "Wong Kar-wai", year: 1994, votes: 42 },
    { id: "2", title: "In the Mood for Love", director: "Wong Kar-wai", year: 2000, votes: 38 },
    { id: "3", title: "Days of Being Wild", director: "Wong Kar-wai", year: 1990, votes: 25 },
    { id: "4", title: "Fallen Angels", director: "Wong Kar-wai", year: 1995, votes: 19 },
    { id: "5", title: "Happy Together", director: "Wong Kar-wai", year: 1997, votes: 15 },
    { id: "6", title: "Ashes of Time", director: "Wong Kar-wai", year: 1994, votes: 12 },
    { id: "7", title: "The Grandmaster", director: "Wong Kar-wai", year: 2013, votes: 8 },
  ],
};

export default function StudentsCutPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student's Vote</h1>
            <p className="text-muted-foreground mt-1">Weekly rotation, film recommendations, and polls</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/students-cut/recommend">Submit Recommendation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/students-cut">Manage</Link>
            </Button>
          </div>
        </div>

        {/* Current Week Rotation */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" /> This Week's Rotation
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mockRotation.map((week, i) => (
              <Card key={week.week} className={week.status === "current" ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Week {i + 1}</CardTitle>
                    <Badge variant={week.status === "completed" ? "default" : week.status === "current" ? "secondary" : "outline"}>
                      {week.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{week.group}</p>
                  <p className="text-sm text-muted-foreground">{week.week}</p>
                  <p className="text-sm">{week.films} recommendations submitted</p>
                  {week.status === "current" && (
                    <Button asChild className="w-full mt-2">
                      <Link href="/students-cut/recommend">Submit Your Film</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Poll */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5" /> Current Poll
            </h2>
            <Badge variant="secondary">Open for Voting</Badge>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{mockCurrentPoll.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Voting: Nov 20, 10:00 AM – Nov 22, 11:59 PM
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCurrentPoll.films.map((film, i) => (
                  <div key={film.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-muted-foreground/50">{i + 1}</span>
                      <div>
                        <p className="font-medium">{film.title}</p>
                        <p className="text-sm text-muted-foreground">{film.director} ({film.year})</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{film.votes}</p>
                      <p className="text-xs text-muted-foreground">votes</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <Button asChild className="flex-1">
                  <Link href="/students-cut/poll/1">Vote Now</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/students-cut/poll/1">View Results</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}