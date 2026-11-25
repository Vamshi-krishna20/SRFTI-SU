import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

const mockArticle = {
  id: "1",
  title: "Union Elections 2026: Results Announced",
  summary: "The new student union council has been elected. Meet your representatives.",
  body: `The SRFTI Student Union elections for 2026 have concluded successfully. The new council represents both the Film Wing and the Electronic Dance Music Wing, ensuring balanced representation across all departments.

The election saw record turnout, with over 85% of enrolled students casting their votes. The new council will serve a one-year term, overseeing screenings, events, publications, and student welfare initiatives.

Key priorities for the new council include expanding the weekly New CRT screening program, improving hostel infrastructure, and launching a mentorship program connecting senior students with juniors.

The council will be formally inaugurated at the upcoming Student Film Festival 2027.`,
  author: "Awaz Do Editorial Team",
  category: "Announcement",
  poster_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop",
  published_at: "2026-11-15T10:00:00Z",
  is_published: true,
};

export function generateStaticParams() {
  return [{ slug: "1" }, { slug: "2" }, { slug: "3" }];
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href="/awaz-do">
              <ArrowLeft className="h-4 w-4" /> Back to Awaz Do
            </Link>
          </Button>
        </div>

        {mockArticle.poster_url && (
          <img
            src={mockArticle.poster_url}
            alt={mockArticle.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
        )}

        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <Badge variant="secondary">{mockArticle.category}</Badge>
          <FileText className="h-4 w-4" />
          <span>
            {new Date(mockArticle.published_at!).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>By {mockArticle.author}</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">{mockArticle.title}</h1>

        <div className="editorial-prose">
          <p className="text-xl text-muted-foreground mb-6">{mockArticle.summary}</p>
          <p>{mockArticle.body}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/awaz-do">More Articles</Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>
    </main>
  );
}
