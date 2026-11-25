export const screenings = [
  {
    id: "1",
    title: "The 400 Blows",
    director: "François Truffaut",
    year: 1959,
    country: "France",
    language: "French",
    duration: 99,
    poster_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    description:
      "A young boy's experience of school, family, and the streets of Paris. Antoine Doinel is a misunderstood adolescent growing up in 1950s Paris, neglected by his parents and rebelling against the oppressive school system.",
    screening_date: "2026-11-20",
    screening_time: "18:30",
    venue: "Main Auditorium",
    program_type: "new_crt",
    is_active: true,
  },
  {
    id: "2",
    title: "Persona",
    director: "Ingmar Bergman",
    year: 1966,
    country: "Sweden",
    language: "Swedish",
    duration: 85,
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=800&h=600&fit=crop",
    description:
      "A nurse and her mute patient form a complex psychological bond that blurs the line between identity and persona.",
    screening_date: "2026-11-22",
    screening_time: "19:00",
    venue: "Screening Room 2",
    program_type: "new_crt",
    is_active: true,
  },
  {
    id: "3",
    title: "Chungking Express",
    director: "Wong Kar-wai",
    year: 1994,
    country: "Hong Kong",
    language: "Cantonese",
    duration: 102,
    poster_url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop",
    description:
      "Two intersecting love stories in neon-lit Hong Kong, following two lonely policemen and the women they encounter.",
    screening_date: "2026-11-25",
    screening_time: "18:00",
    venue: "Main Auditorium",
    program_type: "students_cut",
    is_active: true,
  },
  {
    id: "4",
    title: "8½",
    director: "Federico Fellini",
    year: 1963,
    country: "Italy",
    language: "Italian",
    duration: 138,
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=800&h=600&fit=crop",
    description:
      "A famous film director struggles with creative block while juggling his personal and professional life.",
    screening_date: "2026-11-27",
    screening_time: "20:00",
    venue: "Screening Room 1",
    program_type: "new_crt",
    is_active: true,
  },
  {
    id: "5",
    title: "In the Mood for Love",
    director: "Wong Kar-wai",
    year: 2000,
    country: "Hong Kong",
    language: "Cantonese",
    duration: 98,
    poster_url: "https://images.unsplash.com/photo-1492754080187-83976815c158?w=800&h=600&fit=crop",
    description:
      "Two neighbors form a strong bond after both suspect their spouses of infidelity.",
    screening_date: "2026-11-29",
    screening_time: "18:30",
    venue: "Main Auditorium",
    program_type: "students_cut",
    is_active: true,
  },
];

export const rotation = [
  {
    week: "Nov 16-22, 2026",
    group: "Direction - Batch 2023",
    status: "completed",
    films: 3,
  },
  {
    week: "Nov 23-29, 2026",
    group: "Cinematography - Batch 2024",
    status: "current",
    films: 5,
  },
  {
    week: "Nov 30 - Dec 6, 2026",
    group: "Editing - Batch 2022",
    status: "upcoming",
    films: 0,
  },
  {
    week: "Dec 7-13, 2026",
    group: "Screenwriting - Batch 2023",
    status: "upcoming",
    films: 0,
  },
];

export const currentPoll = {
  id: "1",
  title: "Student's Vote Poll: Week of Nov 23-29",
  status: "open",
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

export const students = [
  {
    id: "1",
    name: "Arjun Patel",
    wing: "Film Wing",
    department: "Direction",
    batch: "2023",
    group: "A",
    email: "arjun.patel@srfti.ac.in",
    phone: "+91 98765 43210",
    instagram: "@arjunpatel_films",
    linkedin: "arjun-patel-srfti",
    website: "arjunpatel.com",
    bio:
      "Third-year Direction student passionate about narrative cinema and visual storytelling. Interested in the intersection of traditional filmmaking and new media.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    specialisation: "Narrative Direction",
    portfolio: [
      {
        id: "1",
        title: "The Last Train",
        category: "Short Film",
        year: 2025,
        description:
          "A 15-min drama about a station master's final shift.",
        poster:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
        video: "https://youtube.com/watch?v=example1",
      },
      {
        id: "2",
        title: "Monsoon Memories",
        category: "Documentary",
        year: 2024,
        description:
          "A personal essay film about childhood monsoons in Kerala.",
        poster:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=225&fit=crop",
        video: "https://youtube.com/watch?v=example2",
      },
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    wing: "Film Wing",
    department: "Cinematography",
    batch: "2024",
    group: "B",
    email: "priya.sharma@srfti.ac.in",
    phone: "+91 98765 43211",
    instagram: "@priyasharma_dop",
    linkedin: "priya-sharma-srfti",
    website: "priyasharma.com",
    bio:
      "Cinematography student exploring light, texture, and movement through the lens.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    specialisation: "Cinematography",
    portfolio: [
      {
        id: "3",
        title: "Golden Hour",
        category: "Short Film",
        year: 2025,
        description: "A study of natural light across a single day.",
        poster:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
        video: "https://youtube.com/watch?v=example3",
      },
    ],
  },
  {
    id: "3",
    name: "Rahul Singh",
    wing: "Film Wing",
    department: "Editing",
    batch: "2022",
    group: "A",
    email: "rahul.singh@srfti.ac.in",
    phone: "+91 98765 43212",
    instagram: "@rahulsingh_edit",
    linkedin: "rahul-singh-srfti",
    website: null,
    bio:
      "Editing student focused on pacing, rhythm, and narrative structure in documentary and fiction.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    specialisation: "Film Editing",
    portfolio: [],
  },
  {
    id: "4",
    name: "Ananya Das",
    wing: "Electronic Dance Music",
    department: "Electronic Music Production",
    batch: "2024",
    group: "C",
    email: "ananya.das@srfti.ac.in",
    phone: "+91 98765 43213",
    instagram: "@ananyadas_produces",
    linkedin: "ananya-das-srfti",
    website: "ananyadas.com",
    bio:
      "EDM student producing experimental electronic soundscapes and audiovisual performances.",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    specialisation: "Sound Design",
    portfolio: [
      {
        id: "4",
        title: "Frequency",
        category: "Experimental",
        year: 2024,
        description: "Audiovisual exploration of frequency and resonance.",
        poster:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
        video: "https://youtube.com/watch?v=example4",
      },
    ],
  },
];

export const articles = [
  {
    id: "1",
    title: "Union Elections 2026: Results Announced",
    summary:
      "The new student union council has been elected. Meet your representatives.",
    body: `The SRFTI Student Union elections for 2026 have concluded successfully. The new council represents both the Film Wing and the Electronic Dance Music Wing, ensuring balanced representation across all departments.

The election saw record turnout, with over 85% of enrolled students casting their votes. The new council will serve a one-year term, overseeing screenings, events, publications, and student welfare initiatives.

Key priorities for the new council include expanding the weekly New CRT screening program, improving hostel infrastructure, and launching a mentorship program connecting senior students with juniors.

The council will be formally inaugurated at the upcoming Student Film Festival 2027.`,
    author: "Awaz Do Editorial Team",
    category: "Announcement",
    poster_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop",
    published_at: "2026-11-15T10:00:00Z",
    is_published: true,
  },
  {
    id: "2",
    title: "New Screening Equipment Arrives",
    summary:
      "The institute has procured new 4K projectors for the main auditorium.",
    body:
      "The institute has procured new 4K laser projectors for the main auditorium, significantly upgrading the screening experience for New CRT and Student's Vote programs.",
    author: "Cinema Committee",
    category: "Infrastructure",
    poster_url: "https://images.unsplash.com/photo-1519389050341-b9994c4cbacb?w=1200&h=600&fit=crop",
    published_at: "2026-11-10T14:30:00Z",
    is_published: true,
  },
  {
    id: "3",
    title: "Student Film Festival Call for Entries",
    summary:
      "Annual SRFTI Student Film Festival opens submissions for 2027 edition.",
    body:
      "Submissions are now open for the annual SRFTI Student Film Festival 2027. Students from all wings and departments are invited to submit their short films, documentaries, and experimental works.",
    author: "Festival Committee",
    category: "Events",
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=1200&h=600&fit=crop",
    published_at: "2026-11-05T09:00:00Z",
    is_published: true,
  },
];

export const bulletins = [
  {
    id: "1",
    title: "Awaz Do Bulletin - November 2026",
    description:
      "Monthly bulletin covering union activities, screenings, and announcements.",
    author: "Student Union",
    publication_date: "2026-11-01",
    drive_file_id: "1abc123",
    drive_url: "https://drive.google.com/file/d/1abc123/view",
    cover_image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=500&fit=crop",
    is_published: true,
  },
  {
    id: "2",
    title: "Awaz Do Bulletin - October 2026",
    description:
      "Mid-term review, festival highlights, and upcoming events.",
    author: "Student Union",
    publication_date: "2026-10-01",
    drive_file_id: "1def456",
    drive_url: "https://drive.google.com/file/d/1def456/view",
    cover_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    is_published: true,
  },
];

export const voices = [
  {
    id: "1",
    title: "Demand: Better Hostel WiFi",
    type: "demand",
    author: "Student Council",
    is_official: true,
    published_at: "2026-11-15",
    body:
      "We demand improved internet connectivity in all hostels to support academic and creative work.",
  },
  {
    id: "2",
    title: "Statement on Screening Schedule Changes",
    type: "statement",
    author: "Cinema Committee",
    is_official: true,
    published_at: "2026-11-10",
    body:
      "Due to unforeseen circumstances, this week's screening schedule has been adjusted. Please check the updated timetable.",
  },
  {
    id: "3",
    title: "Update: New Equipment Arrival",
    type: "update",
    author: "Admin Office",
    is_official: true,
    published_at: "2026-11-05",
    body:
      "The new 4K projectors have been installed in the main auditorium and are ready for use.",
  },
  {
    id: "4",
    title: "Resolution: Extended Library Hours",
    type: "resolution",
    author: "Student Council",
    is_official: true,
    published_at: "2026-10-28",
    body:
      "The council has passed a resolution requesting extended library hours during exam season.",
  },
  {
    id: "5",
    title: "Timeline: Student Film Festival 2027",
    type: "timeline_event",
    author: "Festival Committee",
    is_official: false,
    published_at: "2026-10-20",
    body: "Key dates for the upcoming student film festival.",
  },
  {
    id: "6",
    title: "My Experience: Direction Workshop",
    type: "contribution",
    author: "Arjun Patel",
    is_official: false,
    published_at: "2026-10-15",
    body: "Sharing my learnings from the recent direction workshop with alumni.",
  },
];

export const notices = [
  {
    id: "1",
    title: "Semester Registration Deadline Extended",
    body:
      "The deadline for semester registration has been extended to Nov 30.",
    category: "Academic",
    date: "2026-11-20",
    venue: "Admin Office",
    author: "Registrar",
    is_archived: false,
  },
  {
    id: "2",
    title: "Hostel Maintenance Schedule",
    body:
      "Water supply will be interrupted on Nov 25 for maintenance.",
    category: "Facilities",
    date: "2026-11-18",
    venue: "All Hostels",
    author: "Maintenance Dept",
    is_archived: false,
  },
  {
    id: "3",
    title: "Library Holiday Hours",
    body:
      "Library will operate on reduced hours during the winter break.",
    category: "Library",
    date: "2026-11-15",
    venue: "Central Library",
    author: "Librarian",
    is_archived: false,
  },
  {
    id: "4",
    title: "Previous: Exam Schedule Published",
    body:
      "Mid-term exam schedule for Batch 2023-2025.",
    category: "Academic",
    date: "2026-10-10",
    venue: "Notice Board",
    author: "Exam Cell",
    is_archived: true,
  },
];

export const events = [
  {
    id: "1",
    title: "Student Film Festival 2027 - Submissions Open",
    description:
      "Submit your films for the annual SRFTI Student Film Festival.",
    date: "2026-12-01",
    time: "09:00",
    venue: "Online Portal",
    organiser: "Festival Committee",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Direction Masterclass with Alumni",
    description:
      "Interactive session with award-winning director alumni.",
    date: "2026-11-25",
    time: "14:00",
    venue: "Screening Room 1",
    organiser: "Direction Dept",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a6?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Sound Design Workshop",
    description:
      "Hands-on workshop on field recording and sound design.",
    date: "2026-11-28",
    time: "10:00",
    venue: "Sound Studio",
    organiser: "Sound Dept",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Alumni Meet 2026",
    description:
      "Annual alumni gathering with screenings and networking.",
    date: "2026-12-15",
    time: "18:00",
    venue: "Main Auditorium",
    organiser: "Alumni Association",
    poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
  },
];

export const profile = {
  id: "1",
  name: "Arjun Patel",
  email: "arjun.patel@srfti.ac.in",
  phone: "+91 98765 43210",
  instagram: "@arjunpatel_films",
  linkedin: "arjun-patel-srfti",
  website: "arjunpatel.com",
  bio:
    "Third-year Direction student passionate about narrative cinema and visual storytelling. Interested in the intersection of traditional filmmaking and new media.",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  wing: "Film Wing",
  department: "Direction",
  batch: "2023",
  group: "A",
  specialisation: "Narrative Direction",
};
