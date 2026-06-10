# Bugfix Requirements Document

## Introduction

Two visual/functional bugs affect the Al-Fahad Contracting website. The first is in the `ContactBubble` component (`src/shared/components/layout/contact-bubble.tsx`): on mobile viewports the button renders with a styled container (rounded FAB with background fill and a card-like wrapper), when it should instead be a bare icon that is half-hidden off the screen edge, expanding into two icon-only sub-actions on tap with no backgrounds at all. The second bug is in the service cards on both the home page and the services page: images are referenced via Unsplash URLs using a plain `<img>` tag, which can fail or block when the URL returns an error (network issue, expired CDN token, or the `<img>` lacking a `src`), leaving a broken image slot with no fallback indicator to the user.

---

## Bug Analysis

### Current Behavior (Defect)

**Bug 1 — Floating Contact Button (Mobile)**

1.1 WHEN the page is viewed on a mobile viewport (`< 768 px`) THEN the system renders the contact bubble trigger as a solid filled circular FAB (with `bg-primary` or `bg-[#25D366]` background and drop-shadow) instead of a bare icon with no background.

1.2 WHEN the page is viewed on a mobile viewport in Arabic (RTL) locale THEN the system anchors the contact bubble container to the bottom-right corner at `bottom-6 right-*` fully on-screen, instead of placing it flush against the right edge with the icon half-hidden off-screen.

1.3 WHEN the page is viewed on a mobile viewport in English (LTR) locale THEN the system anchors the container to the bottom-right (or bottom-left) fully visible, instead of placing it flush against the left edge with the icon half-hidden off-screen.

1.4 WHEN the trigger icon is tapped and `open` becomes `true` THEN the system shows the WhatsApp and Call sub-actions as filled rounded buttons with background colors (`bg-[#25D366]`, `bg-primary`) instead of bare icons with no background.

1.5 WHEN a sub-action (WhatsApp or Call) is tapped THEN the system does not reliably collapse the panel back to the single trigger icon; the `setOpen(false)` call is missing from some branches.

**Bug 2 — Missing / Broken Service Images**

1.6 WHEN a service card is rendered (home page `ServicesOverview`, services list page, or individual service detail page) and the Unsplash `image` URL is unreachable or returns a non-2xx response THEN the system displays a broken image placeholder (browser default broken-image icon) with no branded fallback.

1.7 WHEN `services-overview.tsx` uses a hardcoded `serviceImageMap` that does not contain the `item.id` key THEN the `img` element receives `src={undefined}`, producing a broken image with no visual fallback.

---

### Expected Behavior (Correct)

**Bug 1 — Floating Contact Button (Mobile)**

2.1 WHEN the page is viewed on a mobile viewport (`< 768 px`) in RTL locale THEN the system SHALL render the trigger as a single bare icon (no background, no border, no shadow container) anchored to `right: 0` at a mid-page vertical position (`bottom-1/3`) with `translateX(50%)` so exactly half the icon is hidden off the right edge of the screen.

2.2 WHEN the page is viewed on a mobile viewport (`< 768 px`) in LTR locale THEN the system SHALL render the trigger as a single bare icon anchored to `left: 0` at a mid-page vertical position with `translateX(-50%)` so exactly half the icon is hidden off the left edge of the screen.

2.3 WHEN the trigger icon is tapped and `open` becomes `true` THEN the system SHALL smoothly animate the container to `translateX(0)` (fully on-screen) using a spring/cubic-bezier transition (`cubic-bezier(0.34,1.2,0.64,1)`, `300ms`) and reveal two bare icon sub-actions (WhatsApp SVG in `#25D366`, Call `material-symbols-outlined` in `text-primary`) with NO background, NO border, and NO shadow on the icon buttons themselves.

2.4 WHEN `open` is `true` THEN the system SHALL hide the trigger icon (opacity 0 / pointer-events none) and show only the two sub-action icons with staggered scale/opacity entrance animations.

2.5 WHEN a sub-action (WhatsApp or Call) is tapped THEN the system SHALL set `open` to `false`, causing the sub-actions to animate out and the trigger icon to reappear, all within a single smooth transition cycle.

2.6 WHEN the user taps outside the contact bubble container while `open` is `true` THEN the system SHALL close the panel and restore the half-hidden trigger state.

**Bug 2 — Missing / Broken Service Images**

2.7 WHEN a service card's `image` URL fails to load (network error, 404, or `src` is undefined) THEN the system SHALL display a branded fallback: a `bg-surface-container-low` placeholder tile containing the service icon (Material Symbol) centered in `text-primary`, so no broken-image icon is shown to the user.

2.8 WHEN `services-overview.tsx` references a `serviceImageMap` key that does not match a service `id` THEN the system SHALL fall back gracefully to the placeholder rather than passing `undefined` to `src`.

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the page is viewed on a desktop viewport (`≥ 768 px`) THEN the system SHALL CONTINUE TO render the desktop-only green WhatsApp circle FAB at `bottom-6` on the correct locale-aware side (left for RTL, right for LTR), unchanged.

3.2 WHEN the user is on `/[locale]/portal` or `/[locale]/request-quote` pages THEN the system SHALL CONTINUE TO hide the `ContactBubble` component entirely.

3.3 WHEN the user taps the desktop WhatsApp FAB THEN the system SHALL CONTINUE TO fire the `trackEvent("click_whatsapp", { location: "floating_button" })` analytics call.

3.4 WHEN the mobile trigger is tapped to open and the user taps the WhatsApp sub-action THEN the system SHALL CONTINUE TO fire `trackEvent("click_whatsapp", { location: "mobile_bubble" })`.

3.5 WHEN the mobile trigger is tapped to open and the user taps the Call sub-action THEN the system SHALL CONTINUE TO fire `trackEvent("click_call", { location: "mobile_bubble" })`.

3.6 WHEN service images are successfully loaded from their URLs THEN the system SHALL CONTINUE TO display them full-bleed with the existing `object-cover` and `group-hover:scale-105` / `group-hover:scale-110` transition intact.

3.7 WHEN the services page renders THEN the system SHALL CONTINUE TO display service content (title, description, benefits, applications, CTAs) correctly regardless of image load status.

3.8 WHEN the `ContactBubble` keyboard accessibility attributes are set (`aria-expanded`, `aria-label`, `tabIndex`) THEN the system SHALL CONTINUE TO set them correctly in both open and closed states.

---

## Bug Condition Derivation

### Bug 1 — Floating Contact Button

```pascal
FUNCTION isBugCondition_ContactBubble(context)
  INPUT: context = { viewport: "mobile" | "desktop", locale: "ar" | "en", open: boolean }
  OUTPUT: boolean

  // Bug triggers when mobile and the container has background styling
  // OR when anchor/translate values produce fully-visible rather than half-hidden state
  RETURN context.viewport = "mobile"
    AND (
      containerHasBackground(context) = true
      OR triggerOffsetIsNotHalfHidden(context) = true
      OR subActionsHaveBackground(context) = true
    )
END FUNCTION
```

**Fix-Checking Property:**
```pascal
FOR ALL context WHERE isBugCondition_ContactBubble(context) DO
  rendered ← renderContactBubble'(context)
  ASSERT rendered.triggerContainer.hasBackground = false
  ASSERT rendered.triggerContainer.offsetFromEdge = "50%"   // half-hidden
  ASSERT rendered.subActions.whatsapp.hasBackground = false
  ASSERT rendered.subActions.call.hasBackground = false
END FOR
```

**Preservation Property:**
```pascal
FOR ALL context WHERE NOT isBugCondition_ContactBubble(context) DO
  // i.e., desktop viewport
  ASSERT renderContactBubble(context) = renderContactBubble'(context)
END FOR
```

---

### Bug 2 — Service Images

```pascal
FUNCTION isBugCondition_ServiceImage(imageUrl)
  INPUT: imageUrl: string | undefined
  OUTPUT: boolean

  RETURN imageUrl = undefined
    OR networkFetch(imageUrl).status ≠ 200
END FUNCTION
```

**Fix-Checking Property:**
```pascal
FOR ALL service WHERE isBugCondition_ServiceImage(service.image) DO
  rendered ← renderServiceCard'(service)
  ASSERT rendered.imagePlaceholder.visible = true
  ASSERT rendered.imagePlaceholder.showsBrokenIcon = false
  ASSERT rendered.imagePlaceholder.containsServiceIcon = true
END FOR
```

**Preservation Property:**
```pascal
FOR ALL service WHERE NOT isBugCondition_ServiceImage(service.image) DO
  ASSERT renderServiceCard(service).imageElement = renderServiceCard'(service).imageElement
END FOR
```
