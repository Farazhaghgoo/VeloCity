# VeloCity

VeloCity is a modern, high-performance landing page designed for data-verification and secure data room workflows. It features a sophisticated, data-driven aesthetic with interactive animations, designed to build trust from the first click.

## Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, and Tailwind CSS v4.
- **Smooth Animations**: Uses GSAP and Framer Motion for premium, hardware-accelerated micro-interactions and scroll animations.
- **Smooth Scrolling**: Integrated with Lenis for a buttery-smooth scrolling experience.
- **Fully Responsive**: Optimized for all devices, from mobile to desktop.
- **High-Trust Aesthetic**: A professional, data-centric design perfect for VC, fintech, and enterprise software.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Architecture

The project is structured around modular, reusable React components in the `components/` directory. The main landing page is assembled in `app/page.tsx`.

Key sections include:
- Interactive Hero and Loading Sequences
- Feature Bentos and "How It Works" explanations
- Security and Trust verification strips
- Interactive Data Room demonstrations

## Backend ecosystem

The repo now includes a functional backend layer for waitlist operations:

- `POST /api/waitlist`: validates input, deduplicates by email, and persists submissions.
- `GET /api/waitlist`: returns waitlist totals and role breakdown.
- `GET /api/health`: backend health probe including waitlist stats.

### Data and storage

- Waitlist records are stored in `data/waitlist.json`.
- The API uses Node.js runtime (`runtime = "nodejs"`) to support file-system persistence.
- The storage module is in `lib/waitlist/store.ts`.

### Shared contract (frontend + backend sync)

- Shared waitlist types: `lib/waitlist/types.ts`
- Shared request validation: `lib/waitlist/validation.ts`
- Shared client role helpers: `lib/waitlist/client.ts`

This keeps frontend role options and backend accepted roles perfectly aligned.

### Backend checks

Run:

```bash
npm run backend:check
```

This verifies core waitlist validation behavior.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
