# Phase 4 Backlog: Design & Content Overhaul

This backlog breaks down the Master Blueprint into bite-sized, verifiable tasks with detailed AI agent instructions.

> [!IMPORTANT]
> **For AI Coding Agents:** Each task includes success criteria. Mark complete only when ALL criteria are met.

---

## 📊 Progress Overview

**Step 1: Foundation & Design System** - ✅ 2/2 Complete
- ✅ 1.1 CSS Variables & Design Tokens
- ✅ 1.2 Component Directory Structure

**Step 2: Core UI Components** - ✅ 8/8 Complete 🎉
- ✅ 2.1 Hero Component
- ✅ 2.2 StickyNav Component
- ✅ 2.3 Section Component
- ✅ 2.4 ContentBlock Component
- ✅ 2.5 FeatureGrid Component
- ✅ 2.6 StatCard Component
- ✅ 2.7 Accordion Component
- ✅ 2.8 Timeline Component

**Step 3: AI Image Generation** - ✅ 3/3 Complete 🎉
- ✅ 3.1 Hero Backgrounds (SVG Placeholders)
- ✅ 3.2 Scientific Illustrations (Stock Images)
- ✅ 3.3 Contextual Lifestyle Images (Placeholders)

**Step 4: Content Creation** - ✅ 4/6 Complete 🎉
- ✅ 4.1 Global Biology Content
- ✅ 4.2 Global Disease Content
- ✅ 4.3 Global Prevention & Removal
- ✅ 4.4-4.6 State Content (ME, NH, VT, MA, CT, RI)

**Step 5: Page Implementation** - � 1/4 Complete
- ✅ 5.1 State Forecast Page Rebuild
- 🔲 5.2 State Forecast Page Polish & Styling
- 🔲 5.3-5.4 Annual Forecast Page Rebuild

**Step 6: Verification & Polish** - 🔲 0/8 Complete
- 🔲 6.1 Mobile Responsiveness Check
- 🔲 6.2 Keyboard Navigation & Accessibility
- 🔲 6.3 Lighthouse Audit
- 🔲 6.4 SEO Meta Verification
- 🔲 6.5 Performance Checks
- 🔲 6.6 StickyNav Behavior Test
- 🔲 6.7 HTML Validation
- 🔲 6.8 Cross-Browser Testing

**Overall Progress: 17/31 tasks complete (54.8%)**

---

## Step 1: Foundation & Design System

### 1.1 CSS Variables & Design Tokens ✅
**File:** `client/src/index.css`

**Task:** Update with complete design system

**Requirements:**
- [x] Add color palette (Primary, Accent, Functional, Backgrounds, Typography)
- [x] Add glassmorphism system (`--glass-bg`, `--glass-border`, `--glass-shadow`, `--glass-blur`)
- [x] Add spacing system (8pt grid: xs/sm/md/lg/xl)
- [x] Add border radius tokens (sm/md/lg/full)
- [x] Add Google Fonts with `font-display: swap`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
  ```
- [x] Define animation keyframes:
  - `@keyframes fadeInUp` (opacity 0→1, translateY 20px→0)
  - `@keyframes scaleIn` (scale 0.95→1)
  - `@keyframes shimmer` (background-position animation for loading states)

**Success Criteria:**
- No hardcoded colors in components (all use CSS variables)
- Typography scale responsive with `clamp()`
- All animations 60fps (use `transform` and `opacity` only)

---

### 1.2 Component Directory Structure ✅
**Path:** `client/src/components/ui/`

**Task:** Create organized component directory

**Structure:**
```
client/src/components/ui/
├── Hero.jsx
├── StickyNav.jsx
├── Section.jsx
├── ContentBlock.jsx
├── FeatureGrid.jsx
├── StatCard.jsx
├── Accordion.jsx
└── Timeline.jsx
```

---

## Step 2: Core UI Components

### 2.1 Hero Component ✅
**File:** `client/src/components/ui/Hero.jsx`

**Purpose:** Immersive parallax hero with SEO-optimized H1

**Props:**
```typescript
interface HeroProps {
  title: string;        // H1 text with primary keyword
  subtitle: string;     // Lead paragraph, keyword-rich
  bgImage: string;      // Path to hero background
  children?: ReactNode; // ZipInput or CTA
}
```

**Implementation Checklist:**
- [x] Parallax scroll effect (debounced, passive listener)
- [x] Background overlay: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))`
- [x] Full viewport height: `min-height: 100vh`
- [x] H1 with `id="hero-title"` for SEO and ARIA
- [x] Responsive font sizing with `clamp()`
- [x] Text shadow for readability: `0 4px 20px rgba(0,0,0,0.6)`

**SEO Requirements:**
- [x] Semantic HTML: `<section>` with `aria-labelledby`
- [x] H1 includes primary keyword (e.g., "Maine Tick Forecast 2026")
- [x] Image has descriptive alt text

**Performance:**
- [x] Image has `fetchpriority="high"` (above fold)
- [x] Responsive srcset for different screen sizes
- [x] WebP format preferred

---

### 2.2 StickyNav Component ✅
**File:** `client/src/components/ui/StickyNav.jsx`

**Purpose:** Context-aware navigation appearing after scroll

**Props:**
```typescript
interface StickyNavProps {
  links: { label: string; href: string; icon?: string }[];
  logo?: string;
  stateName?: string; // For breadcrumb
}
```

**Implementation Checklist:**
- [x] Hidden initially: `opacity: 0`, `pointer-events: none`
- [x] Appears after scrolling 80vh: `opacity: 1`, `transform: translateY(0)`
- [x] Fixed positioning: `position: fixed; top: 0; z-index: 50;`
- [x] Glassmorphism: `background: var(--glass-bg)`, `backdrop-filter: var(--glass-blur)`
- [x] Smooth transition: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

**Mobile Considerations:**
- [x] Horizontal scrollable pill list
- [x] Touch targets minimum 44x44px
- [x] Sticky header collapses gracefully

**Accessibility:**
- [x] `<nav>` with `aria-label="Page sections"`
- [x] Keyboard navigable (Tab order)
- [x] Focus indicators visible

---

### 2.3 Section Component ✅
**File:** `client/src/components/ui/Section.jsx`

**Purpose:** Animated container with IntersectionObserver

**Props:**
```typescript
interface SectionProps {
  variant: 'white' | 'sage' | 'dark' | 'subtle';
  id: string;
2. **`hero-forest-nh.jpg`**
   - Prompt: "White Mountains New Hampshire forest landscape, granite rock outcroppings, lush ferns, golden hour lighting, hiking trail perspective, photorealistic, 8k"

3. **`hero-forest-vt.jpg`**
   - Prompt: "Vermont maple forest in summer, vibrant green foliage, ancient stone wall covered in moss, soft focus background, dappled sunlight, photorealistic"

4. **`hero-forest-ma.jpg`**
   - Prompt: "Massachusetts oak woodlands, dappled sunlight through canopy, winding hiking trail, dense undergrowth, humid summer atmosphere, photorealistic"

5. **`hero-forest-ct.jpg`**
   - Prompt: "Connecticut river valley forest, dense undergrowth with ferns, summer afternoon light, humid atmosphere, green and brown tones, photorealistic"

6. **`hero-forest-ri.jpg`**
   - Prompt: "Rhode Island coastal scrub forest, sandy soil, ocean mist in background, rosa rugosa bushes, coastal vegetation, soft lighting"

7. **`hero-national.jpg`**
### 4.1 Global Content - Biology & Lifecycle ✅
**File:** `client/src/content/pageContent.js`

**Task:** Create comprehensive tick biology encyclopedia

**Content Requirements:**
- [x] SEO metadata templates (title, description, keywords for state/annual pages)
- [x] Biology section: Life cycle (larva, nymph, adult) with SEO-rich descriptions
- [x] Include scientific names (Ixodes scapularis) and common names (deer tick)
- [x] Size comparisons (poppy seed, sesame seed)
- [x] Feeding patterns and disease transmission risks per stage

**SEO Optimization:**
- [x] Natural keyword integration (1-2% density)
- [x] Include common search queries ("when are ticks most active", "how big are tick nymphs")
- [x] Readability: 8th-9th grade level (Flesch 60-70)

---

### 4.2 Global Content - Diseases ✅
**File:** `client/src/content/pageContent.js` (continued)

**Content Requirements:**
- [x] Lyme disease: symptoms, bullseye rash description, timeline, statistics
- [x] Anaplasmosis: symptoms, rising prevalence in New England
- [x] Babesiosis: mention for completeness
- [x] Powassan virus: rare but serious

**Each disease entry needs:**
- [x] Common name and scientific name
- [x] Primary symptoms (bulleted list)
- [x] When to seek medical care (actionable)
- [x] Statistics (cite CDC or state health dept)

---

### 4.3 Global Content - Prevention & Removal ✅
**File:** `client/src/content/pageContent.js` (continued)

**Prevention strategies (minimum 5):**
- [x] Permethrin-treated clothing (emphasize effectiveness)
- [x] Daily tick checks (when and how)
- [x] Landscaping defense (wood chip barriers, grass height)
- [x] Shower within 2 hours
- [x] Light-colored clothing for visibility

**Tick removal steps (accordion format):**
- [x] 1. Don't panic (attached tick ≠ automatic infection)
- [x] 2. Use fine-tipped tweezers
- [x] 3. Grasp at skin level (not the body)
- [x] 4. Pull straight up with even pressure
- [x] 5. Clean area with alcohol
- [x] 6. Save tick in sealed bag (for testing)
- [x] 7. Monitor for rash/symptoms for 30 days

---

### 4.4-4.6 State Content (ME, NH, VT, MA, CT, RI) ✅
**File:** `client/src/content/stateContent.js`

**For EACH state, create:**

**Overview (150-200 words):**
- Geographic and climate context
- Why this state is high/moderate risk
- Lyme disease case trends
- Primary tick species

**Habitat Profile (100-150 words):**
- Specific ecosystems (e.g., "Maine's coastal-forest transition zones")
- Vegetation types that harbor ticks
- Seasonal humidity/temperature patterns

**Seasonality:**
- Peak nymph activity months (typically May-July, varies by latitude)
- Peak adult activity months
- Winter activity patterns

**Hotspots (counties/regions):**
- List 3-5 high-risk counties
- Notable hiking areas or state parks

**Example Structure:**
```javascript
export const stateDetails = {
  maine: {
    overview: "Maine's dense forests and humid coastal climate create ideal tick habitats...",
    habitat: "The transition zones between hardwood forests and coastal scrub are prime hunting grounds...",
    seasonality: "Due to cooler springs, nymph activity peaks in June-July, slightly later than southern New England...",
    dominantTick: "Deer Tick (Ixodes scapularis)",
    secondaryTick: "Dog Tick (Dermacentor variabilis)",
    hotspots: ["York County", "Cumberland County", "Mid-Coast Region", "Acadia National Park area"],
    keywords: ["maine tick forecast", "lyme disease maine", "tick season maine"]
  },
  // ... repeat for NH, VT, MA, CT, RI
};
```

---

## Step 5: Page Implementation

### 5.1-5.2 State Forecast Page Rebuild
**File:** `client/src/pages/StateForecastPage.jsx`

**Required Sections (in order):**

1. **Hero Section**
   - Component: `<Hero>`
   - Background: `hero-forest-{state}.jpg`
   - Title: "{State} Tick Forecast 2026"
   - Subtitle: Dynamic from `stateContent`
   - Child: `<ZipInput>` in glass card

2. **Executive Summary**
   - Component: `<Section variant="white">`
   - 3-column grid of `<StatCard>`
   - Risk Level, Peak Activity, Dominant Tick
   - Text overview from `stateContent.overview`

3. **State Habitat Profile**
   - Component: `<Section variant="sage">`
   - `<ContentBlock imagePosition="left" image="habitat-tallgrass.jpg">`
   - Title: "Where Ticks Hide in {State}"
   - Content from `stateContent.habitat`
   - List of `hotspots` (linked to counties if possible)

4. **Seasonal Timeline**
   - Component: `<Section variant="white">`
   - `<Timeline>` with state-specific activity data
   - Current month highlighted

5. **Know Your Enemy (Biology)**
   - Component: `<Section variant="sage">`
   - Title: "Local Vector Analysis"
   - Carousel of tick species (`tick-deer.png`, `tick-dog.png`, `tick-lonestar.png`)
   - Each card shows image, name, diseases transmitted

6. **Disease Risks**
   - Component: `<Section variant="white">`
   - `<ContentBlock imagePosition="right" image="rash-bullseye.png">`
   - Title: "What to Watch For"
   - Lyme disease symptoms, bullseye rash, when to seek care

7. **Prevention Strategy**
   - Component: `<Section variant="subtle">`
   - `<FeatureGrid columns={4}>`
   - 4 prevention methods with images/icons

8. **Emergency Guide**
   - Component: `<Section variant="dark">`
   - Title: "If You Find a Tick"
   - `<Accordion>` with removal steps

9. **Footer CTA**
   - Component: `<Section variant="primary">`
   - Title: "Stay Safe in {State}"
   - `<ZipInput>` repeated

**SEO Implementation:**
- [ ] Import `SeoMeta` component
- [ ] Use `seoTemplates.state.titleTemplate(stateName)`
- [ ] Meta description from `seoTemplates.state.descriptionTemplate()`
- [ ] JSON-LD structured data (Article schema)
- [ ] Canonical URL set
- [ ] 5-10 internal links (to other states, annual forecast, resources)

---

### 5.3-5.4 Annual Forecast Page Rebuild
**File:** `client/src/pages/TickForecast2026.jsx`

**Required Sections:**

1. **Hero**
   - Background: `hero-national.jpg`
   - Title: "2026 National Tick Forecast"
   - Subtitle: "The Perfect Storm: Why 2026 will be a record year"

2. **National Trends**
   - `<ContentBlock imagePosition="left" image="nature-acorns.jpg">`
   - Title: "The Mast Year Effect"
   - Explain acorn boom → mouse boom → tick boom (2-year lag)

3. **Key Drivers**
   - `<FeatureGrid columns={3}>`
   - Cards: "Mild Winter", "Mouse Population Boom", "Spring Rainfall Forecast"

4. **Regional Comparison**
   - Table or grid comparing regions
   - Highlight Northeast as epicenter

5. **State Forecasts**
   - Grid of 6 state cards (mini maps or icons)
   - Links to individual state pages

6. **Universal Prevention**
   - `<FeatureGrid>` with shared prevention strategies

7. **Footer CTA**
   - "Get Your Local Forecast"
   - ZIP input or state selector

**SEO Implementation:**
- [ ] Title: "2026 Tick Forecast | Annual Outlook & Risk Predictions"
- [ ] Meta description highlighting national trends
- [ ] Links to all 6 state pages
- [ ] External links to CDC, university studies (2-3)
- [ ] JSON-LD structured data

---

## Step 6: Verification & Polish

### 6.1 Mobile Responsiveness Check
**Test Viewports:** 320px, 375px, 768px, 1024px, 1920px

**Checklist:**
- [ ] All text readable without horizontal scroll
- [ ] Touch targets minimum 44x44px
- [ ] Images scale proportionally (no overflow)
- [ ] `StickyNav` collapses to horizontal scroll on mobile
- [ ] `FeatureGrid` becomes swipeable carousel
- [ ] Hero font sizes scale with `clamp()`
- [ ] Forms (ZipInput) expand to full width on mobile

---

### 6.2 Keyboard Navigation & Accessibility
**Test with keyboard only (no mouse):**

- [ ] Tab order logical (top to bottom, left to right)
- [ ] All interactive elements reachable
- [ ] Focus indicators visible (not removed)
- [ ] `StickyNav` links keyboard accessible
- [ ] Accordion expands/collapses with Enter/Space
- [ ] Skip links work (Jump to main content)

**Screen Reader Test:**
- [ ] ARIA labels present and descriptive
- [ ] Headings announce correctly (H1, H2, H3...)
- [ ] Images have alt text
- [ ] Form labels associated with inputs

---

### 6.3 Lighthouse Audit
**Run Lighthouse on both pages**

**Target Scores (all 90+):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Common Issues to Fix:**
- Images without explicit width/height (causes CLS)
- Render-blocking resources (defer non-critical CSS/JS)
- Missing meta descriptions
- Low contrast text

---

### 6.4 SEO Meta Verification
**Use browser dev tools to inspect:**

- [ ] `<title>` tag present and unique (includes state/year)
- [ ] Meta description 150-160 characters
- [ ] Canonical URL set correctly
- [ ] Open Graph tags present (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags present
- [ ] JSON-LD structured data valid (test with Google Rich Results Test)

---

### 6.5 Performance Checks

**Tools:** Chrome DevTools Performance tab, WebPageTest

- [ ] Parallax scroll at 60fps (no jank)
- [ ] LCP < 2.5s (hero image loads quickly)
- [ ] FID < 100ms (page responds immediately to clicks)
- [ ] CLS < 0.1 (no layout shifts during load)
- [ ] No memory leaks (scroll handlers cleaned up)

---

### 6.6 StickyNav Behavior Test

- [ ] Nav hidden on page load
- [ ] Nav appears after scrolling 80vh
- [ ] Nav disappears when scrolling back to top
- [ ] Transition smooth (0.3s ease)
- [ ] Glassmorphism blur renders correctly

---

### 6.7 HTML Validation

**Tool:** W3C Markup Validation Service

- [ ] No errors
- [ ] Warnings reviewed and addressed if relevant
- [ ] Semantic HTML used (`<article>`, `<section>`, `<nav>`, etc.)

---

### 6.8 Cross-Browser Testing

**Test in:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest macOS/iOS)
- [ ] Edge (latest)

**Look for:**
- CSS inconsistencies (especially glassmorphism)
- JavaScript errors in console
- Image loading issues
- Font rendering differences

---

## Success Criteria Summary

**Before marking Phase 4 complete, verify:**

✅ **Design System**
- All components use CSS variables (no hardcoded values)
- Typography hierarchy consistent (Outfit + Inter)
- Animations smooth and purposeful

✅ **Components**
- 8 UI components built and tested
- All accessible (ARIA, keyboard nav)
- Mobile-responsive
- Performance optimized

✅ **Content**
- SEO-rich content for all 6 states
- Global content comprehensive
- Natural keyword integration
- External sources linked

✅ **Pages**
- `StateForecastPage.jsx` has all 9 sections
- `TickForecast2026.jsx` has all 7 sections
- SEO metadata complete on both
- Internal linking robust

✅ **Verification**
- Lighthouse scores 90+ across the board
- Mobile responsive (320px-1920px)
- Keyboard accessible
- Cross-browser compatible

---

**Total Estimated Tasks:** 40+ discrete items
**Completion Criteria:** All checkboxes marked, all success criteria met
