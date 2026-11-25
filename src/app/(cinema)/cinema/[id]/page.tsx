import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Film, ArrowLeft } from "lucide-react";
import Link from "next/link";

const mockScreening = {
  id: "1",
  title: "The 400 Blows",
  director: "François Truffaut",
  year: 1959,
  country: "France",
  language: "French",
  duration: 99,
  poster_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
  description: "A young boy's experience of school, family, and the streets of Paris. Antoine Doinel is a misunderstood adolescent growing up in 1950s Paris, neglected by his parents and rebelling against the oppressive school system.",
  screening_date: "2026-11-20",
  screening_time: "18:30",
  venue: "Main Auditorium",
  program_type: "new_crt",
  is_active: true,
};

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default function ScreeningDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href="/cinema">
              <ArrowLeft className="h-4 w-4" /> Back to Screenings
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <img
              src={mockScreening.poster_url}
              alt={mockScreening.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <Badge variant={mockScreening.program_type === "students_cut" ? "secondary" : "default"}>
                {mockScreening.program_type === "students_cut" ? "Student's Vote" : "New CRT"}
              </Badge>
              <h1 className="text-4xl font-bold text-white mt-2 mb-2">{mockScreening.title}</h1>
              <p className="text-white/90 text-lg">{mockScreening.director} · {mockScreening.year}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(mockScreening.screening_date!).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{mockScreening.screening_time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockScreening.venue}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{mockScreening.country}</span>
                  <span>·</span>
                  <span>{mockScreening.language}</span>
                  <span>·</span>
                  <span>{mockScreening.duration} min</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockScreening.description}</p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href="/students-cut">Back to Student's Vote</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/cinema">All Screenings</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
