# Test Report – Shri Balaji Faridabad Cab Service

**Date:** 15 Oct 2026  **Version tested:** `main` @ `f810dda` (+ the fix in this PR)
**Result:** ✅ **All 106 tests pass** (67 unit + 39 functional). **1 bug found and fixed.**

| Suite | Tool | Tests | Passed | Failed |
|---|---|---|---|---|
| Unit tests | Vitest + React Testing Library | 67 | 67 | 0 |
| Functional (end-to-end) tests | Playwright (real browser) | 39 | 39 | 0 |
| **Total** | | **106** | **106** | **0** |

Unit test code coverage: **97.9 % of statements**, 95.1 % of branches, 87.3 % of functions.

---

## 1. What is the difference between the two kinds of tests?

- **Unit tests** check small pieces on their own, like the phone-number check or the WhatsApp message builder,
  plus individual components such as the booking form. They run in a simulated browser in about 3 seconds.
- **Functional (end-to-end) tests** build the real website, open it in a real Chrome browser (desktop and mobile
  phone sizes), and click around like a customer would: filling the booking form, using the menu, and so on.

## 2. How to run the tests

```bash
npm test               # unit tests
npm run test:coverage  # unit tests + coverage table
npm run test:e2e       # functional tests (builds the site, opens Chrome)
npm run test:all       # everything
```

---

## 3. Unit tests (67/67 passed)

| File | Tests | What is checked |
|---|---|---|
| `lib/inquiry.test.js` | 27 | Booking validation: required fields; 7 valid and 7 invalid phone formats; invalid emails. WhatsApp message contains every detail, skips empty fields and encodes special characters. Email (EmailJS) sends every field with sensible defaults. |
| `hooks/useBookingForm.test.js` | 5 | Form starts empty, blocks invalid submits, clears an error when the field is edited, falls back to WhatsApp, and "Book Now" pre-fill keeps what the user already typed. |
| `hooks/useBookingForm.email.test.js` | 2 | With email keys configured: a successful send shows a confirmation and resets the form; a failed send shows an error, keeps the user's input and offers WhatsApp. |
| `components/booking/BookingForm.test.jsx` | 7 | Trip-type tabs, airport placeholder, vehicle list (all 5 cars), no past dates, compact vs full form, validation messages, full submit flow, call link. |
| `components/ui/ui.test.jsx` | 7 | Button (link vs button, new tab for external links, submit/disabled), FormField label and error, Img lazy and priority loading, SectionHeading. |
| `pages/Home.test.jsx` | 7 | Every menu link has a section, exactly one `<h1>`, all cars and services render, Fleet and Service buttons pre-fill the hero form, mobile menu toggle, all phone/WhatsApp/email links point to the business. |
| `config/site.test.js` | 5 | Phone formatting, `tel:`, `mailto:` and WhatsApp link builders, phone numbers valid. |
| `lib/images.test.js` | 3 | Responsive image sizes sorted correctly, largest used as fallback, clear error for a missing image. |
| `data/content.test.js` | 4 | Content data is consistent: valid trip types, no duplicate names, every car has an image, seats and category, every service has an icon and 3 points. |

### Coverage

| Area | Statements | Notes |
|---|---|---|
| Business logic (`lib`, `config`, `data`) | 100 % | |
| UI components (`components/ui`) | 100 % | |
| Page sections (`components`) | 99.5 % | |
| Booking form | 92.2 % | Success and error messages are covered by the hook and functional tests instead |
| Hooks | 96.5 % | Scroll-position hooks are covered by the functional tests |
| `App.jsx` | 0 % | Only wraps providers; covered by the functional tests |

---

## 4. Functional tests (39/39 passed)

Each test runs on **Desktop Chrome** and on a **mobile phone** (Pixel 7), against the production build.
Email tests run against a second build that has test EmailJS keys; the email service is intercepted, so no real email is sent.

| Area | Test | Desktop | Mobile |
|---|---|---|---|
| **Page** | Correct page title, SEO description and headline | ✅ | ✅ |
| | No JavaScript or console errors while scrolling the whole page | ✅ | ✅ |
| | All sections visible | ✅ | ✅ |
| | Every image loads (none broken) and uses WebP | ✅ | ✅ |
| | First load under 800 KB *uncompressed* | ✅ | ✅ |
| | No sideways scrolling | ✅ | ✅ |
| | Floating Call / WhatsApp buttons have the right number | ✅ | ✅ |
| **Navigation** | Menu links scroll to the section and highlight it | ✅ | – |
| | Mobile hamburger menu opens, navigates and closes | – | ✅ |
| | Navbar turns solid after scrolling | ✅ | ✅ |
| | Back-to-top button is clickable and works | ✅ | ✅ |
| | Back-to-top not covered by floating buttons at 768, 1024, 1280, 1366 px | ✅ | – |
| **Booking (WhatsApp mode)** | Empty form shows the 3 required-field errors | ✅ | ✅ |
| | Invalid phone number rejected | ✅ | ✅ |
| | Valid booking opens WhatsApp with trip, pickup, drop, vehicle and phone | ✅ | ✅ |
| | Fleet "Book Now" scrolls to the form with that car selected | ✅ | ✅ |
| | "Book Outstation Ride" scrolls to the form with that trip type | ✅ | ✅ |
| | Contact-section form works, including email and notes | ✅ | ✅ |
| **Booking (Email mode)** | Successful send: confirmation shown, form cleared, correct data sent | ✅ | |
| | Failed send: error with WhatsApp and Call fallbacks, input kept | ✅ | |
| | Button shows "Sending..." and is disabled while waiting | ✅ | |

"–" = not applicable on that device (e.g. the desktop menu doesn't exist on mobile). These are the 6 "skipped" tests.

---

## 5. Bug found and fixed

### 🐞 Back-to-top button covered by the floating Call button
- **Where:** footer, on screens between about 768 px and 1340 px wide (tablets, most laptops).
- **What happened:** the floating yellow **Call** button sat exactly on top of the footer's **back-to-top** button,
  so clicking it started a phone call instead of scrolling up.
- **Fix:** the footer's bottom row now leaves room on the right for the floating buttons (`md:pr-20` in `Footer.jsx`).
- **Proof:** the new test *"back-to-top is not covered by floating buttons"* fails without the fix and passes with it,
  at 768, 1024, 1280 and 1366 px.

## 6. Observations (not bugs, worth knowing)

1. **Floating buttons overlap content on phones.** On mobile, the floating WhatsApp/Call buttons cover the right edge of
   some content as you scroll (for example form fields). This is normal for floating buttons, but a bottom bar
   (Call | WhatsApp | Book) would avoid it.
2. **Testimonials look like sample content.** Replace them with real customer reviews before going live.
3. **Email delivery isn't tested against the real EmailJS service.** The site's side is fully tested, but someone
   should send one real booking after adding the EmailJS keys, to confirm the email arrives.

## 7. Not covered by these tests
- Real browsers other than Chrome (Safari/iPhone, Firefox). Chrome covers most Indian users, but one manual check
  on an iPhone is recommended.
- Pixel-perfect visual comparisons (screenshots were checked by hand during development).
- A full accessibility audit (Lighthouse accessibility score is 95/100).
