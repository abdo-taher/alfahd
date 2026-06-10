# Floating Contact Button Fix — Bugfix Design

## Overview

Two independent visual/functional bugs are addressed in this fix.

**Bug 1 — `ContactBubble` (Mobile):** The mobile trigger renders as a styled filled FAB with a background container, fully visible on screen. It must instead be a bare icon (no background, no border, no shadow on the button element itself) that is half-hidden off the relevant screen edge, sliding fully into view on tap to reveal two bare icon sub-actions. Desktop behavior is untouched.

**Bug 2 — Service Image Fallback:** Service images are loaded via plain `<img>` tags pointing at Unsplash URLs with no `onError` handler and no fallback for undefined `src`. On any network failure or missing key in `serviceImageMap`, the browser renders a broken-image slot. The fix introduces a React state flag (`imgError`) per card that, when set, swaps the `<img>` element for a branded placeholder tile.

Both fixes are minimal and surgical — no surrounding code or unrelated behavior changes.

---

## Glossary

- **Bug_Condition (C)**: The set of runtime conditions under which a bug manifests.
- **Property (P)**: The correct observable behavior expected when the condition holds.
- **Preservation**: Behaviors that must remain byte-for-byte identical before and after the patch.
- **ContactBubble**: The `"use client"` component in `src/shared/components/layout/contact-bubble.tsx` that renders the floating contact widget. It contains two subtrees: `md:flex` (desktop FAB) and `md:hidden` (mobile panel).
- **Mobile panel**: The `md:hidden` `<div>` subtree containing the trigger `<button>` and two sub-action `<a>` elements.
- **Trigger icon**: The `<button>` inside the mobile panel that toggles `open` state. When closed it must be half off-screen; when open it must be hidden (opacity 0, pointer-events none).
- **Sub-action**: Either of the two `<a>` elements (WhatsApp, Call) inside the mobile panel. They must be bare icons — no `bg-*`, no `rounded-*`, no `shadow-*` on the button element.
- **isRTL**: Derived from `locale === "ar"`. Controls which edge the panel is anchored to and the sign of the `translateX` offset.
- **serviceImageMap**: The `Record<string, string>` in `services-overview.tsx` mapping service `id` to Unsplash URLs. A missing key returns `undefined`.
- **imgError state flag**: A per-card `boolean` React state value set to `true` inside `onError`. When `true`, the `<img>` is replaced by the branded placeholder.
- **Branded placeholder**: A `div` with `bg-surface-container-low` (#F3F3FB) containing a centered Material Symbol icon in `text-primary` (#002868), shown when image load fails or `src` is undefined.
- **surface-container-low**: Design-system token `#F3F3FB` — the standard alternating section background.
- **text-primary**: Design-system token `#002868` — the main brand color.

---

## Bug Details

### Bug 1 — ContactBubble Mobile Styling

#### Bug Condition

The bug manifests when the page is viewed on a mobile viewport (< 768 px) and the `ContactBubble` component renders. The mobile panel's trigger button and sub-action anchors carry Tailwind classes that produce a visible background fill, OR the container div has `bg-*` / `rounded-full` / `shadow-*` classes wrapping the icons, OR the closed-state `translateX` is absent or incorrect so the widget is fully on-screen instead of half-hidden.

**Formal Specification:**
```
FUNCTION isBugCondition_ContactBubble(context)
  INPUT: context = {
    viewport: "mobile" | "desktop",
    locale:   "ar" | "en",
    open:     boolean,
    renderedHTML: string
  }
  OUTPUT: boolean

  IF context.viewport ≠ "mobile" THEN RETURN false

  triggerHasBackground   ← renderedHTML contains bg-* on the trigger <button>
  subActionsHaveBackground ← renderedHTML contains bg-* on either sub-action <a>
  containerHasBackground ← renderedHTML contains bg-* on the mobile wrapper <div>
  closedOffsetMissing    ← open=false AND translateX not applied to sliding container

  RETURN triggerHasBackground
      OR subActionsHaveBackground
      OR containerHasBackground
      OR closedOffsetMissing
END FUNCTION
```

#### Examples

| Scenario | Buggy behavior | Expected behavior |
|----------|---------------|-------------------|
| Mobile, RTL, closed | Trigger rendered as `bg-[#25D366]` filled circle, fully visible at bottom-right | Bare `add_comment` icon, right-0, `translateX(50%)` — half-hidden off right edge |
| Mobile, LTR, closed | Trigger rendered with `bg-primary` fill, visible bottom-left | Bare icon, left-0, `translateX(-50%)` — half-hidden off left edge |
| Mobile, RTL, open | Sub-action anchors have `bg-[#25D366]` and `bg-primary` fills | Bare WhatsApp SVG (color `#25D366`) and bare Call icon (color `text-primary`), no backgrounds |
| Mobile, open, tap sub-action | `setOpen(false)` absent in some branches — panel stays open | `setOpen(false)` called in both WA and Call `onClick`, panel collapses |
| Desktop, any state | (not a bug) | Desktop green FAB unchanged |

---

### Bug 2 — Service Image Fallback

#### Bug Condition

The bug manifests when a service card's image URL is either missing from `serviceImageMap` (producing `src={undefined}`) or the network fetch for the URL returns a non-2xx status.

**Formal Specification:**
```
FUNCTION isBugCondition_ServiceImage(props)
  INPUT: props = { src: string | undefined, networkStatus: number | "pending" }
  OUTPUT: boolean

  RETURN props.src = undefined
      OR (props.networkStatus ≠ undefined AND props.networkStatus ≠ 200)
END FUNCTION
```

#### Examples

| Scenario | Buggy behavior | Expected behavior |
|----------|---------------|-------------------|
| `serviceImageMap["curtain-wall"]` missing key, `src=undefined` | Browser default broken-image icon | Branded placeholder: `bg-surface-container-low` + centered service Material Symbol in `text-primary` |
| Unsplash URL returns 404 | Broken-image browser slot | Same branded placeholder |
| Network offline | Grey broken-image slot | Same branded placeholder |
| Image loads successfully | (not a bug) | Full-bleed `<img>` with `object-cover group-hover:scale-*` unchanged |

---

## Expected Behavior

### Preservation Requirements — Bug 1

**Unchanged Behaviors:**
- Desktop `md:flex` FAB (`bg-[#25D366]` green WhatsApp circle at `bottom-6`, locale-aware `left-6` / `right-6`) must be pixel-identical before and after the fix.
- `ContactBubble` returns `null` on `/portal` and `/request-quote` paths — unchanged.
- `trackEvent("click_whatsapp", { location: "floating_button" })` on the desktop FAB click — unchanged.
- `trackEvent("click_whatsapp", { location: "mobile_bubble" })` on mobile WA sub-action tap — unchanged.
- `trackEvent("click_call", { location: "mobile_bubble" })` on mobile Call sub-action tap — unchanged.
- `aria-expanded`, `aria-label`, and `tabIndex` attributes on interactive elements — unchanged.
- The outside-click `useEffect` that calls `setOpen(false)` — unchanged.

**Scope:** Any code path that does NOT involve the `md:hidden` mobile panel's button/icon styling or the closed-state translate offset is unaffected.

### Preservation Requirements — Bug 2

**Unchanged Behaviors:**
- `<img>` with successfully loaded URL renders full-bleed with `object-cover` and `group-hover:scale-105` / `group-hover:scale-110` — unchanged.
- Service title, description, benefits, applications, CTAs, and structural layout of cards — unchanged.
- `serviceIconMap` usage for the content area icon (in `services-overview.tsx`) — unchanged.
- Services page alternating image/content grid layout and overlay gradient — unchanged.

**Scope:** All code paths where `imgError` is `false` and the `<img>` loads successfully produce identical output to the unfixed code.

---

## Hypothesized Root Cause

### Bug 1 — ContactBubble

1. **Residual FAB classes on trigger button**: The trigger `<button>` previously used classes like `bg-[#25D366] rounded-full shadow-lg size-14 flex items-center justify-center` (full FAB style). The fix must strip all `bg-*`, `rounded-*`, `shadow-*`, and container-wrapper markup from the mobile button, leaving only layout and icon color classes.

2. **Missing or incorrect `translateX` on the sliding container**: The closed state must apply `translateX(50%)` (RTL) or `translateX(-50%)` (LTR) as an inline `style` on the sliding container div, not as a Tailwind class (Tailwind cannot compose these values with the directional condition at runtime). If the style block is absent the widget sits fully on-screen.

3. **Sub-action anchors styled as filled buttons**: `<a>` tags for WhatsApp and Call had explicit `bg-[#25D366]` / `bg-primary` + `rounded-full` classes. These must be removed. Color is preserved only via `text-[#25D366]` on the SVG path and `text-primary` on the Call icon.

4. **`setOpen(false)` not called on sub-action tap**: Some branches of the `onClick` handlers on sub-action anchors were missing the `setOpen(false)` call, leaving the panel expanded after the user navigates to WA or phone.

### Bug 2 — Service Image Fallback

1. **No `onError` handler on `<img>`**: Native `<img>` fires `onerror` on load failure. Without a handler, React never knows to swap the element.

2. **No guard for `src={undefined}`**: `serviceImageMap[item.id]` returns `undefined` when the id is not a key. Passing `undefined` to `src` suppresses the `onError` event in some browsers but still shows a broken slot. The fix must treat `src == null` as an immediate fallback trigger.

3. **`ServicesOverview` is a Server Component**: It uses `async/await` with `next-intl` server APIs. State cannot live directly in it. The fix extracts the image-with-fallback rendering into a new `"use client"` sub-component (`ServiceCardImage`) that owns the `imgError` state. The parent server component passes `src` and `icon` as props.

4. **`services/page.tsx` is also a Server Component**: Same solution — extract a `"use client"` `ServicePageImage` component (or reuse a shared `ServiceImageWithFallback`) that wraps the `<img>` + placeholder logic.

---

## Correctness Properties

Property 1: Bug Condition — Mobile Bare Icon, Half-Hidden

_For any_ `context` where `isBugCondition_ContactBubble(context)` returns `true` (i.e., mobile viewport with background-styled trigger/sub-actions or missing translate offset), the fixed `ContactBubble` SHALL render: (a) a trigger `<button>` with no `bg-*`, `shadow-*`, or `rounded-*` classes; (b) the sliding container with `style={{ transform: open ? "translateX(0)" : isRTL ? "translateX(50%)" : "translateX(-50%)" }}`; (c) sub-action `<a>` elements with no `bg-*` or `rounded-*` classes; (d) `setOpen(false)` called inside both sub-action `onClick` handlers.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

Property 2: Preservation — Desktop FAB Unchanged

_For any_ `context` where `isBugCondition_ContactBubble(context)` returns `false` (i.e., desktop viewport), the fixed `ContactBubble` SHALL produce the exact same rendered output as the original `ContactBubble`, preserving the green WhatsApp circle FAB, its positioning, analytics calls, visibility rules, and accessibility attributes.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.8**

Property 3: Bug Condition — Service Image Fallback Shown

_For any_ service `props` where `isBugCondition_ServiceImage(props)` returns `true` (i.e., `src` is `undefined` or network fetch fails), the fixed service card SHALL render a placeholder `div` with `className` containing `bg-surface-container-low` and a child `<span className="material-symbols-outlined">` in `text-primary`, with no browser broken-image icon visible.

**Validates: Requirements 2.7, 2.8**

Property 4: Preservation — Successful Image Unchanged

_For any_ service `props` where `isBugCondition_ServiceImage(props)` returns `false` (i.e., `src` is a valid URL that loads successfully), the fixed service card SHALL render the `<img>` element with identical `src`, `alt`, and `className` attributes to the original, preserving `object-cover` and `group-hover:scale-*` behavior.

**Validates: Requirements 3.6, 3.7**

---

## Fix Implementation

### Bug 1 — `src/shared/components/layout/contact-bubble.tsx`

**No new files needed.** All changes are within the existing `ContactBubble` function.

**Specific Changes:**

1. **Trigger button — strip all FAB classes**: Remove any `bg-*`, `rounded-full`, `shadow-*`, `size-14` from the trigger `<button>`. Keep only: `flex size-12 items-center justify-center text-primary drop-shadow-lg active:scale-90 transition-transform duration-200`. The `drop-shadow-lg` is on the icon element via CSS filter, not a box-shadow on the button — this is acceptable as it creates no visual container.

2. **Sub-action anchors — strip background classes**: Both the WhatsApp `<a>` and Call `<a>` must have no `bg-*`, `border`, `rounded-*`, or `shadow-*`. They keep `flex size-12 items-center justify-center` for tap target sizing, plus their color classes (`text-[#25D366]`, `text-primary`) and the staggered animation inline styles.

3. **Sliding container — verify translate logic**: The container `<div>` directly inside the `md:hidden` wrapper must have the inline style:
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
   No `bg-*` or any other visual class on this container div.

4. **`setOpen(false)` in both sub-action handlers**: Confirm both `onClick` handlers call `setOpen(false)`. The WhatsApp handler must have it. The Call handler must have it.

5. **Trigger icon visibility when open**: When `open === true` the trigger `<button>` must be visually hidden but remain in the DOM for layout stability:
   ```tsx
   style={{
     opacity: open ? 0 : 1,
     pointerEvents: open ? "none" : "auto",
     transition: "opacity 200ms ease",
   }}
   ```

---

### Bug 2a — `src/features/home/components/services-overview.tsx`

**New client sub-component `ServiceCardImage`** added to the same file (or to a shared location):

```tsx
"use client";
// Extracted client component — owns the imgError state
interface ServiceCardImageProps {
  src: string | undefined;
  alt: string;
  icon: string; // Material Symbol name, e.g. "architecture"
}
function ServiceCardImage({ src, alt, icon }: ServiceCardImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f3f3fb]">
        <span
          className="material-symbols-outlined text-[#002868]"
          style={{ fontSize: "64px", fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
  );
}
```

The parent `ServicesOverview` server component replaces the existing `<img>` with `<ServiceCardImage src={img} alt={item.title} icon={icon} />` inside the card's image wrapper div.

---

### Bug 2b — `src/app/[locale]/services/page.tsx`

**New client sub-component `ServicePageImage`** extracted (either inline in the file with `"use client"` directive on a separate component, or into `src/shared/components/ui/service-image-with-fallback.tsx`):

```tsx
"use client";
interface ServicePageImageProps {
  src: string | undefined;
  alt: string;
  icon: string; // Material Symbol name for this service
}
function ServicePageImage({ src, alt, icon }: ServicePageImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#f3f3fb]">
        <span
          className="material-symbols-outlined text-[#002868]"
          style={{ fontSize: "80px", fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}
```

The page component needs a mapping from `service.id` (numeric string `"1"`, `"2"`, `"3"`) to Material Symbol names. This mapping lives inside `services/page.tsx`:

```tsx
const serviceIconMap: Record<string, string> = {
  "1": "architecture",    // aluminum-works
  "2": "window",          // glass-works
  "3": "format_shapes",   // steel-works
};
```

The existing `<img>` inside the services page's image column is replaced with:
```tsx
<ServicePageImage
  src={service.image}
  alt={service.title}
  icon={serviceIconMap[service.id] ?? "construction"}
/>
```

The surrounding `<div className="relative h-72 lg:h-auto min-h-[420px] overflow-hidden ...">` and the gradient overlay `<div>` remain completely unchanged.

---

## Testing Strategy

### Validation Approach

The strategy follows two phases: (1) **Exploratory** — run tests on the *unfixed* code to confirm and locate the bug; (2) **Fix + Preservation** — run tests on the *fixed* code to confirm correct behavior and no regressions.

---

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples on the UNFIXED code to confirm the root cause analysis and decide whether to re-hypothesize.

**Test Plan — Bug 1**: Render `ContactBubble` in a mobile viewport (JSDOM with `window.innerWidth = 375`), for both `locale="ar"` and `locale="en"`, in both `open=false` and `open=true` states. Assert on the rendered DOM.

**Test Cases**:
1. **RTL closed — FAB background present (fails on unfixed)**: Assert trigger `<button>` has no `bg-*` class → expect FAIL (finds `bg-[#25D366]` or `bg-primary`).
2. **RTL closed — translate offset missing (fails on unfixed)**: Assert sliding container has inline `transform: translateX(50%)` → expect FAIL.
3. **LTR closed — translate offset missing (fails on unfixed)**: Assert `transform: translateX(-50%)` → expect FAIL.
4. **RTL open — sub-action background present (fails on unfixed)**: Assert WhatsApp `<a>` has no `bg-*` class → expect FAIL.
5. **Mobile WA tap — panel stays open (fails on unfixed)**: Simulate click on WA anchor, assert `aria-expanded="false"` → expect FAIL if `setOpen(false)` is missing.

**Expected Counterexamples**: Class `bg-[#25D366]` found on trigger button; missing `transform` style on sliding container; `open` state remains `true` after sub-action click.

**Test Plan — Bug 2**: Render `ServiceCardImage` (once extracted) with `src={undefined}` and with `src="https://broken.url/img.jpg"` (mocked to fire `onError`). Assert placeholder is shown.

**Test Cases**:
1. **Undefined src (fails on unfixed)**: Pass `src={undefined}` → assert placeholder `div` rendered, no `<img>` → expect FAIL (only `<img src={undefined}>` found).
2. **onError fires (fails on unfixed)**: Mock `img.onerror`, assert placeholder shown after error → expect FAIL (no `onError` handler in original).

---

### Fix Checking

**Goal**: After applying the fix, verify that for all inputs where the bug condition holds, the correct behavior is observed.

**Pseudocode — Bug 1:**
```
FOR ALL context WHERE isBugCondition_ContactBubble(context) DO
  tree ← render(ContactBubble, context)
  triggerButton ← tree.find("button[aria-expanded]")
  ASSERT NOT classContains(triggerButton, "bg-")
  ASSERT NOT classContains(triggerButton, "rounded-full")
  ASSERT NOT classContains(triggerButton, "shadow-")
  slidingContainer ← tree.find("[data-testid='mobile-slider']")  // or identified by structure
  IF context.open = false THEN
    ASSERT slidingContainer.style.transform = (context.isRTL ? "translateX(50%)" : "translateX(-50%)")
  ELSE
    ASSERT slidingContainer.style.transform = "translateX(0)"
  waAction ← tree.find("a[aria-label*='WhatsApp']")
  callAction ← tree.find("a[href^='tel:']")
  ASSERT NOT classContains(waAction, "bg-")
  ASSERT NOT classContains(callAction, "bg-")
  // Simulate sub-action click, assert setOpen(false) fired
  fireEvent.click(waAction)
  ASSERT tree.find("button[aria-expanded='false']") exists
END FOR
```

**Pseudocode — Bug 2:**
```
FOR ALL service WHERE isBugCondition_ServiceImage(service) DO
  tree ← render(ServiceCardImage, { src: service.image, alt: service.title, icon: service.icon })
  ASSERT tree.find("img") = null    // no broken <img>
  placeholder ← tree.find(".bg-\\[\\#f3f3fb\\]") // or by role/test-id
  ASSERT placeholder exists
  iconSpan ← placeholder.find(".material-symbols-outlined")
  ASSERT iconSpan exists AND iconSpan.className includes "text-[#002868]"
END FOR
```

---

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed code produces identical output to the original.

**Pseudocode — Bug 1 (Desktop):**
```
FOR ALL context WHERE context.viewport = "desktop" DO
  ASSERT render(ContactBubble_original, context).html
       = render(ContactBubble_fixed, context).html
END FOR
```

**Pseudocode — Bug 2 (Successful image load):**
```
FOR ALL service WHERE service.image ≠ undefined AND networkOK(service.image) DO
  original ← render(ServiceCard_original, service)
  fixed    ← render(ServiceCard_fixed, service)
  ASSERT original.find("img").outerHTML = fixed.find("img").outerHTML
END FOR
```

**Testing Approach**: Property-based testing (fast-check) is recommended for the preservation side because:
- It generates many random service objects with valid URLs, catching unexpected regressions across varied data.
- It confirms the image `className` (including `group-hover:*` transitions) is preserved for all non-buggy inputs.
- It verifies the desktop FAB renders identically across all locale/path combinations.

---

### Unit Tests

- Render `ContactBubble` at `window.innerWidth=375` (mobile): assert no `bg-*` on trigger button in both `open=false` and `open=true`.
- Render `ContactBubble` at `window.innerWidth=375`: assert `translateX(50%)` for `locale="ar"`, `translateX(-50%)` for `locale="en"` when `open=false`.
- Click WhatsApp sub-action: assert `setOpen(false)` fires (check `aria-expanded="false"`).
- Click Call sub-action: assert `setOpen(false)` fires.
- Render `ContactBubble` at `window.innerWidth=1024` (desktop): assert `md:hidden` panel is not visible, desktop `<a>` is present with `bg-[#25D366]`.
- Render `ServiceCardImage` with `src={undefined}`: assert placeholder shown, no `<img>`.
- Render `ServiceCardImage` with valid `src`, then fire `onError`: assert placeholder shown.
- Render `ServiceCardImage` with valid `src`, no error: assert `<img>` rendered with correct `className`, no placeholder.

### Property-Based Tests

- **PBT — ContactBubble desktop preservation**: Generate arbitrary `{ locale: "ar" | "en", open: boolean, pathname: string }`. For all inputs the desktop `<a>` subtree must contain `bg-[#25D366]` and the mobile `div` must have class `md:hidden`. (Corresponds to Property 2.)
- **PBT — Service image fallback**: Generate arbitrary `{ src: string | undefined, icon: string }`. For any `src` that is `undefined` or any simulated `onError`, the rendered tree must contain the placeholder `div` with `bg-[#f3f3fb]` and the icon span. (Corresponds to Property 3.)
- **PBT — Service image preservation**: Generate arbitrary valid-URL strings (non-empty, non-undefined). For all such inputs with no `onError`, the rendered tree must contain an `<img>` with `src` equal to input and `className` including `object-cover`. (Corresponds to Property 4.)

### Integration Tests

- Load the home page at `/ar` on a 375 px viewport (Playwright / Cypress): verify the contact bubble is partially off the right edge of the screen, no visible background fill.
- Tap the trigger icon: verify the bubble slides fully on screen and two bare icons appear.
- Tap the WhatsApp icon: verify the panel collapses and the trigger half-hides again.
- Load `/en` home page on mobile: verify the bubble is on the left edge, half-hidden.
- Load `/ar` on desktop (1280 px): verify green WhatsApp FAB is at bottom-left, contact bubble mobile panel is hidden.
- Load the services page `/ar/services` with network throttled to offline: verify all three service cards show the branded placeholder (blue icon on `#F3F3FB` background), no broken-image slots.
- Load the home page `/ar` with network offline: verify `ServicesOverview` service cards show the branded placeholder.
- Load `/ar/services` with network online: verify service images load with `object-cover` transition, no placeholder visible.
