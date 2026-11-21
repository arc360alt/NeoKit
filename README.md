# NeoKit

The landing page for NeoKit, a set of open source creative tools that run in the browser:

- **NeoCut**, a video editor: https://cut.neokit.org
- **NeoImage**, a photo editor and design tool: https://image.neokit.org
- **Scatter**, a freeform corkboard for notes, todos and kanban boards: https://scatter.neokit.org

The UI and setup come from NeoCut (a fork of [OpenCut](https://github.com/OpenCut-app/OpenCut)).

## Getting started

```bash
bun install
bun dev:web        # http://localhost:3000
bun run build:web  # production build
bun run generate:icons  # regenerate favicons and the OG image from the logo
```

Set `NEXT_PUBLIC_SITE_URL` (see `apps/web/.env.example`) for canonical links. It defaults to `https://neokit.org`.

## Structure

- `apps/web/src/app/page.tsx`: the landing page
- `apps/web/src/app/partners/page.tsx`: the Other Partners page (PleaseStudy, NyxIDE, LiquidDesktop & Lumen)
- `apps/web/src/components/landing/`: hero, product cards, feature sections
- `apps/web/src/site/products.ts`: names, URLs and repo links for every app
- `apps/web/src/site/partners.ts`: the partner projects shown on `/partners`
