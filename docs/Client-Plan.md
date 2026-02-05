# Atma Rekha — Detailed Project Plan (Client Version)

## Page 1 — Vision, Goals, and End‑Result

### 1. Project Vision
Atma Rekha will be a full‑scale Indian manga platform where original stories are published and read online. The product will feel premium, culturally rooted, and fast. It will support high‑quality visuals, chapter reading, and future growth into mobile apps or subscriptions.

### 2. Business Goals
- Build a strong reading community
- Allow structured publishing with admin control
- Keep content consistent and high quality
- Create a scalable platform for long‑term growth

### 3. End Result (What Client Will Receive)
A complete web platform with:
- Reader‑facing frontend
- Admin publishing dashboard
- Cloud storage for media (images + PDFs)
- Review & rating system
- Clean modular code ready for expansion

---

## Page 2 — Detailed Features (Reader + Admin)

### A. Reader‑Side Experience

#### 1. Discovery & Browsing
- Home page with hero + featured story
- Latest updates section
- Search bar
- Story cards with genre + author

#### 2. Story Detail Page
- Cover image + synopsis
- Author info
- Rating summary
- Read buttons for chapters

#### 3. Reading Experience
- Chapter list
- Click to open chapter
- Two viewing modes:
  - Image reader (page‑by‑page)
  - PDF reader
- Smooth navigation between chapters

#### 4. Reviews & Ratings
- Users can rate 1–5 stars
- Add review comments
- Average rating displayed on story page
- Reviews listed in chronological order

### B. Admin Panel (Full Content Management)

#### 1. Story Management
- Create, edit, delete stories
- Upload cover image
- Add metadata (genre, tags, language, author)

#### 2. Chapter Management
- Add new chapters
- Upload PDF for each chapter
- Upload page images (multiple files per chapter)
- Reorder pages
- Edit chapter titles and dates

#### 3. Content Control
- Publish / unpublish stories
- Control visibility on frontend
- Edit or remove outdated content

#### 4. Media Storage
- All images + PDFs stored securely on Cloudinary
- Admin can replace or delete files anytime

---

## Page 3 — Technical Plan & Implementation Roadmap

### 1. Technology Stack
- Frontend: React + Tailwind CSS + GSAP
- Admin Panel: React (separate dashboard route)
- Backend: Node.js + Express
- Database: MongoDB
- Storage: Cloudinary

### 2. Data Architecture
- Stories Collection: title, description, cover, tags, status
- Chapters Collection: story ID, chapter number, PDF link, page images
- Reviews Collection: user ID, story ID, rating, text

### 3. Flow Example
1. Admin uploads story
2. Chapter PDF + images uploaded to Cloudinary
3. Cloudinary links saved in database
4. Frontend fetches story info
5. Users read and review

### 4. Full Roadmap (Estimated)
**Phase 1 — UI + Frontend (Week 1–2)**
- Landing page
- Reading page
- Core layout + UI interactions

**Phase 2 — Admin Panel (Week 3–4)**
- Admin login
- Story/Chapter dashboard
- Upload system (Cloudinary)

**Phase 3 — Backend + Database (Week 5–6)**
- API endpoints for stories/chapters/reviews
- Storage integration
- Security and access control

**Phase 4 — Testing + Launch Prep (Week 7)**
- Bug fixes
- Performance optimization
- Deployment setup

---

## Final Deliverables
- Full React frontend (reader side)
- Admin dashboard (content management)
- Cloudinary integration (images + PDFs)
- Reviews + ratings system
- Clean modular code ready for future features
