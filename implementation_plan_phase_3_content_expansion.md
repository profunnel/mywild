# Implementation Plan - Phase 3: Content Expansion

**Goal:** Enhance the state forecast pages and the annual forecast page (2026) with rich, static, evergreen, SEO-optimized content while keeping the implementation scalable and low-maintenance.

**Strategy:**
-   **Remove** "live" or "current" tick risk calculations.
-   **Replace** with high-quality evergreen educational content.
-   **Centralize** shared content blocks to minimize maintenance.
-   **Retain** state-specific sections for SEO differentiation.
-   **Enhance** visual engagement and readability.

---

## 1. Site Structure & Architecture
*Status: Unchanged*

We will maintain the existing routes and file architecture established in Phase 2.
-   **Routes:**
    -   `/tick-forecast-2026`
    -   `/tick-forecast-[state]` (Maine, New Hampshire, Vermont, Massachusetts, Connecticut, Rhode Island)
-   **Backend:** No new backend logic required.

---

## 2. New Components & Content Architecture

### A. Centralized Content Store
Create a new directory `client/src/content/` to house static text assets.

#### 1. `client/src/content/pageContent.js`
Contains shared text sections used across all forecast pages.
-   **Intro:** "Understanding Tick Activity and Risk Forecasts"
-   **Prevention:** "Tick Bite Prevention & Outdoor Safety"
-   **Lyme Awareness:** "Lyme Disease and Tick-Borne Illness Awareness"
-   **Footer CTA:** "Check Your Local Tick Risk"

#### 2. `client/src/content/stateContent.js`
Contains localized content keyed by state slug.
-   **Overview:** Short, state-specific paragraph describing local tick habitats and risk factors (e.g., "Maine’s dense forests...", "Rhode Island’s coastal climate...").

---

## 3. Page Layout & Component Updates

### A. `StateForecastPage.jsx` Refactor
**Objective:** Transform from a data-fetching component to a rich content page.

1.  **Remove:**
    -   `useEffect` data fetching for `forecast-[state].json`.
    -   "Risk Level" UI and dynamic summary display.
    -   `useState` for forecast data.

2.  **Implement New Layout:**
    -   **Hero Section:**
        -   Background image (forest/nature theme).
        -   Title: “Tick Forecast [State] 2026”.
        -   Subheader: “Tick activity and Lyme disease outlook for [State].”
        -   `<ZipInput />` component.
    -   **Intro Section:** Render `sharedContent.intro`.
    -   **State Overview:**
        -   Render `stateDetails[stateSlug].overview`.
        -   Display state map image (`/images/maps/[state].svg`).
    -   **Prevention Section:** Render `sharedContent.prevention` with icons.
    -   **Lyme Awareness:** Render `sharedContent.lymeAwareness`.
    -   **Footer CTA:** Render `sharedContent.footerCTA` + `<ZipInput />`.

3.  **Visual Enhancements:**
    -   Alternating light/dark background sections.
    -   Gradient overlays on hero images.
    -   Fade-in animations on scroll.
    -   Icons for prevention tips.

4.  **SEO & Schema:**
    -   Use `<h2>` for all section headers.
    -   Inject state-specific meta description from `statesConfig.js`.
    -   Add `MedicalWebPage` JSON-LD schema.

### B. `TickForecast2026.jsx` Refactor
**Objective:** Create a comprehensive national/regional overview.

1.  **Implement New Layout:**
    -   **Hero Section:**
        -   Title: “Tick Forecast 2026: National and Regional Outlook”.
        -   `<ZipInput />`.
    -   **National Overview:**
        -   Render `sharedContent.intro`.
        -   Add specific 2026 outlook paragraph ("warmer winters...").
        -   Display vector map/infographic placeholder.
    -   **Regional Links:**
        -   Header: “Explore Forecasts by State”.
        -   Grid of clickable cards linking to each state page (using `statesConfig`).
    -   **Prevention & Awareness:** Render shared sections.
    -   **Footer CTA:** Render shared CTA.

---

## 4. SEO Strategy

-   **Keywords:** Target "Tick Forecast [State] 2026", "Lyme disease risk [State]", "Tick activity map [State]".
-   **Internal Linking:**
    -   State pages -> Annual page (`/tick-forecast-2026`).
    -   Footer -> All state pages (already implemented in Phase 2).
-   **Schema (JSON-LD):**
    -   Type: `MedicalWebPage`
    -   Properties: `name`, `description`, `about` (Lyme Disease), `publisher` (TickRisk).

---

## 5. Execution Checklist

### Step 1: Content Infrastructure
- [ ] Create `client/src/content/` directory.
- [ ] Create `client/src/content/pageContent.js` with shared text.
- [ ] Create `client/src/content/stateContent.js` with state-specific overviews.

### Step 2: Component Refactoring
- [ ] Refactor `StateForecastPage.jsx`:
    - [ ] Import content files.
    - [ ] Remove old fetching logic.
    - [ ] Build new sectioned layout.
    - [ ] Add animations and styles.
    - [ ] Implement Schema.org data.
- [ ] Refactor `TickForecast2026.jsx`:
    - [ ] Import content files.
    - [ ] Build new sectioned layout.
    - [ ] Add regional link grid.
    - [ ] Implement Schema.org data.

### Step 3: Cleanup & Verification
- [ ] Remove unused `client/public/data/` JSON files (optional, or keep for future use).
- [ ] Verify all routes load correctly.
- [ ] Verify SEO tags and Schema using browser dev tools or validators.
- [ ] Check mobile responsiveness of new layouts.

---

## 6. Scalability Notes

-   **Adding a State:**
    1.  Add entry to `statesConfig.js`.
    2.  Add overview text to `stateContent.js`.
    3.  (Optional) Add map image.
    *No code changes required in page components.*
