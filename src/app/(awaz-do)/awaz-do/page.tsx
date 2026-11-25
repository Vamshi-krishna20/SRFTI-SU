import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileIcon, Calendar, Download } from "lucide-react";
import Link from "next/link";

const mockArticles = [
  {
    id: "1",
    title: "Union Elections 2026: Results Announced",
    summary: "The new student union council has been elected. Meet your representatives.",
    body: "Full article content...",
    author: "Awaz Do Editorial Team",
    category: "Announcement",
    poster_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    published_at: "2026-11-15T10:00:00Z",
    is_published: true,
  },
  {
    id: "2",
    title: "New Screening Equipment Arrives",
    summary: "The institute has procured new 4K projectors for the main auditorium.",
    body: "Full article content...",
    author: "Cinema Committee",
    category: "Infrastructure",
    published_at: "2026-11-10T14:30:00Z",
    is_published: true,
  },
  {
    id: "3",
    title: "Student Film Festival Call for Entries",
    summary: "Annual SRFTI Student Film Festival opens submissions for 2027 edition.",
    body: "Full article content...",
    author: "Festival Committee",
    category: "Events",
    published_at: "2026-11-05T09:00:00Z",
    is_published: true,
  },
];

const mockBulletins = [
  {
    id: "1",
    title: "Awaz Do Bulletin - November 2026",
    description: "Monthly bulletin covering union activities, screenings, and announcements.",
    author: "Student Union",
    publication_date: "2026-11-01",
    drive_file_id: "1abc123",
    drive_url: "https://drive.google.com/file/d/1abc123/view",
    cover_image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=500&fit=crop",
    is_published: true,
  },
  {
    id: "2",
    title: "Awaz Do Bulletin - October 2026",
    description: "Mid-term review, festival highlights, and upcoming events.",
    author: "Student Union",
    publication_date: "2026-10-01",
    drive_file_id: "1def456",
    drive_url: "https://drive.google.com/file/d/1def456/view",
    cover_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    is_published: true,
  },
];

export default function AwazDoPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="articles" className="flex-col w-full space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Awaz Do</h1>
              <p className="text-muted-foreground mt-1">News, bulletins, and official communications</p>
            </div>
            <div className="flex items-center gap-3">
              <TabsList>
                <TabsTrigger value="articles">
                  <FileText className="h-4 w-4 mr-2" /> Articles
                </TabsTrigger>
                <TabsTrigger value="bulletins">
                  <FileIcon className="h-4 w-4 mr-2" /> Bulletins
                </TabsTrigger>
              </TabsList>
              <Button asChild>
                <Link href="/admin/awaz-do">Manage</Link>
              </Button>
            </div>
          </div>

          <TabsContent value="articles">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockArticles.map(article => (
                <Card key={article.id} className="overflow-hidden h-full">
                  {article.poster_url && (
                    <img src={article.poster_url} alt={article.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.published_at!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{article.summary}</p>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/awaz-do/${article.id}`} className="text-primary hover:underline text-sm">
                      Read more →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bulletins">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockBulletins.map(bulletin => (
                <Card key={bulletin.id} className="overflow-hidden h-full">
                  {bulletin.cover_image_url && (
                    <img src={bulletin.cover_image_url} alt={bulletin.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">PDF Bulletin</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(bulletin.publication_date!).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{bulletin.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{bulletin.description}</p>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`/awaz-do/bulletin/${bulletin.id}`} target="_blank" rel="noopener noreferrer">
                        <FileIcon className="h-4 w-4 mr-2" /> View PDF
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="flex-1">
                      <a href={bulletin.drive_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" /> Drive
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}