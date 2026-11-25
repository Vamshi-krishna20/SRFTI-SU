import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Film, Award, Calendar, MapPin, Mail, Phone, Instagram, Linkedin, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockProfile = {
  id: "1",
  name: "Arjun Patel",
  email: "arjun.patel@srfti.ac.in",
  phone: "+91 98765 43210",
  instagram: "@arjunpatel_films",
  linkedin: "arjun-patel-srfti",
  website: "arjunpatel.com",
  bio: "Third-year Direction student passionate about narrative cinema and visual storytelling. Interested in the intersection of traditional filmmaking and new media.",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  wing: "Film Wing",
  department: "Direction",
  batch: "2023",
  group: "A",
  specialisation: "Narrative Direction",
  portfolio: [
    { id: "1", title: "The Last Train", category: "Short Film", year: 2025, description: "A 15-min drama about a station master's final shift.", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop", video: "https://youtube.com/watch?v=example1" },
    { id: "2", title: "Monsoon Memories", category: "Documentary", year: 2024, description: "A personal essay film about childhood monsoons in Kerala.", poster: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=225&fit=crop", video: "https://youtube.com/watch?v=example2" },
    { id: "3", title: "Frame by Frame", category: "Experimental", year: 2024, description: "Stop-motion exploration of urban decay.", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop", video: "https://youtube.com/watch?v=example3" },
  ],
};

export function generateStaticParams() {
  return [
    { slug: "1" },
    { slug: "2" },
    { slug: "3" },
    { slug: "4" },
    { slug: "5" },
    { slug: "6" },
  ];
}

export default function StudentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-r from-primary/20 to-primary/10">
              {mockProfile.photo && (
                <img src={mockProfile.photo} alt={mockProfile.name} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full border-4 border-background object-cover" />
              )}
            </div>
            <div className="pb-8 px-6 pt-16 text-center">
              <h1 className="text-3xl font-bold">{mockProfile.name}</h1>
              <div className="flex items-center justify-center gap-4 mt-2 flex-wrap text-sm text-muted-foreground">
                <Badge variant="secondary">{mockProfile.wing}</Badge>
                <Badge variant="outline">{mockProfile.department}</Badge>
                <Badge variant="outline">Batch {mockProfile.batch}</Badge>
                <Badge variant="outline">Group {mockProfile.group}</Badge>
              </div>
              {mockProfile.specialisation && (
                <p className="text-muted-foreground mt-2">{mockProfile.specialisation}</p>
              )}
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap text-sm">
                {mockProfile.email && <a href={`mailto:${mockProfile.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="h-4 w-4" />{mockProfile.email}</a>}
                {mockProfile.instagram && <a href={`https://instagram.com/${mockProfile.instagram.replace("@", "")}`} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-primary"><Instagram className="h-4 w-4" />{mockProfile.instagram}</a>}
                {mockProfile.linkedin && <a href={`https://linkedin.com/in/${mockProfile.linkedin}`} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-primary"><Linkedin className="h-4 w-4" />{mockProfile.linkedin}</a>}
                {mockProfile.website && <a href={`https://${mockProfile.website}`} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-primary"><Globe className="h-4 w-4" />{mockProfile.website}</a>}
              </div>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/students/me"><Edit className="h-4 w-4 mr-2" />Edit Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        {mockProfile.bio && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{mockProfile.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Portfolio */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Film className="h-5 w-5" /> Portfolio
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockProfile.portfolio.map(item => (
              <Card key={item.id} className="overflow-hidden h-full">
                {item.poster && (
                  <img src={item.poster} alt={item.title} className="w-full h-40 object-cover" />
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.year}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3 line-clamp-2">{item.description}</p>
                  {item.video && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={item.video} target="_blank" rel="noopener">
                        <ExternalLink className="h-4 w-4 mr-2" /> View Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}