# TICKRISK WEBSITE IMPLEMENTATION PLAN (PHASE 2)

## GOAL
Extend the existing TickRisk MVP into a fully SEO-optimized microsite with localized landing pages and an annual overview, while **strictly minimizing disruption to the existing codebase**.

## OBJECTIVE
We will add 7 new pages and SEO capabilities without rewriting the current application structure.
**Key Constraint:** "Least invasive and most reliable way possible."

## STRATEGY: ADDITIVE SCALABILITY
Instead of refactoring the entire app structure, we will:
1.  **Keep existing files exactly where they are** (no moving components to new folders).
2.  **Use the existing `App.jsx` layout** (Header/Footer are already global; no need to rebuild layout logic).
3.  **Add new features as new files**, importing them only where needed.
4.  **Perform only ONE targeted refactor:** Extracting the `ZipInput` logic from `LandingPage.jsx` to reuse it.

## SITE ARCHITECTURE OVERVIEW

### Existing pages (No Changes):
- `/` (Landing), `/results`, `/privacy`, `/terms`

### New Routes (Added to `App.jsx`):
- `/tick-forecast-2026` (Annual Page)
- `/tick-forecast-:stateSlug` (Dynamic State Page)

## TECHNICAL IMPLEMENTATION DETAILS

### 1. Centralized Configuration (New File)
Create `client/src/statesConfig.js`.
This file will hold all text, SEO titles, and data paths for the new pages.
**CRITICAL:** This config must align with the backend's `getRegionRisk` logic (in `server/index.js`) to ensure accurate risk calculations.

**Config Structure:**
```javascript
export const states = [
  {
    slug: "maine",
    name: "Maine",
    abbreviation: "ME", // REQUIRED: Must match 2-letter code used in server/index.js
    riskRegion: "northeast", // Matches backend region key (northeast, midwest, etc.)
    metaTitle: "Tick Forecast Maine 2026 | Tick Activity & Lyme Risk",
    metaDescription: "See current tick activity in Maine...",
    dataFile: "/data/forecast-maine.json",
    mapFile: "/images/maps/maine.svg",
    // ... content fields
  },
  // ... repeat for NH, VT, MA, CT, RI
];
```
*Note:* All 6 New England states fall under the **"northeast"** region in the backend risk model (`incidence: 115`).

### 2. Component Strategy (Flat & Simple)
We will NOT reorganize the `components` folder. We will simply add to it.

**Existing:**
- `client/src/components/Header.jsx`
- `client/src/components/Footer.jsx`

**New (Add these):**
- `client/src/components/ZipInput.jsx` (Extracted from LandingPage)
- `client/src/components/SeoMeta.jsx` (For dynamic SEO tags)
- `client/src/components/StateForecastPage.jsx` (The shared template)
- `client/src/components/TickForecast2026.jsx` (The annual page)

### 3. The "One Refactor": ZipInput
**Current State:** `LandingPage.jsx` has the form logic hardcoded.
**Plan:**
1.  Copy the form JSX and logic (state, `handleSearch`) into a new `ZipInput.jsx`.
2.  Verify `ZipInput.jsx` works in isolation.
3.  Replace the code in `LandingPage.jsx` with `<ZipInput />`.
*Risk Mitigation:* This is the only "destructive" change. We will verify the Landing Page immediately after this step.

### 4. Routing Updates (`App.jsx`)
We will simply insert the new routes into the existing `<Routes>` block.
```jsx
// client/src/App.jsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  {/* ... existing routes ... */}
  
  {/* NEW ROUTES */}
  <Route path="/tick-forecast-2026" element={<TickForecast2026 />} />
  <Route path="/tick-forecast-:stateSlug" element={<StateForecastPage />} />
</Routes>
```
*Note:* The existing `Header` and `Footer` in `App.jsx` will automatically wrap these new pages. No layout refactor needed.

## PAGE GOALS AND CONTENT REQUIREMENTS

### STATE PAGES (`/tick-forecast-[state]/`)
**Implementation:** `StateForecastPage.jsx`
- **Dynamic Content:** Reads `stateSlug` from URL -> looks up data in `statesConfig.js`.
- **Risk Data Integration:** Passes `abbreviation` (e.g., "ME") to API calls to ensure the backend applies the correct regional risk modifier.
- **SEO:** Uses `SeoMeta` to inject title/meta tags.
- **Structure:**
    1.  Hero (Title + `ZipInput`)
    2.  Data Snapshot (Static Image/Chart)
    3.  Text Content (from Config)
    4.  FAQ (from Config)

### ANNUAL PAGE (`/tick-forecast-2026/`)
**Implementation:** `TickForecast2026.jsx`
- **Content:** Static overview of 2026 trends.
- **Links:** List of links to all state pages (generated from `statesConfig.js`).

## DEPLOYMENT AND ONGOING TASKS
- **Sitemap:** Use a simple script or plugin to generate `sitemap.xml` based on `statesConfig.js`.
- **Data:** Ensure `forecast-[state].json` files are in `client/public/data/`.

## IMPLEMENTATION STEPS (ORDER OF OPERATIONS)

1.  **Create Config:** Write `client/src/statesConfig.js` with data for 6 states, ensuring `abbreviation` matches backend expectations.
2.  **Create Components:**
    - Build `SeoMeta.jsx`.
    - Build `ZipInput.jsx` (copy code from LandingPage).
3.  **Refactor LandingPage:** Swap inline form for `<ZipInput />`. **VERIFY.**
4.  **Build New Pages:**
    - Create `StateForecastPage.jsx` (connects Config + ZipInput + SeoMeta).
    - Create `TickForecast2026.jsx`.
5.  **Update Router:** Add lines to `App.jsx`.
6.  **Verify:** Check all links and SEO tags.

**Summary:** This plan minimizes risk by preserving the current folder structure and layout logic, isolating the only refactor (`ZipInput`), and using an additive approach for all new features.
