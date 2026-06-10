# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Mobile Bare Icon, Half-Hidden & Sub-Action Backgrounds
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate both mobile ContactBubble bugs and the service image fallback bug
  - **Scoped PBT Approach**: Deterministic rendering assertions scoped to the concrete failing cases (mobile viewport, locale="ar"/"en", open=false/true; src=undefined)
  - Create test file at `src/__tests__/contact-bubble-bug-condition.test.tsx`
  - Test 1 — RTL closed, trigger has bg-* class: render `ContactBubble` with `window.innerWidth=375`, `locale="ar"`, `open=false`; assert trigger `<button>` has NO class matching `/bg-/` → expect **FAIL** if bg-* still present
  - Test 2 — LTR closed, sliding container missing translateX: render with `locale="en"`, `open=false`; assert container `style.transform === "translateX(-50%)"` → confirm it exists (should already pass, but document)
  - Test 3 — RTL closed, sliding container missing translateX: render with `locale="ar"`, `open=false`; assert `style.transform === "translateX(50%)"` → confirm it exists
  - Test 4 — RTL open, trigger NOT hidden: render with `open=true`; assert trigger `<button>` `style.opacity === "0"` and `style.pointerEvents === "none"` → expect **FAIL** if the hide logic is missing
  - Test 5 — Sub-action WA anchor has bg-*: render with `open=true`; assert WA `<a>` has NO class matching `/bg-/` → expect **FAIL** if bg-* classes remain
  - Test 6 — Sub-action Call anchor has bg-*: same, for Call `<a>`
  - Create test file at `src/__tests__/service-image-bug-condition.test.tsx`
  - Test 7 — undefined src shows broken img: render original `<img src={undefined}>` and assert placeholder div is present → expect **FAIL** (no fallback component exists yet)
  - Test 8 — onError not wired: render `ServiceCardImage` (once created) with valid src, simulate `onError`; assert placeholder shown → expect **FAIL** before fix
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests FAIL (this is correct — proves bugs exist); document each counterexample found
  - Mark task complete when tests are written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Desktop FAB Unchanged & Successful Image Load
  - **IMPORTANT**: Follow observation-first methodology
  - Observe desktop ContactBubble on UNFIXED code: renders `<a>` with `bg-[#25D366]`, `rounded-full`, `shadow-lg`, positioned `bottom-6 left-6` (RTL) or `bottom-6 right-6` (LTR) inside the `md:flex` subtree; mobile panel has `md:hidden` class
  - Observe service image on UNFIXED code with valid URL: renders `<img>` with `object-cover group-hover:scale-110 transition-transform duration-700` (ServicesOverview) or `object-cover transition-transform duration-700 group-hover:scale-105` (ServicesPage)
  - Create test file at `src/__tests__/contact-bubble-preservation.test.tsx`
  - **PBT — Desktop FAB**: Using `fast-check`, generate arbitrary `{ locale: "ar" | "en", open: boolean, pathname: "/" }`. For all inputs the desktop `<a>` must contain class `bg-[#25D366]`, `rounded-full`, `shadow-lg`; the mobile panel `<div>` must carry class `md:hidden`; `trackEvent` spy must NOT be called on render (only on click)
  - **Unit** — RTL desktop: assert desktop `<a>` has `left-6`, NOT `right-6`
  - **Unit** — LTR desktop: assert desktop `<a>` has `right-6`, NOT `left-6`
  - **Unit** — pathname includes "portal": assert component returns null
  - **Unit** — pathname includes "request-quote": assert component returns null
  - **Unit** — desktop WA click fires `trackEvent("click_whatsapp", { location: "floating_button" })`
  - **Unit** — outside-click useEffect calls `setOpen(false)` (simulate mousedown outside ref)
  - Create test file at `src/__tests__/service-image-preservation.test.tsx`
  - **PBT — Service image preservation**: Using `fast-check`, generate non-empty non-undefined URL strings. For all such inputs with no `onError` fired, rendered `ServiceCardImage` must contain `<img>` with `src` equal to input and `className` including `object-cover`; NO placeholder div present
  - **PBT — Services page image preservation**: Same pattern for `ServicePageImage` component; verify `object-cover transition-transform duration-700 group-hover:scale-105` className intact
  - Run all preservation tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (confirms baseline behavior to preserve before touching anything)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 3. Fix Bug 1 — ContactBubble mobile styling (`src/shared/components/layout/contact-bubble.tsx`)

  - [x] 3.1 Strip bg-*/shadow-*/rounded-* from mobile trigger button and sub-action anchors
    - Open `src/shared/components/layout/contact-bubble.tsx`
    - Locate the `md:hidden` panel subtree (the second `<div ref={ref}>` block)
    - Inspect the trigger `<button>`: remove any `bg-*`, `rounded-full`, `rounded-*`, `shadow-*`, `size-14` (keep `flex size-12 items-center justify-center text-primary drop-shadow-lg active:scale-90 transition-transform duration-200`)
    - Inspect the WhatsApp `<a>`: remove any `bg-*`, `border`, `rounded-*`, `shadow-*` (keep `flex size-12 items-center justify-center text-[#25D366] drop-shadow-lg active:scale-90` plus existing inline animation styles)
    - Inspect the Call `<a>`: same removal (keep `flex size-12 items-center justify-center text-primary drop-shadow-lg active:scale-90` plus inline animation styles)
    - Inspect the sliding container `<div>`: confirm no `bg-*` class on this element
    - _Bug_Condition: isBugCondition_ContactBubble(context) → context.viewport = "mobile" AND (triggerHasBackground OR subActionsHaveBackground OR containerHasBackground)_
    - _Expected_Behavior: trigger `<button>` has no bg-*, shadow-*, rounded-* classes; sub-action `<a>` elements have no bg-*, rounded-* classes_
    - _Preservation: desktop `md:flex` FAB with bg-[#25D366], rounded-full, shadow-lg is untouched_
    - _Requirements: 1.1, 1.4, 2.1, 2.2, 2.3_

  - [x] 3.2 Add inline translateX style on sliding container (closed state)
    - Confirm the sliding container `<div>` (directly inside the `md:hidden` wrapper) has this exact inline style block:
      ```tsx
      style={{
        transition: "transform 300ms cubic-bezier(0.34,1.2,0.64,1)",
        transform: open
          ? "translateX(0)"
          : isRTL
          ? "translateX(50%)"
          : "translateX(-50%)",
      }}
      ```
    - If missing or incorrect, add/correct it (do NOT use Tailwind classes for this — Tailwind cannot compose these values with the runtime directional condition)
    - _Bug_Condition: isBugCondition_ContactBubble(context) → context.viewport = "mobile" AND closedOffsetMissing_
    - _Expected_Behavior: closed RTL → translateX(50%); closed LTR → translateX(-50%); open → translateX(0)_
    - _Preservation: desktop FAB positioning (left-6/right-6) unchanged_
    - _Requirements: 1.2, 1.3, 2.1, 2.2_

  - [x] 3.3 Hide trigger icon (opacity 0, pointerEvents none) when open === true
    - Add inline `style` to the trigger `<button>`:
      ```tsx
      style={{
        opacity: open ? 0 : 1,
        pointerEvents: open ? "none" : "auto",
        transition: "opacity 200ms ease",
      }}
      ```
    - Verify the button remains in the DOM (do NOT use `hidden` or `display:none` — layout stability requires the button to keep its space)
    - _Bug_Condition: isBugCondition_ContactBubble(context) → context.open = true AND trigger NOT hidden_
    - _Expected_Behavior: open=true → trigger opacity:0, pointerEvents:none; open=false → trigger opacity:1, pointerEvents:auto_
    - _Preservation: aria-expanded attribute and tabIndex behavior on trigger unchanged_
    - _Requirements: 1.4, 2.4_

  - [x] 3.4 Confirm setOpen(false) in both sub-action onClick handlers
    - Locate the WhatsApp `<a>` onClick: verify it calls `setOpen(false)` after `trackEvent("click_whatsapp", { location: "mobile_bubble" })`
    - Locate the Call `<a>` onClick: verify it calls `setOpen(false)` after `trackEvent("click_call", { location: "mobile_bubble" })`
    - If either is missing, add the `setOpen(false)` call
    - _Bug_Condition: isBugCondition_ContactBubble(context) → sub-action tapped AND setOpen(false) absent_
    - _Expected_Behavior: both WA and Call onClick handlers call setOpen(false), collapsing the panel_
    - _Preservation: trackEvent analytics calls for both actions remain unchanged_
    - _Requirements: 1.5, 2.5, 3.4, 3.5_

  - [x] 3.5 Verify bug condition exploration test now passes (ContactBubble)
    - **Property 1: Expected Behavior** - Mobile Bare Icon, Half-Hidden & Sub-Action Backgrounds
    - **IMPORTANT**: Re-run the SAME test from task 1 (contact-bubble-bug-condition.test.tsx) — do NOT write a new test
    - The tests from task 1 encode the expected behavior for the ContactBubble fix
    - Run: `pnpm test src/__tests__/contact-bubble-bug-condition.test.tsx --run`
    - **EXPECTED OUTCOME**: All ContactBubble bug-condition tests PASS (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 3.6 Verify ContactBubble preservation tests still pass
    - **Property 2: Preservation** - Desktop FAB Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 (contact-bubble-preservation.test.tsx) — do NOT write new tests
    - Run: `pnpm test src/__tests__/contact-bubble-preservation.test.tsx --run`
    - **EXPECTED OUTCOME**: All preservation tests PASS (confirms no regressions on desktop FAB, analytics, pathname hiding, outside-click)

- [x] 4. Fix Bug 2a — ServicesOverview service image fallback (`src/features/home/components/services-overview.tsx`)

  - [x] 4.1 Extract "use client" ServiceCardImage sub-component
    - Add a new `ServiceCardImage` client component at the top of `src/features/home/components/services-overview.tsx`, above the existing `ServicesOverview` server component
    - Add `"use client"` directive as the very first line of the new component block (use a comment above it in the server file, or extract to a separate file `src/features/home/components/service-card-image.tsx` with its own `"use client"` at the top — choose the separate file approach to keep the server component clean)
    - Component interface:
      ```tsx
      interface ServiceCardImageProps {
        src: string | undefined;
        alt: string;
        icon: string; // Material Symbol name, e.g. "architecture"
      }
      ```
    - Component logic:
      - `const [imgError, setImgError] = useState(false)`
      - If `!src || imgError`: render placeholder `<div className="w-full h-full flex items-center justify-center bg-[#f3f3fb]">` containing `<span className="material-symbols-outlined text-[#002868]" style={{ fontSize: "64px", fontVariationSettings: "'FILL' 0, 'wght' 300" }} aria-hidden="true">{icon}</span>`
      - Else: render `<img src={src} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />`
    - _Bug_Condition: isBugCondition_ServiceImage(props) → props.src = undefined OR onError fired_
    - _Expected_Behavior: placeholder div with bg-[#f3f3fb] and centered material-symbol in text-[#002868] shown; no broken-image browser slot_
    - _Preservation: successful image load renders identical <img> with object-cover group-hover:scale-110 className_
    - _Requirements: 1.6, 1.7, 2.7, 2.8_

  - [x] 4.2 Replace plain <img> with ServiceCardImage in ServicesOverview
    - In `ServicesOverview`, inside the card's image wrapper `<div className="md:w-1/2 h-64 md:h-auto overflow-hidden shrink-0">`:
    - Remove the existing `{/* eslint-disable-next-line */} <img src={img} alt={item.title} className="...">` block
    - Add `<ServiceCardImage src={img} alt={item.title} icon={icon} />`
    - Import `ServiceCardImage` from the extracted client component file
    - Verify the outer wrapper div's `overflow-hidden` and sizing classes remain exactly as before
    - _Requirements: 2.7, 2.8, 3.6_

  - [x] 4.3 Verify bug condition exploration test now passes (ServiceCardImage)
    - **Property 1: Expected Behavior** - Service Image Fallback Shown
    - **IMPORTANT**: Re-run the SAME test from task 1 (service-image-bug-condition.test.tsx) — do NOT write a new test
    - Run: `pnpm test src/__tests__/service-image-bug-condition.test.tsx --run`
    - **EXPECTED OUTCOME**: Service image bug-condition tests PASS (confirms fallback renders correctly)
    - _Requirements: 2.7, 2.8_

  - [x] 4.4 Verify ServiceCardImage preservation tests still pass
    - **Property 2: Preservation** - Successful Image Load Unchanged (ServicesOverview)
    - **IMPORTANT**: Re-run the SAME tests from task 2 (service-image-preservation.test.tsx) — do NOT write new tests
    - Run: `pnpm test src/__tests__/service-image-preservation.test.tsx --run`
    - **EXPECTED OUTCOME**: Preservation tests PASS (confirms successful image load path is byte-identical to pre-fix behavior)

- [x] 5. Fix Bug 2b — Services page image fallback (`src/app/[locale]/services/page.tsx`)

  - [x] 5.1 Extract "use client" ServicePageImage sub-component
    - Create `src/shared/components/ui/service-image-with-fallback.tsx` with `"use client"` at the top
    - Component interface:
      ```tsx
      interface ServicePageImageProps {
        src: string | undefined;
        alt: string;
        icon: string; // Material Symbol name for this service
      }
      ```
    - Component logic:
      - `const [imgError, setImgError] = useState(false)`
      - If `!src || imgError`: render placeholder `<div className="absolute inset-0 flex items-center justify-center bg-[#f3f3fb]">` containing `<span className="material-symbols-outlined text-[#002868]" style={{ fontSize: "80px", fontVariationSettings: "'FILL' 0, 'wght' 300" }} aria-hidden="true">{icon}</span>`
      - Else: render `<img src={src} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />`
    - Note: placeholder uses `absolute inset-0` (not `w-full h-full`) because the services page image container uses `relative` positioning; the gradient overlay `<div>` and the service name `<div>` below must remain siblings of the image element, not wrapped by it
    - _Bug_Condition: isBugCondition_ServiceImage(props) → props.src = undefined OR onError fired_
    - _Expected_Behavior: placeholder div with bg-[#f3f3fb] and centered 80px material-symbol in text-[#002868]; gradient overlay and service name text still visible on top_
    - _Preservation: successful image load renders <img> with object-cover transition-transform duration-700 group-hover:scale-105_
    - _Requirements: 1.6, 2.7, 2.8_

  - [x] 5.2 Add serviceIconMap and replace plain <img> in services/page.tsx
    - In `src/app/[locale]/services/page.tsx`, add the icon mapping above the `return`:
      ```tsx
      const serviceIconMap: Record<string, string> = {
        "1": "architecture",   // aluminum-works
        "2": "window",         // glass-works
        "3": "format_shapes",  // steel-works
      };
      ```
    - Import `ServicePageImage` (the component from step 5.1) — use the name `ServiceImageWithFallback` or `ServicePageImage` consistently
    - Inside the `services.map(...)` block, locate the image column `<div className="relative h-72 lg:h-auto min-h-[420px] overflow-hidden ...">`:
      - Remove the existing `{/* eslint-disable-next-line */} <img src={service.image} alt={service.title} className="...">` block
      - Add: `<ServicePageImage src={service.image} alt={service.title} icon={serviceIconMap[service.id] ?? "construction"} />`
    - The surrounding `<div>` with `relative h-72 lg:h-auto min-h-[420px] overflow-hidden`, gradient overlay `<div>`, and service name `<div>` below remain completely unchanged
    - _Requirements: 2.7, 2.8, 3.7_

  - [x] 5.3 Verify bug condition exploration test passes for ServicePageImage
    - **Property 1: Expected Behavior** - Service Page Image Fallback Shown
    - Re-run `pnpm test src/__tests__/service-image-bug-condition.test.tsx --run` (extend the same test file with ServicePageImage cases if not already covered, following the same pattern)
    - **EXPECTED OUTCOME**: All service image bug-condition tests PASS
    - _Requirements: 2.7, 2.8_

  - [x] 5.4 Verify services page preservation tests still pass
    - **Property 2: Preservation** - Successful Image Load Unchanged (Services Page)
    - Re-run `pnpm test src/__tests__/service-image-preservation.test.tsx --run`
    - **EXPECTED OUTCOME**: Preservation tests PASS for both ServicesOverview and ServicesPage paths

- [x] 6. Checkpoint — Ensure all tests pass
  - Run the full test suite: `pnpm test --run`
  - Verify all of the following pass with zero failures:
    - `src/__tests__/contact-bubble-bug-condition.test.tsx` — Property 1 (ContactBubble bug condition)
    - `src/__tests__/contact-bubble-preservation.test.tsx` — Property 2 (desktop FAB preservation)
    - `src/__tests__/service-image-bug-condition.test.tsx` — Property 1 (service image fallback)
    - `src/__tests__/service-image-preservation.test.tsx` — Property 2 (service image preservation)
  - Confirm no TypeScript errors: `pnpm tsc --noEmit`
  - Confirm no ESLint errors: `pnpm lint`
  - Ask the user if any questions arise or if any test reveals unexpected behavior
