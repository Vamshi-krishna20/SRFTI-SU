import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Clock, Users, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const mockPoll = {
  id: "1",
  title: "Student's Vote Poll: Week of Nov 23-29",
  status: "open" as const,
  shortlist_published: true,
  voting_start: "2026-11-20T10:00:00Z",
  voting_end: "2026-11-22T23:59:00Z",
  live_results_enabled: true,
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

export default function PollPage({ params }: { params: Promise<{ id: string }> }) {
  const totalVotes = mockPoll.films.reduce((sum, f) => sum + f.votes, 0);

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href="/students-cut">
              <ArrowLeft className="h-4 w-4" /> Back to Student's Vote
            </Link>
          </Button>
          <Badge variant="secondary">Open for Voting</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{mockPoll.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Voting:{" "}
              {new Date(mockPoll.voting_start!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} –{" "}
              {new Date(mockPoll.voting_end!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Total votes cast</span>
              <span className="font-medium">{totalVotes}</span>
            </div>
            <div className="space-y-3">
              {mockPoll.films.map((film, i) => {
                const percentage = totalVotes > 0 ? Math.round((film.votes / totalVotes) * 100) : 0;
                return (
                  <div key={film.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-muted-foreground/50">{i + 1}</span>
                        <div>
                          <p className="font-medium">{film.title}</p>
                          <p className="text-sm text-muted-foreground">{film.director} ({film.year})</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm">{film.votes} votes ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-3">
          <Button asChild className="flex-1">
            <Link href="/students-cut">Back to Poll Overview</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/students-cut">View All Polls</Link>
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Each student gets one vote per poll. Shortlist of 14 films published before voting.
            Ties for 7th place are broken alphabetically by film title.
          </p>
        </div>
      </div>
    </main>
  );
}
