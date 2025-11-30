# Implementation Plan - Phase 4: Design & Content Overhaul (Master Blueprint)

**Goal:** Create the authoritative, most visually stunning ("sexy") resource for tick forecasts on the web.
**Philosophy:** "Premium Medical Journal meets High-End Lifestyle Magazine." Trustworthy, scientific, yet beautiful and engaging.
**Visual Strategy:** **AI-First Imagery.** Every major section will be supported by high-fidelity, AI-generated visuals to create an immersive experience.
**Navigation Rule:** **NO GLOBAL HEADER.** The experience is immersive. Navigation is handled by on-page links and a context-aware `StickyNav` that appears only after scrolling.

---

## 1. Design System: "Nature's Precision"

We will define a strict set of CSS variables and utility classes to ensure consistency and a premium feel. This system must be mobile-first, ensuring touch targets are large and layouts stack gracefully.

### A. Color Palette (`client/src/index.css`)

We are moving away from standard browser colors to a curated, organic palette.

```css
:root {
    /* Primary Brand Colors */
    --color-primary: #1a472a;       /* Deep Forest Green - Trust, Authority */
    --color-primary-light: #2e7d32; /* Fern Green - Growth, Safety */
    --color-primary-dark: #0d2b18;  /* Midnight Forest - Depth */

    /* Accent Colors */
    --color-accent: #d4e157;        /* Chartreuse - Visibility, Caution, Highlights */
    --color-accent-hover: #c0ca33;  /* Darker Chartreuse for interactions */

    /* Functional Colors */
    --color-alert: #e53935;         /* Crimson - High Risk, Danger */
    --color-warning: #fb8c00;       /* Orange - Moderate Risk */
    --color-safe: #43a047;          /* Green - Low Risk */
    --color-info: #0288d1;          /* Blue - Information */

    /* Backgrounds & Surfaces */
    --bg-paper: #ffffff;            /* Pure White - Cards, Reading surfaces */
    --bg-subtle: #f8f9fa;           /* Off-White - Section differentiation */
    --bg-sage: #e8f5e9;             /* Pale Sage - Biology/Nature sections */
    --bg-dark: #111827;             /* Charcoal - Footer, Dark Mode sections */
    --bg-overlay: rgba(0, 0, 0, 0.4); /* Hero overlays */

    /* Typography Colors */
    --text-primary: #111827;        /* Almost Black - Headings */
    --text-secondary: #4b5563;      /* Cool Gray - Body text */
    --text-muted: #9ca3af;          /* Light Gray - Captions */
    --text-inverse: #ffffff;        /* White - Text on dark backgrounds */

    /* Glassmorphism System */
    --glass-bg: rgba(255, 255, 255, 0.75);
    --glass-border: 1px solid rgba(255, 255, 255, 0.4);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    --glass-blur: blur(16px);

    /* Spacing System (8pt grid) */
    --space-xs: 0.5rem;   /* 8px */
    --space-sm: 1rem;     /* 16px */
    --space-md: 2rem;     /* 32px */
    --space-lg: 4rem;     /* 64px */
    --space-xl: 8rem;     /* 128px */

    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-full: 9999px;
}
```

### B. Typography System

We will use a pairing of `Outfit` (Headings) and `Inter` (Body) to balance modern personality with readability.

*   **Display (Hero):** `Outfit`, Weight 800, Size 3.5rem (mobile) / 5rem (desktop), `line-height: 1.1`, `letter-spacing: -0.03em`.
*   **H1 (Page Title):** `Outfit`, Weight 700, Size 2.5rem, `letter-spacing: -0.02em`.
*   **H2 (Section Header):** `Outfit`, Weight 600, Size 2rem, `color: var(--color-primary)`.
*   **H3 (Card Title):** `Inter`, Weight 600, Size 1.25rem.
*   **Overline:** `Inter`, Weight 700, Uppercase, Size 0.875rem, `letter-spacing: 0.1em`, `color: var(--color-primary-light)`.
*   **Body:** `Inter`, Weight 400, Size 1.125rem, `line-height: 1.7`.
*   **Lead:** `Inter`, Weight 400, Size 1.25rem, `line-height: 1.6`, `color: var(--text-secondary)`.

### C. Animation & Motion Guidelines

Motion should be purposeful, not distracting.

*   **`fade-in-up`:** Used for text blocks and cards as they scroll into view.
    *   `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
*   **`scale-in`:** Used for images.
*   **`parallax`:** Used for Hero backgrounds. The background image translates Y at 50% speed of scroll.
*   **`hover-lift`:** Cards translate Y -5px and shadow increases.

---

## 2. AI Image Generation Manifest

We will generate these specific assets to ensure a consistent, high-fidelity look.

### A. Hero Backgrounds (16:9, High Res)
*Prompt Strategy: "Cinematic, photorealistic, 8k, moody lighting, depth of field."*

1.  **`hero-forest-maine.jpg`**: "Dense Maine pine forest at twilight, mist, sunbeams filtering through trees, mossy ground."
2.  **`hero-forest-nh.jpg`**: "White Mountains New Hampshire forest landscape, granite rocks, ferns, golden hour lighting."
3.  **`hero-forest-vt.jpg`**: "Vermont maple forest, lush green summer foliage, ancient stone wall, soft focus background."
4.  **`hero-forest-ma.jpg`**: "Massachusetts oak woodlands, dappled sunlight, hiking trail perspective, winding path."
5.  **`hero-forest-ct.jpg`**: "Connecticut river valley forest, dense undergrowth, summer afternoon light, humid atmosphere."
6.  **`hero-forest-ri.jpg`**: "Rhode Island coastal scrub forest, sandy soil, ocean mist in background, rosa rugosa bushes."
7.  **`hero-national.jpg`**: "Abstract 3D data visualization map of the United States, glowing heat map points in the Northeast, dark background, cyber-organic style."

### B. Scientific Illustrations (Clean, Medical Style)
*Prompt Strategy: "Scientific illustration, white background, high detail, medical textbook style, studio lighting."*

8.  **`tick-deer.png`**: "Female Deer Tick (Ixodes scapularis), top down view, reddish-brown body, black shield."
9.  **`tick-dog.png`**: "Female American Dog Tick (Dermacentor variabilis), top down view, brown with white/grey markings on shield."
10. **`tick-lonestar.png`**: "Female Lone Star Tick (Amblyomma americanum), top down view, distinct white dot on back."
11. **`rash-bullseye.png`**: "Medical illustration of Erythema migrans (Lyme bullseye rash) on skin, clean vector style, soft colors."
12. **`lifecycle-chart.png`**: "Infographic of tick life cycle: egg, larva, nymph, adult, circular flow, clean icons."

### C. Contextual Visuals (Lifestyle/Nature)
*Prompt Strategy: "Photorealistic, lifestyle photography, soft lighting, focus on subject."*

13. **`prevention-clothing.jpg`**: "Close up of hiking boots and socks tucked into pants, walking on a trail, focus on safety."
14. **`prevention-yard.jpg`**: "Beautiful suburban backyard with short manicured grass, wood chip border, garden beds, sunny day."
15. **`prevention-check.jpg`**: "Person checking their arm for ticks, outdoors, soft focus background."
16. **`nature-acorns.jpg`**: "Forest floor covered in oak acorns, cinematic low angle shot, depth of field, autumn lighting."
17. **`nature-mouse.jpg`**: "White-footed mouse on a log in the forest, soft lighting, wildlife photography style."
18. **`habitat-tallgrass.jpg`**: "Close up of tall grass in a meadow, sunlight backlighting, danger perspective."

---

## 3. SEO Strategy & Optimization Guidelines

This section provides comprehensive SEO guidance to ensure every page ranks exceptionally well and converts visitors.

### A. Technical SEO Requirements (MANDATORY)

Every page MUST implement these technical foundations:

#### Meta Tags & Structured Data
```html
<!-- Essential Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{Page Title} | TickRisk</title>
<meta name="description" content="{Compelling 150-160 character description}">

<!-- Open Graph (Social Sharing) -->
<meta property="og:type" content="website">
<meta property="og:title" content="{Page Title}">
<meta property="og:description" content="{Description}">
<meta property="og:image" content="{Absolute URL to hero image}">
<meta property="og:url" content="{Canonical URL}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Page Title}">
<meta name="twitter:description" content="{Description}">
<meta name="twitter:image" content="{Absolute URL to hero image}">

<!-- Canonical URL -->
<link rel="canonical" href="{Canonical URL}">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Page Title}",
  "description": "{Description}",
  "image": "{Hero Image URL}",
  "datePublished": "2026-01-01",
  "dateModified": "{Current Date}",
  "author": {
    "@type": "Organization",
    "name": "TickRisk"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TickRisk",
    "logo": {
      "@type": "ImageObject",
      "url": "{Logo URL}"
    }
  }
}
</script>
```

#### Semantic HTML Structure
```html
<!-- CRITICAL: ONE H1 per page, descriptive H2-H6 hierarchy -->
<main>
  <article>
    <header>
      <h1>{Primary Page Topic}</h1>
      <p class="lead">{Engaging subtitle with keywords}</p>
    </header>
    
    <section id="outlook" aria-labelledby="outlook-heading">
      <h2 id="outlook-heading">{Section Topic}</h2>
      <!-- Content -->
    </section>
    
    <section id="habitat" aria-labelledby="habitat-heading">
      <h2 id="habitat-heading">{Section Topic}</h2>
      <!-- Content -->
    </section>
  </article>
</main>
```

### B. Content Optimization Formula

Every content section should follow this SEO-optimized pattern:

#### Keyword Integration Strategy
**State Pages:**
- Primary Keyword: "{State} tick forecast"
- Secondary Keywords: "tick season {state}", "Lyme disease {state}", "tick prevention {state}", "tick activity {state}"
- Long-tail: "{city} tick risk", "when are ticks active in {state}", "tick forecast {county}"

**Annual Page:**
- Primary: "tick forecast 2026"
- Secondary: "tick season 2026", "tick activity prediction", "Lyme disease forecast"
- Long-tail: "will 2026 be a bad tick year", "tick forecast northeast"

#### Content Density Guidelines
- **First Paragraph (Above Fold):** Include primary keyword within first 100 words
- **Keyword Density:** 1-2% natural distribution (avoid stuffing)
- **Semantic Keywords:** Include related terms (e.g., "blacklegged tick", "Ixodes scapularis", "deer tick")
- **Internal Links:** 5-10 contextual internal links per page to related content
- **External Links:** 2-3 authoritative external sources (CDC, university studies)

#### Readability Targets
- **Flesch Reading Ease:** 60-70 (8th-9th grade level)
- **Paragraph Length:** 3-4 sentences maximum
- **Sentence Structure:** Mix short (5-10 words) and medium (15-20 words)
- **Subheadings:** Every 200-300 words minimum

### C. Performance & Core Web Vitals

**Target Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s
  - Optimize hero images: WebP format, responsive srcset, lazy loading below fold
  - Use `fetchpriority="high"` on hero image
- **FID (First Input Delay):** < 100ms
  - Minimize JavaScript blocking
  - Use code splitting for components
- **CLS (Cumulative Layout Shift):** < 0.1
  - Define explicit width/height on all images
  - Reserve space for dynamic content

**Image Optimization:**
```html
<!-- Hero Image Example -->
<img 
  src="/images/hero-forest-maine.webp" 
  alt="Dense Maine pine forest with morning mist - prime tick habitat"
  width="1920" 
  height="1080"
  fetchpriority="high"
  srcset="/images/hero-forest-maine-480.webp 480w,
          /images/hero-forest-maine-800.webp 800w,
          /images/hero-forest-maine-1920.webp 1920w"
  sizes="100vw"
>
```

### D. Accessibility = SEO Boost

**ARIA Labels & Semantic Attributes:**
```html
<!-- Navigation -->
<nav aria-label="Page sections">
  <a href="#outlook">2026 Outlook</a>
  <a href="#habitat">Tick Habitat</a>
</nav>

<!-- Interactive Elements -->
<button aria-label="Search tick forecast by ZIP code" aria-expanded="false">
  Search
</button>

<!-- Images -->
<img src="tick-deer.png" alt="Female deer tick (Ixodes scapularis) showing reddish-brown body and black shield - primary vector for Lyme disease">
```

**Focus Management:**
- All interactive elements keyboard accessible (Tab order)
- Skip links for screen readers: `<a href="#main-content" class="sr-only">Skip to content</a>`
- Color contrast ratio: Minimum 4.5:1 for text, 3:1 for large text

### E. Page Speed Checklist

- [ ] **Font Loading:** Use `font-display: swap` to prevent FOIT
- [ ] **CSS:** Critical CSS inlined, non-critical deferred
- [ ] **JavaScript:** Async/defer tags, code splitting
- [ ] **Images:** WebP format, lazy loading, responsive images
- [ ] **Caching:** Set appropriate cache headers (1 year for static assets)
- [ ] **CDN:** Serve static assets from CDN
- [ ] **Minification:** Minify CSS, JS, HTML in production

---

## 4. Expanded Content Architecture

We will create a comprehensive library of evergreen content in `client/src/content/`.

### A. `pageContent.js` (Global Shared Content)

This file will contain the "Encyclopedia" of tick knowledge. **CRITICAL:** All content must be SEO-optimized with natural keyword integration.

```javascript
// SEO METADATA TEMPLATES
export const seoTemplates = {
  state: {
    titleTemplate: (state) => `${state} Tick Forecast 2026 | Tick Activity & Lyme Risk`,
    descriptionTemplate: (state, risk) => `${state}'s 2026 tick forecast: ${risk} risk predicted. Get real-time tick activity data, peak season alerts, and science-backed prevention strategies.`,
    keywords: (state) => [
      `${state.toLowerCase()} tick forecast`,
      `tick season ${state.toLowerCase()}`,
      `lyme disease ${state.toLowerCase()}`,
      `tick prevention ${state.toLowerCase()}`,
      `when are ticks active in ${state.toLowerCase()}`
    ]
  },
  annual: {
    title: '2026 Tick Forecast | Annual Outlook & Risk Predictions',
    description: '2026 tick forecast predicts record activity across the Northeast. Understand the climate drivers, mast year effects, and regional risk patterns.',
    keywords: ['tick forecast 2026', 'tick season 2026', 'lyme disease forecast', 'tick activity prediction']
  }
};

export const sharedContent = {
  biology: {
    title: "Know Your Enemy",
    subtitle: "Understanding the Tick Life Cycle",
    // SEO: Include scientific names and common search terms
    seoIntro: "Blacklegged ticks (Ixodes scapularis), also known as deer ticks, progress through three life stages, each with different feeding patterns and disease transmission risks.",
    stages: [
      { 
        name: "Larva", 
        season: "August - September", 
        desc: "Tiny, 6-legged. Mostly feed on mice.",
        seoDesc: "Larval ticks hatch in late summer, measuring less than 1mm. They feed primarily on small mammals like white-footed mice, acquiring the Lyme bacteria if the host is infected."
      },
      { 
        name: "Nymph", 
        season: "May - July", 
        desc: "Poppy-seed sized. The most dangerous stage for Lyme transmission.",
        seoDesc: "Nymphal ticks are responsible for over 70% of Lyme disease cases. Their poppy-seed size makes them nearly invisible, allowing them to feed undetected for days."
      },
      { 
        name: "Adult", 
        season: "October - November", 
        desc: "Sesame-seed sized. Active whenever temps are above freezing.",
        seoDesc: "Adult deer ticks are most active in fall and early spring, with surprising winter activity during warm spells above 45°F."
      }
    ]
  },
  diseases: {
    lyme: {
      name: "Lyme Disease",
      symptoms: ["Bullseye Rash (Erythema Migrans)", "Fever & Chills", "Joint Pain", "Severe Fatigue"],
      stats: "300,000+ estimated cases annually in the US."
    },
    anaplasmosis: {
      name: "Anaplasmosis",
      symptoms: ["High Fever", "Severe Headaches", "Muscle Aches", "Chills"],
      stats: "Rising rapidly in New England."
    }
  },
  prevention: {
    strategies: [
      {
        title: "Permethrin Treated Clothing",
        desc: "Treating shoes and socks with 0.5% permethrin kills ticks on contact. It is 100x more effective than skin repellents.",
        icon: "Shield"
      },
      {
        title: "The Daily Tick Check",
        desc: "Ticks often wander for hours before biting. Checking yourself immediately after outdoor activity is your best defense.",
        icon: "Search"
      },
      {
        title: "Landscaping Defense",
        desc: "Create a 3-foot wood chip barrier between lawns and wooded areas. Keep grass cut short.",
        icon: "Home"
      }
    ]
  },
  removal: {
    steps: [
      "Use fine-tipped tweezers to grasp the tick as close to the skin's surface as possible.",
      "Pull upward with steady, even pressure. Don't twist or jerk the tick.",
      "After removing the tick, thoroughly clean the bite area and your hands with rubbing alcohol or soap and water.",
      "Dispose of a live tick by putting it in alcohol, placing it in a sealed bag/container, wrapping it tightly in tape, or flushing it down the toilet."
    ]
  }
};
```

### B. `stateContent.js` (Localized Deep Dives)

This file will contain the specific "flavor" for each state to ensure they feel unique.

```javascript
export const stateDetails = {
  maine: {
    overview: "Maine’s dense forests and humid summers create ideal tick habitats. Deer ticks are widespread, with Lyme cases concentrated in coastal and southern counties.",
    habitat: "The transition zones between Maine's hardwood forests and coastal scrub are prime hunting grounds for ticks. High humidity along the coast extends survival rates.",
    seasonality: "Due to cooler springs, Nymph activity often peaks slightly later (June-July) than southern New England.",
    dominantTick: "Deer Tick (Ixodes scapularis)",
    secondaryTick: "Dog Tick (Dermacentor variabilis)",
    hotspots: ["York County", "Cumberland County", "Mid-Coast Region"]
  },
  // ... similar detailed entries for NH, VT, MA, CT, RI
};
```

---

## 5. Component Architecture (`client/src/components/ui/`)

**AI Agent Instructions:** Each component must be:
1. **Fully Accessible:** ARIA labels, keyboard navigation, focus management
2. **Performance Optimized:** Lazy loading, debounced scroll handlers, memoization
3. **SEO Friendly:** Semantic HTML, unique IDs for anchor links
4. **Mobile First:** Touch targets minimum 44x44px, swipe gestures

### 1. `Hero.jsx` (The Immersive Entry)

**Purpose:** Create an emotional, immersive first impression with parallax effect.

**Props:**
- `title` (string): H1 text (SEO primary keyword)
- `subtitle` (string): Lead paragraph (engaging, keyword-rich)
- `bgImage` (string): Path to hero image
- `children` (ReactNode): ZipInput component or CTA

**Implementation Requirements:**
```javascript
import { useEffect, useState } from 'react';

export function Hero({ title, subtitle, bgImage, children }) {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    // Parallax scroll handler (debounced for performance)
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    
    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      className="hero" 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${bgImage})`,
        backgroundPositionY: `${offsetY * 0.5}px`, // Parallax at 50% speed
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        {/* SEO CRITICAL: H1 with primary keyword */}
        <h1 id="hero-title" className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
```

**CSS Requirements:**
```css
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-content {
  text-align: center;
  color: var(--text-inverse);
  max-width: 800px;
  padding: var(--space-md);
  z-index: 10;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem); /* Responsive sizing */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
  margin-bottom: var(--space-sm);
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: var(--space-md);
}
```

### 2. `StickyNav.jsx` (Contextual Navigation)

**Purpose:** Provide persistent navigation ONLY after user scrolls past hero.

**Props:**
- `links` (array): Navigation items `[{ label, href, icon? }]`
- `logo` (string): Small logo/text for branding

**Logic:**
    *   Sticks to top: `position: fixed; top: 0; left: 0; width: 100%; z-index: 50;`.
    *   Glassmorphism background.
*   **Content:**
    *   Left: "TickRisk | {StateName}" (Small logo).
    *   Right: Links (Outlook, Biology, Prevention, CTA).
    *   Mobile: Horizontal scrollable pill list.

### 3. `Section.jsx` (The Wrapper)
*   **Props:** `variant` ('white', 'sage', 'dark'), `id`.
*   **Logic:**
    *   Uses `IntersectionObserver` to trigger `fade-in-up` animation on its children when they enter viewport.
    *   Applies correct background color class.
    *   Standard padding: `py-16` (mobile), `py-24` (desktop).

### 4. `ContentBlock.jsx` (The Storyteller)
*   **Props:** `title`, `body`, `image`, `imagePosition` ('left', 'right'), `overline`.
*   **Layout:**
    *   Desktop: CSS Grid (1fr 1fr). Text vertically centered. Image fills its column with `object-cover`.
    *   Mobile: Flex Column. Image first (full width, aspect video), then Text.
*   **Styling:**
    *   Images have `border-radius: var(--radius-md)` and `box-shadow: var(--shadow-lg)`.

### 5. `FeatureGrid.jsx` (The List)
*   **Props:** `items` (array), `columns` (3).
*   **Layout:**
    *   Desktop: Grid `grid-template-columns: repeat(3, 1fr)`.
    *   Mobile: Flex Row with `overflow-x: auto` (Snap Carousel).
*   **Card Style:**
    *   White background, padding, rounded corners.
    *   Icon in a colored circle (Primary Light).
    *   Hover: `transform: translateY(-5px)`.

### 6. `Timeline.jsx` (The Seasonality Visualizer)
*   **Props:** `data` (months).
*   **Layout:**
    *   Horizontal bar chart style.
    *   Months on X-axis.
    *   Curves for Larva, Nymph, Adult activity.
    *   "Current Month" indicator line.

### 7. `Accordion.jsx` (The Guide)
*   **Props:** `items` (title, content).
*   **Logic:**
    *   State tracks `openIndex`.
    *   Click toggles height (0 to auto).
    *   Chevron icon rotates 180deg.

---

## 5. Page Blueprints (Detailed)

### A. `StateForecastPage.jsx` (The "Ultimate Guide")

This page is designed to be a complete resource for a resident of that state.

**1. Hero Section**
*   **Visual:** `hero-forest-{state}.jpg` (Parallax).
*   **Content:**
    *   H1: "{State} Tick Forecast 2026"
    *   Sub: "Live activity tracking and seasonal outlook."
    *   **Action:** `ZipInput` floating in a glass card.

**2. Executive Summary (White)**
*   **Header:** "2026 Outlook".
*   **Layout:** 3-Column Grid of `StatCard`s.
    *   *Risk Level:* "High" (Color coded).
    *   *Peak Activity:* "May - July".
    *   *Dominant Tick:* "Blacklegged (Deer) Tick".
*   **Content:** Text block from `stateContent.overview`.

**3. State Habitat Profile (Sage) -- *STATE SPECIFIC***
*   **Header:** "Where Ticks Hide in {State}".
*   **Component:** `ContentBlock` (Image Left).
    *   *Image:* `habitat-tallgrass.jpg`.
    *   *Text:* Deep dive into the specific geography of the state (e.g., "In Maine, the transition zones...").
    *   *Data:* List of `hotspots` (Counties).

**4. Seasonal Timeline (White)**
*   **Header:** "Activity Timeline".
*   **Component:** `Timeline`.
    *   Visualizes when Nymphs vs Adults are active in this specific latitude.

**5. Know Your Enemy (Biology) (Sage)**
*   **Header:** "Local Vector Analysis".
*   **Component:** Carousel of `InfoCard`s.
    *   *Card 1:* Deer Tick (Image: `tick-deer.png`). "Vector for Lyme."
    *   *Card 2:* Dog Tick (Image: `tick-dog.png`). "Vector for Rocky Mountain Spotted Fever."
    *   *Card 3:* Lone Star Tick (Image: `tick-lonestar.png`). "Emerging threat in southern counties."

**6. Disease Risks (White)**
*   **Header:** "What to Watch For".
*   **Component:** `ContentBlock` (Image Right).
    *   *Image:* `rash-bullseye.png` (Medical illustration).
    *   *Text:* Lyme disease symptoms, "The Bullseye Rash", when to seek help.

**7. Prevention Strategy (Subtle)**
*   **Header:** "Defense Strategy".
*   **Component:** `FeatureGrid` (Icons).
    *   *Item 1:* Clothing (Image: `prevention-clothing.jpg`).
    *   *Item 2:* Yard (Image: `prevention-yard.jpg`).
    *   *Item 3:* Checks (Image: `prevention-check.jpg`).
    *   *Item 4:* Pets.

**8. Emergency Guide (Dark)**
*   **Header:** "If You Find a Tick".
*   **Component:** `Accordion` (Step-by-step removal).
    *   *Step 1:* "Don't Panic."
    *   *Step 2:* "Grab the Head."
    *   *Step 3:* "Pull Straight Up."
    *   *Step 4:* "Disinfect & Save."

**9. Footer CTA (Primary)**
*   **Content:** "Stay Safe in {State}".
*   **Interaction:** `ZipInput`.

### B. `TickForecast2026.jsx` (The "National Report")

This page focuses on the macro trends and climate drivers.

**1. Hero Section**
*   **Visual:** `hero-national.jpg` (Abstract Data Map).
*   **Content:**
    *   H1: "2026 National Tick Forecast"
    *   Sub: "The Perfect Storm: Why 2026 will be a record year."

**2. National Trends (White)**
*   **Header:** "The Mast Year Effect".
*   **Component:** `ContentBlock` (Image Left).
    *   *Image:* `nature-acorns.jpg`.
    *   *Text:* Explaining the 2-year lag between acorn booms and Lyme spikes. "In 2024, oak trees produced a record crop..."

**3. Key Drivers (Sage)**
*   **Header:** "Climatological Drivers".
*   **Component:** `FeatureGrid` (3 Cols).
    *   *Card 1:* "Mild Winter" (Icon: Thermometer). "Lack of deep freeze allowed overwintering."
    *   *Card 2:* "Mouse Population" (Image: `nature-mouse.jpg`). "Booming host population."
    *   *Card 3:* "Spring Rainfall" (Icon: CloudRain). "High humidity forecast."

**4. Regional Comparison (White) -- *NEW SECTION***
*   **Header:** "Regional Risk Assessment".
*   **Component:** `Table` or `Grid`.
    *   Comparing Northeast (High) vs Midwest (Moderate) vs South (Variable).
    *   Highlighting that New England is the epicenter.

**5. State Forecasts (Subtle)**
*   **Header:** "Explore Local Forecasts".
*   **Component:** Grid of State Cards.
    *   *Visual:* Mini map of each state.
    *   *Interaction:* Hover scales card, button turns green.

**6. Universal Prevention (White)**
*   **Header:** "National Prevention Guidelines".
*   **Component:** `FeatureGrid` (Shared prevention steps).

**7. Footer CTA (Dark)**
*   **Content:** "Get Your Local Forecast".

---

## 6. AI Agent Success Criteria

**For each component/page you build, verify these checkpoints:**

### Design Excellence ✨
- [ ] Uses ONLY design system variables (no hardcoded colors/sizes)
- [ ] Implements hover effects and micro-animations
- [ ] Glassmorphism or premium styling visible
- [ ] Typography hierarchy obvious (Outfit headings, Inter body)
- [ ] Images have rounded corners and shadows

### SEO Perfection 🔍
- [ ] ONE H1 per page with primary keyword
- [ ] Semantic HTML (`<article>`, `<section>`, proper heading order)
- [ ] All images have descriptive alt text (10+ words)
- [ ] Meta tags complete (title, description, OG, Twitter)
- [ ] Internal links to related pages (5-10 per page)
- [ ] JSON-LD structured data present

### Performance 🚀
- [ ] Images lazy loaded (except hero)
- [ ] Hero image has `fetchpriority="high"`
- [ ] Scroll handlers debounced/throttled
- [ ] Components memoized where appropriate
- [ ] No Cumulative Layout Shift (explicit image dimensions)

### Accessibility ♿
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on navigation and buttons
- [ ] Color contrast ratio meets WCAG AA (4.5:1)
- [ ] Focus indicators visible on all elements
- [ ] Skip links for screen readers

### Mobile First 📱
- [ ] Touch targets minimum 44x44px
- [ ] Text readable without zoom (16px minimum)
- [ ] Horizontal scroll disabled
- [ ] Carousels have swipe gestures
- [ ] Navigation collapses appropriately

---

## 7. Execution Checklist (Phase Alignment)

This aligns with `phase_4_backlog.md` for sequential execution.

### Phase 1: Foundation & Design System
- [ ] **1.1** Update `index.css` with complete variable system
- [ ] **1.2** Add Google Fonts (Outfit + Inter) with `font-display: swap`
- [ ] **1.3** Define animation keyframes (fadeInUp, scaleIn, parallax)
- [ ] **1.4** Create `client/src/components/ui/` directory structure

### Phase 2: Core UI Components
- [ ] **2.1** Build `Hero.jsx` (parallax, accessibility, performance)
- [ ] **2.2** Build `StickyNav.jsx` (scroll detection, glassmorphism)
- [ ] **2.3** Build `Section.jsx` (IntersectionObserver, animations)
- [ ] **2.4** Build `ContentBlock.jsx` (responsive grid, image optimization)
- [ ] **2.5** Build `FeatureGrid.jsx` (desktop grid, mobile carousel)
- [ ] **2.6** Build `StatCard.jsx` (glassmorphism, stat display)
- [ ] **2.7** Build `Accordion.jsx` (smooth transitions, accessibility)
- [ ] **2.8** Build `Timeline.jsx` (seasonal visualization, current month indicator)

### Phase 3: Content & Assets
- [ ] **3.1** Generate 7 hero backgrounds (state-specific forests + national)
- [ ] **3.2** Generate 5 scientific illustrations (ticks, rash, lifecycle)
- [ ] **3.3** Generate 6 contextual images (prevention, habitat, nature)
- [ ] **3.4** Optimize all images (WebP, responsive srcsets)
- [ ] **3.5** Create `pageContent.js` with SEO-rich content
- [ ] **3.6** Create `stateContent.js` with localized deep dives
- [ ] **3.7** Create `seoConfig.js` with meta templates

### Phase 4: Page Implementation
- [ ] **4.1** Rebuild `StateForecastPage.jsx` with all 9 sections
- [ ] **4.2** Implement SEO metadata in `StateForecastPage.jsx`
- [ ] **4.3** Rebuild `TickForecast2026.jsx` with all 7 sections
- [ ] **4.4** Implement SEO metadata in `TickForecast2026.jsx`
- [ ] **4.5** Add structured data (JSON-LD) to both pages

### Phase 5: Verification & Polish
- [ ] **5.1** Test mobile responsiveness (320px to 1920px)
- [ ] **5.2** Verify keyboard navigation and focus states
- [ ] **5.3** Run Lighthouse audit (target: 90+ on all metrics)
- [ ] **5.4** Check SEO meta tags in browser dev tools
- [ ] **5.5** Verify parallax smoothness (60fps scroll)
- [ ] **5.6** Test StickyNav appearance threshold
- [ ] **5.7** Validate HTML (W3C validator)
- [ ] **5.8** Cross-browser testing (Chrome, Firefox, Safari)
