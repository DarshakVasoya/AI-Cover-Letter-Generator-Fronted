## AI Cover Letter Generator (Frontend)

Generate a tailored, editable cover letter from a PDF resume and job description. Features a modern responsive UI, PDF export with formatting, and backend integration for AI generation.

Deployed: https://web-production-55202.up.railway.app/

### Current Features
- PDF resume upload (size validation, highlighting)
- Job description input
- AI cover letter generation (via backend endpoint)
- Editable letter pane with professional styling & justified PDF output
- Multi-page PDF export with line wrapping
- Error handling, file size guard

### Stack
- Next.js App Router (React 19)
- Tailwind CSS 4
- jsPDF for client PDF export
- Planned backend: Flask (Gemini / other LLM providers)

### Getting Started
```bash
npm install
npm run dev
```
Visit http://localhost:3000

Environment (optional):
```
NEXT_PUBLIC_API_BASE=https://web-production-55202.up.railway.app
NEXT_PUBLIC_API_TIMEOUT_MS=90000
```

### Planned / Extended Functionality
| Category | Planned Feature | Notes |
|----------|-----------------|-------|
| Cover Letters | Tone selector (formal / concise / enthusiastic) | Adds prompt modifiers |
| Cover Letters | Keyword optimization suggestions | Highlight missing JD keywords |
| Resume Parsing | Skill extraction & ranking | NLP extraction on backend |
| Resume Parsing | Gap / inconsistency detection | Flag date gaps, duplicate roles |
| Interview Prep | AI-generated interview questions | Based on JD + resume alignment |
| Interview Prep | Mock answer drafting | Provide STAR-format answer skeletons |
| Interview Prep | Follow-up email generator | After interview scenario |
| CV Generation | Resume (CV) generator | Takes structured profile + outputs CV sections |
| CV Generation | Multiple templates (ATS / Modern / Minimal) | Export as PDF & DOCX |
| CV Generation | Bullet point enhancer | Action verb + metric suggestion engine |
| Portfolio | Project summary generator | Turn raw project notes into concise bullets |
| Personalization | User profile persistence / auth | Save resumes & letters securely |
| Personalization | Multi-language support | i18n for UI + generation language toggle |
| Analytics | Improvement suggestions | Compare original vs optimized letter |
| Analytics | Success tracking (manual input) | Feedback loop to refine prompts |
| Collaboration | Shareable link preview (read-only) | For mentor or peer review |
| Export | DOCX export | For Word editing |
| Export | Email body export mode | Strips headers/signoff formatting |
| Integrations | LinkedIn job parser | Auto-fill job description from URL |
| Integrations | ATS keyword scan | Score vs JD keywords |
| Performance | Streaming generation | Partial letter appears while generating |
| Performance | Client-side caching | Avoid regenerating identical inputs |
| Reliability | Retry & backoff (configurable) | Already partially implemented earlier |
| Accessibility | WCAG contrast + keyboard nav audit | A11y improvements |
| Security | Rate limiting / abuse protection | Backend middleware |
| Security | PII redaction option | Strip personal info before sending to model |

### API Contract (Planned Standardization)
POST /generate_coverletter
Multipart: resume (file), job_description (text)
Response:
```
{
	"cover_letter": "...",
	"resume_parse_status": "ok|empty_or_unparsed",
	"resume_text_chars": 1234,
	"provider": "gemini",
	"model_used": "gemini-1.5-flash"
}
```

### Roadmap Highlights
1. Improve extraction accuracy (fallback to OCR for scanned PDFs)
2. Introduce tone & length controls
3. Add CV builder with template selection
4. Launch interview question pack + answer guidance
5. Implement account system + saved assets

### Contributing
PRs & feature suggestions welcome. Please open an issue describing the enhancement before large changes.

### License
MIT (see LICENSE)

### Author
Darshak Vasoya (c) 2025
