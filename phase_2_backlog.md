# Phase 2 Execution Backlog

This document outlines the step-by-step execution plan for Phase 2.
**Instructions for Agent:**
1.  Execute one task at a time.
2.  After completing a task, verify the functionality described in the "Verification" section.
3.  Mark the task as `[x]` in this document before moving to the next.

---

- [x] **Step 1: Create Centralized State Config**
    - **Action:** Create `client/src/statesConfig.js`.
    - **Details:** Define the `states` array with metadata for 6 New England states (Maine, New Hampshire, Vermont, Massachusetts, Connecticut, Rhode Island).
    - **Requirements:**
        - Include `slug`, `name`, `abbreviation` (must match backend 2-letter code, e.g., "ME"), `riskRegion` (must be "northeast"), `metaTitle`, `metaDescription`, `dataFile`, and `mapFile`.
    - **Verification:** File exists and exports the `states` array correctly.

- [x] **Step 2: Create SEO Meta Component**
    - **Action:** Create `client/src/components/SeoMeta.jsx`.
    - **Details:** A wrapper component using `react-helmet-async`.
    - **Requirements:**
        - Accept `title`, `description`, and `schema` (JSON-LD) as props.
        - Render `<Helmet>` with these tags.
    - **Verification:** Component compiles and can be imported.

- [x] **Step 3: Create ZipInput Component**
    - **Action:** Create `client/src/components/ZipInput.jsx`.
    - **Details:** Extract the search form logic from `LandingPage.jsx`.
    - **Requirements:**
        - Copy `location` state, `handleSearch` function, `isLoading` state, and the JSX for the form.
        - Ensure it handles navigation to `/results` correctly.
    - **Verification:** Component renders in isolation (can be temporarily tested).

- [x] **Step 4: Refactor Landing Page**
    - **Action:** Modify `client/src/pages/LandingPage.jsx`.
    - **Details:** Replace the inline form code with the new `<ZipInput />` component.
    - **Requirements:**
        - Import `ZipInput`.
        - Remove the duplicate logic (state/handlers) that was moved to the component.
        - Ensure the page looks *exactly* the same.
    - **Verification:** Run the app. Enter a ZIP code on the homepage. It must navigate to the results page successfully.

- [x] **Step 5: Create State Forecast Template**
    - **Action:** Create `client/src/components/StateForecastPage.jsx`.
    - **Details:** The shared dynamic page for all states.
    - **Requirements:**
        - Use `useParams` to get the `stateSlug`.
        - Find the matching state in `statesConfig.js`.
        - Render `SeoMeta` with state-specific tags.
        - Render `ZipInput`.
        - Display a placeholder for the state map/chart.
    - **Verification:** Component compiles.

- [x] **Step 6: Create Annual Forecast Page**
    - **Action:** Create `client/src/components/TickForecast2026.jsx`.
    - **Details:** The static annual overview page.
    - **Requirements:**
        - Render static content about the 2026 outlook.
        - Render `ZipInput`.
        - Map through `statesConfig` to display links to all state pages.
    - **Verification:** Component compiles.

- [x] **Step 7: Update Router**
    - **Action:** Modify `client/src/App.jsx`.
    - **Details:** Register the new routes.
    - **Requirements:**
        - Import `StateForecastPage` and `TickForecast2026`.
        - Add route: `/tick-forecast-2026`.
        - Add dynamic route: `/tick-forecast-:stateSlug`.
    - **Verification:**
        - Navigate to `http://localhost:5173/tick-forecast-maine` -> Should show Maine content.
        - Navigate to `http://localhost:5173/tick-forecast-2026` -> Should show Annual page.

- [x] **Step 8: Update Footer**
    - **Action:** Modify `client/src/components/Footer.jsx`.
    - **Details:** Add internal links for SEO.
    - **Requirements:**
        - Add a "Forecasts by State" section.
        - Map through `statesConfig` to render links.
        - Add link to "2026 Annual Forecast".
    - **Verification:** Footer links appear on the homepage and navigate correctly to the new pages.

- [x] **Step 9: Add Static Data Files**
    - **Action:** Create `client/public/data/forecast-[state].json` for all 6 states.
    - **Details:** Create simple JSON files with placeholder data (e.g., "riskLevel": "High", "summary": "...") to verify data loading.
    - **Requirements:**
        - Update `StateForecastPage.jsx` to `fetch` this data on mount.
    - **Verification:** Visit a state page (e.g., Maine) and confirm the JSON data is being fetched and displayed (console log or UI).

- [x] **Step 10: Sitemap Generation**
    - **Action:** Create `client/public/sitemap.xml`.
    - **Details:** A static sitemap file.
    - **Requirements:**
        - Include root `/`.
        - Include `/tick-forecast-2026`.
        - Include all 6 state URLs.
    - **Verification:** Open `http://localhost:5173/sitemap.xml` in the browser.

- [x] **Step 11: Fix Scroll Behavior**
    - **Action:** Create `client/src/components/ScrollToTop.jsx` and add to `App.jsx`.
    - **Details:** Ensure the page scrolls to the top on route transitions.
    - **Requirements:**
        - Use `useEffect` with `useLocation` to trigger `window.scrollTo(0, 0)`.
    - **Verification:** Navigate between pages (especially via footer links) and verify the view resets to the top.

- [x] **Step 12: Remove Global Header**
    - **Action:** Modify `client/src/App.jsx`.
    - **Details:** Remove the `<Header />` component entirely.
    - **Requirements:**
        - No header should appear on any page.
    - **Verification:** Check Home, Results, and Forecast pages to ensure no header is present.
