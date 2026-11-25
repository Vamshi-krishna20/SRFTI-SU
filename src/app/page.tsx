"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  screenings,
  currentPoll,
  students,
  articles,
} from "@/lib/mock-data";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.08,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.6,
        ease: "power2.out",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const activeScreening = screenings.find((s) => s.is_active) ?? screenings[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link href="/" className="flex items-baseline gap-2 font-display">
            <span className="text-lg font-bold tracking-tight">SRFTI</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Student Union</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {[
              ["/cinema", "Screenings"],
              ["/students-cut", "Student's Vote"],
              ["/awaz-do", "Awaz Do"],
              ["/students", "Alumni"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="hero-meta mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-12 bg-foreground/40" />
            Satyajit Ray Film &amp; Television Institute, Kolkata
          </div>
          <h1 className="font-display text-[14vw] leading-[0.85] tracking-[-0.04em] md:text-[9vw]">
            <span className="block overflow-hidden"><span className="hero-line block">THE STUDENT</span></span>
            <span className="block overflow-hidden"><span className="hero-line block text-primary">FRAME.</span></span>
          </h1>
          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <p className="md:col-span-5 text-lg leading-relaxed text-muted-foreground">
              A shared digital home for SRFTI students — New CRT screenings, Student's Vote film polls, Awaz Do bulletins, and alumni profiles.
            </p>
            <div className="md:col-span-7 flex flex-wrap items-end gap-4 md:justify-end">
              <Link href="/students-cut">
                <Button size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8">
                  Vote This Week
                </Button>
              </Link>
              <Link href="/cinema">
                <Button size="lg" variant="outline" className="rounded-none px-8">
                  View Screenings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Screening */}
      {activeScreening && (
        <section className="reveal border-b border-border">
          <div className="mx-auto grid max-w-[1400px] gap-0 md:grid-cols-12">
            <div className="md:col-span-5 p-6 md:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">Today's Screening · New CRT</div>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]">{activeScreening.title}</h2>
              <p className="mt-4 text-muted-foreground">{activeScreening.director} · {activeScreening.year}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground font-mono">
                {activeScreening.country && <span>{activeScreening.country}</span>}
                {activeScreening.language && <span>{activeScreening.language}</span>}
                {activeScreening.duration && <span>{activeScreening.duration} min</span>}
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm">
                <span className="font-mono">{activeScreening.screening_time}</span>
                <Link href="/cinema" className="text-primary hover:underline">View details →</Link>
              </div>
            </div>
            <div className="md:col-span-7 aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
              {activeScreening.poster_url && (
                <img src={activeScreening.poster_url} alt={activeScreening.title} className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Awaz Do editorial */}
      <section className="reveal border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">Awaz Do</h2>
            <Link href="/awaz-do" className="text-sm uppercase tracking-[0.2em] hover:text-primary">Read all →</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-12">
            {articles.slice(0, 3).map((a, i) => (
              <article key={a.id} className={`${i === 0 ? "md:col-span-7" : "md:col-span-5"} border-t border-background/20 pt-6`}>
                <div className="text-xs uppercase tracking-[0.2em] text-background/60 mb-3">{a.category}</div>
                <h3 className={`font-display tracking-tight ${i === 0 ? "text-3xl md:text-5xl" : "text-2xl"}`}>{a.title}</h3>
                <p className="mt-3 text-sm text-background/70">{a.summary}</p>
                <div className="mt-4 text-xs font-mono text-background/50">{new Date(a.published_at!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Current Poll */}
      <section className="reveal border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">Student's Vote</h2>
            <Link href="/students-cut" className="text-sm uppercase tracking-[0.2em] text-primary hover:underline">Vote now →</Link>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {currentPoll.films.map((film, i) => (
              <div key={film.id} className="bg-background p-8">
                <div className="font-mono text-xs text-muted-foreground mb-4">0{i + 1}</div>
                <h3 className="font-display text-2xl tracking-tight">{film.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{film.director} ({film.year})</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-primary">{film.votes}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">votes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Students */}
      <section className="reveal">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">Alumni</h2>
            <Link href="/students" className="text-sm uppercase tracking-[0.2em] hover:text-primary">Alumni →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {students.map((s) => (
              <Link key={s.id} href={`/students/${s.id}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-muted mb-4">
                  <img src={s.photo} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-xl tracking-tight group-hover:text-primary">{s.name}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.department} · Batch {s.batch}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-display text-2xl tracking-tight">SRFTI</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Student Union</div>
          </div>
          {[
            ["Explore", [["/cinema", "Screenings"], ["/students-cut", "Student's Vote"], ["/awaz-do", "Awaz Do"]]],
            ["Community", [["/students", "Alumni"], ["/notices", "Notices"]]],
            ["Union", [["/events", "Events"], ["/admin", "Admin"]]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">{title as string}</div>
              <ul className="space-y-2">
                {(links as [string, string][]).map(([href, label]) => (
                  <li key={href}><Link href={href} className="hover:text-primary">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SRFTI Student Union
        </div>
      </footer>
    </main>
  );
}
