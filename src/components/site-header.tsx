"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/cinema", label: "Screenings" },
  { href: "/students-cut", label: "Student's Vote" },
  { href: "/awaz-do", label: "Awaz Do" },
  { href: "/students", label: "Alumni" },
  // { href: "/notices", label: "Notices" },
  { href: "/events", label: "Events" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  if (isHome) {
    return null;
  }

  // Compute breadcrumbs
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    let label = segment;

    if (segment === "students") label = "Alumni";
    else if (segment === "students-cut") label = "Student's Vote";
    else if (segment === "awaz-do") label = "Awaz Do";
    else if (segment === "cinema") label = "Screenings";
    // else if (segment === "notices") label = "Notices";
    else if (segment === "events") label = "Events";
    else if (segment === "admin") label = "Admin";
    else if (segment === "me") label = "My Profile";
    else if (segment === "poll") label = "Poll";
    else if (segment === "bulletin") label = "Bulletin";
    else if (segment.length > 12) label = segment.slice(0, 10) + "…";

    return { href, label, isLast: index === pathSegments.length - 1 };
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider">Back</span>
            </Button>
          )}

          <Link href="/" className="flex items-baseline gap-2 font-display">
            <span className="text-lg font-bold tracking-tight">SRFTI</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
              Student Union
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground ${isActive ? "text-foreground font-semibold" : ""
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side links */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground px-2 py-1 border border-border/60 rounded"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Breadcrumbs for secondary pages */}
      {!isHome && breadcrumbs.length > 0 && (
        <div className="border-t border-border/40 bg-muted/20 px-6 py-1.5 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-[1400px] items-center gap-1.5 overflow-x-auto">
            <Link href="/" className="flex items-center hover:text-foreground">
              <Home className="h-3 w-3 mr-1" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb) => (
              <div key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                {crumb.isLast ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
