import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileIcon, Download, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockBulletin = {
  id: "1",
  title: "Awaz Do Bulletin - November 2026",
  description: "Monthly bulletin covering union activities, screenings, and announcements.",
  author: "Student Union",
  publication_date: "2026-11-01",
  drive_file_id: "1abc123",
  drive_url: "https://drive.google.com/file/d/1abc123/view",
  cover_image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=500&fit=crop",
  is_published: true,
};

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default function BulletinPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href="/awaz-do">
              <ArrowLeft className="h-4 w-4" /> Back to Awaz Do
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden">
          {mockBulletin.cover_image_url && (
            <img
              src={mockBulletin.cover_image_url}
              alt={mockBulletin.title}
              className="w-full h-64 object-cover"
            />
          )}
          <CardHeader className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">PDF Bulletin</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(mockBulletin.publication_date!).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <CardTitle className="text-2xl">{mockBulletin.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{mockBulletin.author}</p>
          </CardHeader>
          <CardContent className="py-6">
            <p className="text-muted-foreground mb-6">{mockBulletin.description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`https://drive.google.com/file/d/${mockBulletin.drive_file_id}/preview`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileIcon className="h-4 w-4 mr-2" /> View PDF
                </a>
              </Button>
              <Button asChild variant="ghost" className="flex-1">
                <a href={mockBulletin.drive_url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" /> Open in Drive
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <p className="font-medium mb-2">Note:</p>
              <p>
                This bulletin is hosted on Google Drive. No PDF bytes are stored on our servers.{" "}
                If the embedded viewer doesn't load, use the "Open in Drive" link above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
