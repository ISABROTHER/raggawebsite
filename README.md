# Hon. Dr. Kwamena Minta Nyarku (Ragga) - Obiara Ka Ho

A modern, full-featured political website for the Member of Parliament for Cape Coast North, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Pages
- **Home**: Hero section with campaign slogan, core values, statistics, and call-to-action buttons
- **About**: Biography, achievements, leadership principles, and personal story
- **Achievements**: Verified accomplishments in Infrastructure, Education, Health, Employment, and Agriculture
- **Events**: Community events calendar with RSVP functionality
- **Assemblymen**: Directory of local representatives working with Hon. Ragga
- **Volunteer & Issues**: Issue reporting form and volunteer opportunities

### Features
- **Dark Mode**: System-aware theme toggle with smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Newsletter Signup**: Integrated in footer with Supabase backend
- **Issue Reporting**: Community members can report local issues
- **Polls System**: Engage constituents with polls and surveys
- **Appointment Booking**: Schedule meetings with the MP's office
- **Ongoing Projects Tracker**: Real-time updates on infrastructure projects
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Accessible**: ARIA labels, keyboard navigation, and semantic HTML

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (for admin features)

## Design System

### Colors
- **Primary**: Navy blue (`#1e3a8a`) - Trust, stability, leadership
- **Secondary**: Amber (`#f59e0b`) - Energy, optimism, action
- **Accent**: White and gray tones for contrast
- **Dark Mode**: Full support with refined color palette

### Typography
- Clean, professional font stack
- Hierarchical sizing for clarity
- 150% line height for body text
- 120% line height for headings

### Components
- Gradient buttons with hover effects
- Card-based layouts with shadows
- Smooth transitions and animations
- Mobile-optimized navigation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd politician-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Update `.env` file (already configured in this project)

4. Run the database schema:
   - Open your Supabase SQL Editor
   - Copy and run the SQL from `supabase-schema.sql`
   - This will create all tables, RLS policies, and sample data

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Database Schema

The application uses the following tables:

- **achievements**: Verified accomplishments across various sectors
- **events**: Community events with RSVP tracking
- **issues**: Community-reported issues and concerns
- **polls**: Public opinion surveys and voting
- **appointments**: Meeting scheduling with the MP's office
- **projects**: Ongoing infrastructure and development projects
- **newsletter_signups**: Email subscribers
- **volunteer_signups**: Volunteer applications
- **assemblymen**: Local representatives directory

All tables have Row Level Security (RLS) enabled:
- Public read access for published content
- Public write access for forms (RSVP, newsletter, volunteer, contact)
- Authenticated write access for admin operations

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimatedSection.tsx
│   ├── Button.tsx
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── contexts/           # React context providers
│   └── ThemeContext.tsx
├── data/              # Static data and configurations
│   └── locations.ts
├── lib/               # Utilities and configurations
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts
├── pages/             # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Achievements.tsx
│   ├── Assemblymen.tsx
│   ├── Events.tsx
│   ├── Issues.tsx
│   ├── Polls.tsx
│   ├── Appointments.tsx
│   ├── OngoingProjects.tsx
│   ├── Volunteer.tsx
│   ├── ReadStory.tsx
│   └── Admin.tsx
├── App.tsx            # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles and animations
```

## Admin Dashboard

Access the admin dashboard by navigating to the "admin" page (add `?page=admin` or modify navigation).

**Note**: In production, you should:
1. Add authentication (Supabase Auth is already set up)
2. Protect admin routes with auth guards
3. Implement full CRUD operations for all content types
4. Add image upload functionality

## Customization

### Branding
- Update MP name and details in `Header.tsx` and `Footer.tsx`
- Replace logo with official MP photo/constituency logo
- Modify color scheme in Tailwind config if needed

### Content
- Sample data is included in `supabase-schema.sql`
- Use the admin dashboard to add/edit events and projects
- Update biography and achievements in `About.tsx`
- Add assemblymen details through the database
- Update constituency-specific information

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any static hosting service:
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Railway
- Render

## Contributing

This is a parliamentary website for Hon. Dr. Kwamena Minta Nyarku (Ragga), Member of Parliament for Cape Coast North.

## License

All rights reserved. Official website of Hon. Dr. Kwamena Minta Nyarku (Ragga).

## Support

For questions or issues, contact the MP's office through the website's contact form.

---

**About**: This website serves the constituents of Cape Coast North, Ghana, providing transparency, accessibility, and community engagement with their elected representative.
