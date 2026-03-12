# AI Networking Education Center

An interactive, single-page educational platform teaching modern AI networking — the hardware, protocols, and fabric architectures that power distributed AI training at scale. Covers the industry transition from InfiniBand to Ethernet-based fabrics (RoCEv2, Ultra Ethernet), with deep-dives on Arista hardware platforms, congestion control, and GPU cluster topologies.

**Live:** [learn.polymathsystem.com](https://learn.polymathsystem.com)

---

## Content Structure

| Module | Title | Anchor | Key Topics |
|--------|-------|--------|------------|
| 01 | **Fundamentals** | `#etherlink` | AI Ethernet fabric basics, North-South vs East-West traffic, Unified Ethernet |
| 02 | **Core Technologies** | `#concepts` | RDMA, RoCEv2, NVMe-oF, kernel bypass, GPUDirect, lossless fabric requirements |
| 03 | **Protocols & Data Flow** | `#protocols` | RoCEv2 vs Ultra Ethernet (UET), packet spraying, selective retry, PFC/ECN |
| 04 | **Congestion & Performance** | `#performance` | ECN, PFC, head-of-line blocking, job completion time, tail latency |
| 05 | **Hardware Platforms** | `#hardware` | Arista 7060X, 7800R, 7700R DES, 7280R3, 7280R3A — specs, variants, key features |
| 06 | **AI vs HPC** | `#hpc` | Synchronization barriers, traffic patterns, scale priorities comparison |
| 07 | **Protocol Deep Dive** | `#deep-dive` | Advanced RoCEv2/UET technical comparison |
| 08 | **Glossary** | `#glossary` | 145+ searchable networking terms |

All content is editable at runtime via the built-in [Admin CMS](#admin-cms).

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2 |
| Build tool | Vite | 6.2 |
| Language | TypeScript | 5.8 |
| Styling | Tailwind CSS (CDN) | — |
| Animation | Framer Motion | 11.0 |
| Charts | Recharts | 3.5 |
| Icons | Lucide React | 0.554 |
| Static server | serve (npm) | — |
| Container | Docker (node:22-alpine) | — |
| Hosting | Google Cloud Run | — |

> **No backend.** All data is client-side: defaults in `constants.ts`, overrides persisted to `localStorage`.

---

## Repository Layout

```
AIworkloads/
├── README.md
└── ai-networking-education-center/
    ├── index.html              # HTML shell — Tailwind CDN, importmap, Google Fonts
    ├── index.tsx               # React root (createRoot → App)
    ├── App.tsx                 # Root component — ErrorBoundary + DataProvider wrapper
    ├── vite.config.ts          # Vite config — port 3000, @-alias, GEMINI_API_KEY injection
    ├── tsconfig.json           # TypeScript config — ESNext, react-jsx, bundler resolution
    ├── Dockerfile              # 2-stage build: compile → serve on :8080
    ├── package.json
    │
    ├── constants.ts            # All default data + ICON_MAP + NAVIGATION (single source of truth)
    ├── types.ts                # 13 TypeScript interfaces (AppConfig, ProductData, etc.)
    │
    ├── contexts/
    │   └── DataContext.tsx     # Client-side CMS — localStorage persistence, version guard
    │
    ├── components/
    │   ├── Navigation.tsx      # Floating bottom dock + scrollspy active state
    │   ├── TableOfContents.tsx # Sticky sidebar — section links
    │   ├── HomeDashboard.tsx   # Hero + 6-card Bento grid (Module 01 entry)
    │   ├── ArchitectureSection.tsx  # Scaling concepts + SVG topology visual
    │   ├── ConceptsSection.tsx      # RDMA, NVMe, RoCEv2 cards with animations
    │   ├── ProtocolsSection.tsx     # Tabbed RoCEv2 vs UET comparison
    │   ├── ProtocolDeepDive.tsx     # Advanced protocol detail
    │   ├── ComparisonTable.tsx      # Feature matrix (Ethernet vs legacy)
    │   ├── PerformanceSection.tsx   # Recharts efficiency/failover graphs
    │   ├── HardwareSection.tsx      # Arista platform selector + specs
    │   ├── HPCSection.tsx           # AI vs HPC checklist
    │   ├── GlossarySection.tsx      # Searchable 3-column term grid
    │   ├── GlossaryTerm.tsx         # Inline hover-tooltip for any term
    │   ├── FadeIn.tsx               # IntersectionObserver + Framer Motion reveal
    │   ├── Footer.tsx               # Footer + hidden admin trigger (Settings icon)
    │   ├── Hero.tsx                 # Hero section
    │   ├── Loading.tsx              # Spinner
    │   ├── ErrorBoundary.tsx        # Top-level error boundary
    │   └── admin/
    │       ├── AdminDashboard.tsx   # Modal container + auth gate
    │       ├── AdminLogin.tsx       # Password check
    │       ├── AdminSidebar.tsx     # 11-tab navigation
    │       └── AdminEditors.tsx     # One editor component per content section
    │
    ├── hooks/
    │   ├── useActiveSection.ts      # IntersectionObserver → active nav item
    │   └── useProtocolSimulation.ts # Protocol animation state machine
    │
    └── utils/
        └── scroll.ts               # smoothScrollTo() — preventDefault + scrollIntoView
```

---

## Architecture

### High-Level Component Tree

```
App
├── ErrorBoundary
└── DataProvider (React Context)
    ├── Navigation               (floating dock, scrollspy)
    ├── TableOfContents          (sticky sidebar)
    ├── main
    │   ├── HomeDashboard        id="intro"
    │   ├── FadeIn > ArchitectureSection   id="etherlink"
    │   ├── FadeIn > ConceptsSection       id="concepts"
    │   ├── FadeIn > ProtocolsSection      id="protocols"
    │   ├── FadeIn > ProtocolDeepDive      id="deep-dive"
    │   ├── FadeIn > ComparisonTable       id="uec"
    │   ├── FadeIn > PerformanceSection    id="performance"
    │   ├── FadeIn > HardwareSection       id="hardware"
    │   ├── FadeIn > HPCSection            id="hpc"
    │   └── FadeIn > GlossarySection       id="glossary"
    ├── Footer
    └── AdminDashboard           (modal, conditionally rendered)
```

### Component Reference

| Component | Section ID | Data from `useData()` | Notable Pattern |
|-----------|-----------|----------------------|-----------------|
| `HomeDashboard` | `intro` | `homeModules`, `appConfig` | 6-card Bento grid |
| `ArchitectureSection` | `etherlink` | `scalingConcepts` | SVG animated leaf-spine diagram |
| `ConceptsSection` | `concepts` | `coreConcepts` | RDMA animation, RoCEv2 protocol stack visual |
| `ProtocolsSection` | `protocols` | `protocolConcepts` | Tabbed comparison, `useState(activeTab)` |
| `ProtocolDeepDive` | `deep-dive` | — | Hardcoded advanced content |
| `ComparisonTable` | `uec` | `comparisonTable` | Feature matrix rows |
| `PerformanceSection` | `performance` | `performanceData`, `failoverData` | Recharts BarChart + LineChart |
| `HardwareSection` | `hardware` | `products` | Product selector, `DescriptionRenderer` auto-glossary |
| `HPCSection` | `hpc` | `hpcChecklist` | Checklist cards |
| `GlossarySection` | `glossary` | `glossary` | `useState(searchTerm)`, 3-col grid |

### Data Flow

```
constants.ts
  └── Default values (CORE_CONCEPTS, PRODUCTS, GLOSSARY, ...)
        │
        ▼
DataContext.tsx  (loadState)
  ├── Check localStorage for 'app_<key>'
  │     ├── Found + version matches → use saved value
  │     └── Not found / version mismatch → use constants default
  │
  └── Exposes via useData() hook
        │
        ▼
Components  (useData())
  └── Render UI from context data
        │
        ▼  (Admin edits)
DataContext update functions (updateGlossary, updateProducts, ...)
  └── useEffect → localStorage.setItem('app_<key>', JSON.stringify(...))
```

### State Management

- **Store:** React Context (`DataContext`) — no Redux, no Zustand
- **Persistence:** Browser `localStorage` (JSON serialized), 14 keys
- **Schema versioning:** `app_version = '3.10'` — on mismatch the entire store resets to `constants.ts` defaults
- **No server state:** All data lives in the browser; clearing `localStorage` resets the app to its compiled defaults

### Routing

The app uses **anchor-based navigation** — no React Router.

| Mechanism | Implementation |
|-----------|---------------|
| Scroll to section | `smoothScrollTo()` in `utils/scroll.ts` |
| URL update (no reload) | `window.history.pushState(null, '', '#section-id')` |
| Active nav item | `useActiveSection()` hook — `IntersectionObserver` at 45% rootMargin |
| Scroll padding | `html { scroll-padding-top: 80px }` in `index.html` |

---

## Admin CMS

The app ships with a password-protected content management system that edits every section at runtime without code changes.

**Access:** Click the **Settings icon** (⚙) in the page footer.

| Field | Value |
|-------|-------|
| Password | `19901991` |
| Storage | Browser `localStorage` |
| Backend | None |

### Editor Tabs

| Tab | Controls |
|-----|---------|
| Config | Hero title and subtitle (`AppConfig`) |
| Layout | 6 home module cards (`HomeModule[]`) |
| Architecture | Scaling concept cards (`ScalingConcept[]`) |
| Concepts | Core technology cards — RDMA, NVMe, RoCEv2 (`ConceptData[]`) |
| Comparison | Feature comparison table rows (`ComparisonRow[]`) |
| Glossary | All 145+ term definitions (`Record<string, string>`) |
| Products | Hardware platform cards + variants (`ProductData[]`) |
| Performance | Chart data — efficiency and failover (`PerformanceData[]`) |
| Protocols | Protocol comparison cards (`ProtocolConcept[]`) |
| HPC | AI vs HPC checklist items (`HpcItem[]`) |
| Future | Roadmap items by category (`FutureCategory[]`) |

**Reset:** A "Reset to Defaults" button in the admin panel clears all `localStorage` keys and reloads the page, restoring the compiled defaults from `constants.ts`.

> Admin changes persist across browser sessions until reset. They do **not** affect other users or the deployed container — data never leaves the client.

---

## Development Guide

### Prerequisites & Quick Start

```bash
# Node.js 18+ required
cd ai-networking-education-center
npm install
npm run dev        # → http://localhost:3000
```

```bash
npm run build      # Production build → dist/
npm run preview    # Preview dist/ locally
```

### Adding or Editing Content

All default content lives in `constants.ts`. The pattern for adding a new concept, product, or glossary term:

1. **Add to the relevant export** in `constants.ts` (e.g., `CORE_CONCEPTS`, `PRODUCTS`, `GLOSSARY`)
2. **Add to `DataContext.tsx`** if the new data shape needs a new state variable and `localStorage` key
3. **Render in the component** that consumes that data via `useData()`
4. **Add an editor tab** in `AdminEditors.tsx` if runtime editing is needed

### ICON_MAP Pattern

Icons cannot be JSON-serialized, so all icon references use string keys mapped to Lucide React components:

```typescript
// constants.ts
export const ICON_MAP: Record<string, React.ElementType> = {
  "Server": Server,
  "Network": Network,
  "Database": Database,
  // ...70+ mappings
};

// In a component:
const Icon = ICON_MAP[item.iconKey] || Server;
<Icon size={24} />
```

To use a new icon: import it from `lucide-react` and add the mapping to `ICON_MAP` in `constants.ts`.

### GlossaryTerm Pattern

Wrap any technical term with `<GlossaryTerm>` to show a hover tooltip with the term's definition:

```tsx
import GlossaryTerm from './GlossaryTerm';

// Usage
<GlossaryTerm term="RoCEv2">RoCE</GlossaryTerm>
// → renders "RoCE" with a tooltip showing the GLOSSARY["RoCEv2"] definition
```

`HardwareSection` uses `DescriptionRenderer` which automatically wraps known glossary terms in product description text.

### FadeIn Animation

Wrap any section in `<FadeIn>` for an IntersectionObserver-triggered reveal:

```tsx
import FadeIn from './FadeIn';

<FadeIn direction="up">
  <MySection />
</FadeIn>
```

Supports `direction`: `"up"` | `"down"` | `"left"` | `"right"` | `"none"`. Triggers once on first viewport entry (`once: true`).

---

## Build & Deployment

### Docker

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build          # → /app/dist

# Stage 2: Serve
FROM node:22-alpine
RUN npm install -g serve
COPY --from=build /app/dist ./dist
ENV PORT=8080
CMD ["serve", "-s", "dist", "-l", "8080"]
```

```bash
docker build -t aiworkloads .
docker run -p 8080:8080 aiworkloads
```

### Google Cloud Run — infralens-486218

The app is deployed to Google Cloud Run under the **infralens** GCP project.

| Setting | Value |
|---------|-------|
| GCP Project | `infralens-486218` |
| Service name | `aiworkloads` |
| Region | `europe-west1` |
| Min instances | `1` |
| Max instances | `3` |
| Memory | `512Mi` |
| CPU | `1` |
| Port | `8080` |
| Access | Public (unauthenticated) |
| Custom domain | `learn.polymathsystem.com` |
| DNS | `CNAME → ghs.googlehosted.com` |
| SSL | Cloud Run managed (auto-provisioned) |
| Image registry | `europe-west1-docker.pkg.dev/infralens-486218/cloud-run-source-deploy/aiworkloads` |

**Deploy from source** (builds via Cloud Build, no local Docker required):

```bash
cd ai-networking-education-center

gcloud run deploy aiworkloads \
  --source . \
  --project=infralens-486218 \
  --region=europe-west1 \
  --min-instances=1 \
  --max-instances=3 \
  --memory=512Mi \
  --cpu=1 \
  --concurrency=80 \
  --timeout=60s \
  --allow-unauthenticated
```

**Domain mapping** (one-time setup per project):

```bash
gcloud run domain-mappings create \
  --service=aiworkloads \
  --domain=learn.polymathsystem.com \
  --project=infralens-486218 \
  --region=europe-west1
```

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `PORT` | Runtime (Cloud Run injects) | Port the `serve` process binds to |
| `GEMINI_API_KEY` | Build-time (`.env` → Vite) | Injected as `process.env.GEMINI_API_KEY` — wired in `vite.config.ts` but not currently consumed by any component |

`.env` file (not committed — gitignored):
```
GEMINI_API_KEY=your-key-here
```

---

## Data Schema Reference

Key TypeScript interfaces from `types.ts`:

```typescript
interface AppConfig {
  heroLabel: string;       // e.g. "AI Networking"
  heroTitle: string;       // Main heading
  heroSubtitle: string;    // Subheading
}

interface HomeModule {
  id: string;
  title: string;
  subtitle: string;
  iconKey: string;         // Key into ICON_MAP
  progress: number;        // 0–100, displayed as progress bar
  href: string;            // Anchor link e.g. "#concepts"
  color: string;           // Tailwind color name e.g. "blue"
}

interface ConceptData {
  id: string;              // e.g. "rdma", "nvme", "roce_intro"
  title: string;
  fullName: string;
  description: string;
  iconKey: string;
  features: string[];
}

interface ProtocolConcept {
  id: string;              // e.g. "roce", "uet"
  title: string;
  subtitle: string;
  description: string;
  iconKey: string;
  color: string;
  mechanisms: { label: string; detail: string }[];
  pros: string[];
  cons: string[];
}

interface ProductData {
  id: string;              // e.g. "7060X", "7800R"
  series: string;
  role: string;            // e.g. "AI Leaf or Spine"
  iconKey: string;
  desc: string;
  specs: string[];
  scale: string;
  datasheetUrl: string;
  keyFeatures: {
    label: string;
    value: string;
    subtext: string;
    iconKey: string;
  }[];
  variants: {
    name: string;
    chip: string;
    capacity: string;
    ports: string;
    formFactor: string;
  }[];
}

interface ComparisonRow {
  feature: string;
  modern: string;          // Ethernet/UEC side
  legacy: string;          // Traditional/InfiniBand side
  advantage: "modern" | "legacy" | "neutral";
}

interface ScalingConcept {
  title: string;
  desc: string;
  details: string;
  iconKey: string;
  color: string;
  pinnacle: string;
  legacy: string;
}

interface FutureCategory {
  category: string;
  iconKey: string;
  items: FutureItem[];
}

interface FutureItem {
  title: string;
  description: string;
  iconKey: string;
}
```

---

## LocalStorage Keys Reference

All keys are prefixed `app_`. A version mismatch on `app_version` clears the entire store.

| Key | Type | Source Constant |
|-----|------|----------------|
| `app_version` | `string` (`'3.10'`) | Hardcoded in `DataContext` |
| `app_config` | `AppConfig` | `DEFAULT_APP_CONFIG` |
| `app_home_modules` | `HomeModule[]` | `DEFAULT_HOME_MODULES` |
| `app_glossary` | `Record<string, string>` | `GLOSSARY` |
| `app_scaling` | `ScalingConcept[]` | `SCALING_CONCEPTS` |
| `app_core_concepts` | `ConceptData[]` | `CORE_CONCEPTS` |
| `app_protocols` | `ProtocolConcept[]` | `PROTOCOL_CONCEPTS` |
| `app_comparison` | `ComparisonRow[]` | `COMPARISON_TABLE` |
| `app_perf_data` | `PerformanceData[]` | `PERFORMANCE_DATA` |
| `app_failover_data` | `FailoverData[]` | `FAILOVER_DATA` |
| `app_products` | `ProductData[]` | `PRODUCTS` |
| `app_hpc_checklist` | `HpcItem[]` | `INITIAL_HPC_CHECKLIST` |
| `app_future` | `FutureCategory[]` | `FUTURE_IMPROVEMENTS` |
| `app_feedback` | `FeedbackItem[]` | `[]` (empty default) |
