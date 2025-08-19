## AI Cover Letter Generator (Frontend)

Responsive Next.js interface to upload a resume (PDF), paste job requirements, and generate / edit a tailored cover letter. PDF download supported (client-side via jsPDF). Backend (Flask) will handle future AI generation & server‑side PDF text extraction.

Deployed: https://web-production-55202.up.railway.app/

### Key Features
- Resume PDF upload with filename preview & highlight state
- Job requirements textarea (large, responsive)
- Generated cover letter editable pane (side-by-side on desktop, stacked on mobile)
- Download cover letter as PDF (jsPDF)
- Sticky responsive header with custom SVG logo
- Fully utility‑driven styling (Tailwind CSS)

### Roadmap
- Integrate Flask API (resume + job requirements → AI cover letter)
- Server-side PDF text extraction (pypdf)
- Loading / error states & validation
- Copy to clipboard & version history
- Model prompt tuning + personalization fields
- Dark mode

### Local Development
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Environment / API
Default API base (if env var unset): https://web-production-55202.up.railway.app

You can override with an environment variable:

Add to a `.env.local` file (not committed):
```
NEXT_PUBLIC_API_BASE=https://web-production-55202.up.railway.app
```
During local backend dev:
```
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

### Suggested Flask Endpoint (planned)
POST /generate (multipart/form-data)
Fields: resume (file), job_requirements (text)
Returns: { cover_letter, resume_text }

### Tech Stack
- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- jsPDF

### License
MIT – see `LICENSE`.

### Author
Darshak Vasoya (c) 2025

PRs & issues welcome.
