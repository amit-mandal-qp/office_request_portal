# QuestionPro Design System

A reusable design system for **QuestionPro** — a survey, research, and experience-management platform. This project encodes QuestionPro's design tokens and the **Wick UI** component library (`wu-` / `Wu*` namespace) as branded, reusable building blocks: tokens, foundation specimens, React component primitives, and a product UI kit.

## Sources

This system was authored from two specifications provided by the team (no live codebase or Figma link was attached):

1. **QuestionPro design tokens** — a JSON spec covering colors (brand, gray, notifications, upgrades), typography scale, layout spacing (minimal / baseline / large tiers), and corner radii.
2. **Wick UI component library** — a Storybook export (`@npm-questionpro/wick-ui-lib` + `@npm-questionpro/wick-ui-editor`) describing ~40 components: `WuButton`, `WuChip`, `WuCard`, `WuInput`, `WuSelect`, `WuModal`, `WuTab`, `WuToggle`, `WuDataTable`, `WuAppHeader`, `WuSidebar`, and more. Components use a Tailwind-style `wu-` utility prefix.

> If you have access to the live repo (`packages/wick-ui-lib`, `packages/wick-ui-editor`) or a Figma file, link it and I can raise fidelity — especially the real logo and icon font.

---

## CONTENT FUNDAMENTALS

How QuestionPro writes copy, drawn from the component stories and product strings.

- **Voice:** Plain, professional, product-focused. Speaks to a business researcher / survey admin. Confident but never playful or salesy in the core product (the one exception is upgrade CTAs — see below).
- **Person:** Addresses the user as **"you"** ("Manage and track all your surveys in one place"). System describes its own actions in plain present tense ("Imported user list and added 25 new users").
- **Casing:** **Sentence case everywhere** — headings, buttons, labels, menu items. "Create survey", "Export results", "Total responses", "Survey name". Title Case is avoided. Buttons are short verb phrases: "Create survey", "Save changes", "Upgrade now", "Add to cart".
- **Labels & metadata:** Terse and scannable. Table headers are single words or short noun phrases ("Status", "Responses", "Completion", "Owner", "Created"). Stat cards pair a big number with a tiny qualifier ("1,923 — this month", "74% — last 30 days").
- **Empty / helper states:** Short and instructive. "No surveys match your filters", "Start by adding your first entry", "There is no data to display".
- **Upgrade tone:** The one place copy gets persuasive. "Upgrade to Premium", "Unlock Premium Features", "Get Started", benefit bullets ("Unlimited projects", "Priority support"). Paired with the amber upgrade color.
- **Destructive copy:** Clear and cautionary. "Delete account", "This action cannot be undone", "Are you sure you want to delete this item?"
- **Emoji:** Not part of the product UI. Emoji appear only in Storybook demo content, never as brand vocabulary. Do **not** use emoji in QuestionPro interfaces.
- **Numbers:** Localized with separators ("1,284", "$65K", "1,923"). Percentages and currency are common in dashboards.
- **i18n:** The product is fully internationalized (LTR + RTL, `dir="rtl"`); keep strings translatable and layouts direction-agnostic.

**Examples**

> Heading: "Surveys" · Subtitle: "Manage and track all your surveys in one place"
> Buttons: "Create survey" · "Export results" · "Save changes" · "Upgrade now"
> Stat: **74%** "Avg. completion" / "last 30 days"
> Status chips: "Active" · "Draft" · "Archived" · "Scheduled"

---

## VISUAL FOUNDATIONS

**Color.** Two brand blues anchor everything: **Dark Blue `#1B3380`** (trust, headers, primary surfaces, strong text) and **Electric Blue `#1B87E6`** (primary buttons, links, anything interactive). A warm-neutral **gray ramp** (`#545E6B` lead text → `#F5F5F5` subtle surfaces) does the heavy lifting for text and chrome. Sidebars use `#EEEEEE` to separate from white content. Semantic notifications always come as a **deep/soft pair** — deep for the icon/text, soft for the background fill (e.g. success `#227700` on `#DFF2BF`). A single **amber upgrade** accent (`#F5A300`) is reserved exclusively for plan-upgrade / payment CTAs — never decorative.

**Type.** **Fira Sans** throughout — a humanist, open, highly legible sans. Hierarchy is built with size + weight + line-height rather than color, and the scale uses only **three weights: Light (300), Regular (400), Medium (500)** — there is no semibold or bold. Display-01 (48/56) is Light; Display-02 (40/48), Heading-01 (32/40) and Heading-02 (24/32) are Regular; Heading-03 (18/32) and Heading-04 (16/24, card/nav titles) are Medium. Body, subtitle, and **button** text are all Regular. Body text is gray-lead `#545E6B`, not black, which softens dense data screens. Every named style ships as a `--font-*` size token plus matching `-weight` / `-line` tokens and a `--text-*` `font:` shorthand.

> **Font file:** `--font-sans` points at `"Fira Sans"` with a `system-ui` fallback stack. No font binary ships with this system yet — until one is uploaded (drop `.woff2` files in `assets/fonts/` and add a matching `@font-face` in `tokens/fonts.css`), the fallback renders. Specimen cards and kits also pull Fira Sans from Google Fonts via a `<link>`. Do not swap the family — keep `"Fira Sans"` as the token value.

**Spacing.** A disciplined three-tier token scale. **Minimal** (0/1/2/4px) for hairlines and intra-component gaps; **baseline** (8/12/16/24/32px) for nearly all padding and gaps; **large** (40→104px) for section separation. Most component padding lands on 8/12/16.

**Shape & radii.** Soft, structured corners: **2–4px** on chips/small buttons/inputs, **6–8px** on standard cards/dropdowns/default buttons, **12–16px** on modals and large panels, **pill (9999px)** for avatars and rounded brand buttons. Nothing is sharp-cornered by default.

**Cards.** White surface, **1px `#D8D8D8` border**, ~8px radius, optional soft shadow on hover/elevation. Cards are quiet containers — border + radius do the work, not heavy shadow. Header / body / footer are separated by hairline `#EEEEEE` dividers.

**Elevation / shadows.** Low and soft, tinted toward the brand blue rather than pure black. Resting cards are flat-with-border; dropdowns, popovers and menus get a small shadow; modals get the largest (`0 10px 40px rgba(27,51,128,.15)`). No hard drop shadows.

**Borders.** 1px `#D8D8D8` is the default container border; `#E8E8E8` for subtler dividers; 2px electric-blue for focus / active outlines.

**Focus & states.** Focus = a 3px translucent electric-blue ring. Hover = subtle background tint (e.g. `#F5F5F5`, or a darker shade of the button color); links/buttons darken on hover. Upgrade buttons go amber → lighter amber `#FFCF70` on hover. Disabled = muted gray text/icons (`#9B9B9B`) with reduced contrast. Selected/active states use electric-blue text or a light blue fill.

**Motion.** Restrained and functional — short fades and slides (tabs, drawers, accordions, drilldown panels offer slideLeft/slideRight/fadeZoom). No bounces, no decorative looping animation. Transitions are quick (~150–250ms) and ease in/out.

**Imagery.** The product is data- and chrome-forward; photography is minimal. When imagery appears it's neutral and functional (avatars, uploaded media). No grain, no heavy filters, no gradient washes.

**Backgrounds.** Flat. White content areas on light-gray app chrome. **No gradients** in the core UI (the dark-blue app header is solid). No textures or patterns.

**Layout.** App shell = solid dark-blue **app header** (product switcher, search, account, upgrade), an optional light-gray **sidebar** (`#EEEEEE`), and a white content canvas. Secondary nav bars and breadcrumbs sit below the header. Tables, stat-card grids, and toolbars (search + filters + pagination) are the dominant content patterns. Fully responsive and RTL-aware.

**Transparency / blur.** Used sparingly — translucent overlays behind modals/drawers, translucent focus rings. No glassmorphism or backdrop-blur as a brand motif.

---

## ICONOGRAPHY

QuestionPro ships a **proprietary icon font** referenced throughout Wick UI by CSS class with three prefixes:

- **`wm-…`** — "Wick Material" icons (the bulk): `wm-home`, `wm-search`, `wm-settings`, `wm-edit`, `wm-delete`, `wm-person`, `wm-calendar-clock`, `wm-arrow-back`, `wm-more-vert`, `wm-visibility`, `wm-check-circle`, `wm-notifications`, `wm-shopping-cart`, …
- **`wc-…`** — "Wick Custom" product icons: `wc-edit`, `wc-design`, `wc-media-library`, `wc-settings`, `wc-chart`, `wc-area-chart`, …
- **`wp-…`** — "Wick Product" icons: `wp-bi`, …

Icons are rendered as `<span className="wm-…" />` and sized/colored with text utilities (`wu-text-xl`, `wu-text-blue-600`). They are decorative by default and paired with text labels; icon-only buttons must carry an `aria-label`.

**Emoji / unicode:** not used as product iconography (only in demo content).

> ⚠️ **Substitution flagged:** the proprietary Wick icon-font binaries were not provided. This system substitutes **Google Material Symbols** (Rounded) via CDN, which closely matches the `wm-` Material lineage. A small shim maps common `wm-*` classes to Material Symbols glyphs (`assets/icons/wick-icons.css`). Replace with the real font files for production fidelity.

---

## INDEX / MANIFEST

Root files:
- `styles.css` — global entry point (`@import`s all tokens). **Link this.**
- `readme.md` — this file.
- `SKILL.md` — portable skill manifest.

Folders:
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `fonts.css`.
- `guidelines/` — foundation specimen `@dsCard`s (Design System tab): brand colors, gray ramp, notification pairs, headings, body/buttons, spacing scale, radii & elevation.
- `assets/` — `logo/` (`questionpro-wordmark.svg`, a placeholder text wordmark), `icons/` (`wick-icons.css`, the Material Symbols shim).
- `components/` — React primitives, each in its own folder (`<name>/<Name>.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard` HTML):
  - `button/` **Button**, `chip/` **Chip**, `card/` **Card** (+ `CardHeader`, `CardFooter`), `input/` **Input**, `toggle/` **Toggle**, `tabs/` **Tabs**, `avatar/` **Avatar**.
  - Build-time namespace: `window.QuestionProDesignSystem_8f51d4` (run `check_design_system` to reconfirm). **Button** and the Survey Manager screen are registered Starting Points.
- `ui_kits/survey_manager/` — interactive Survey Management dashboard recreation (`index.html` + `data.js` + `primitives.jsx` + `app.jsx`).

See the Design System tab for rendered specimen + component cards.

> Note: the Wick UI spec describes ~40 components; this system ships the 7 highest-leverage primitives above. `WuModal`, `WuSelect`, `WuDataTable`, `WuAppHeader`, and `WuSidebar` are demonstrated inline in the Survey Manager kit and are good candidates to promote into standalone components next.
