import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Film, FileText, Clock, Trophy } from "lucide-react";
import Link from "next/link";

const statCards = [
  { title: "Total Students", value: "1,234", Icon: Users, change: "+12% vs last month" },
  { title: "Active Screenings", value: "8", Icon: Film, change: "2 this week" },
  { title: "Articles Published", value: "45", Icon: FileText, change: "+3 this week" },
  { title: "Votes Cast", value: "1,892", Icon: Trophy, change: "Current poll" },
  { title: "Notices Posted", value: "12", Icon: Clock, change: "Active notices" },
  { title: "Events Scheduled", value: "8", Icon: BarChart3, change: "Upcoming events" },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Platform Analytics</h1>
            <p className="text-muted-foreground mt-1">Usage metrics and engagement data</p>
          </div>
          <Button asChild>
            <Link href="/admin">
              <BarChart3 className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {statCards.map((stat) => {
            const Icon = stat.Icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
