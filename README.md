# Shri Balaji Faridabad Cab Service

Single-page marketing website for Shri Balaji Faridabad Cab Service, built with React 19, Vite, Tailwind CSS v4, Framer Motion and React Icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional – see "Booking form" below
npm run dev                  # http://localhost:5173
npm run build                # production build in dist/
npm run lint
```

## Project structure

```
src/
├── main.jsx / App.jsx        # Entry point; App wraps the page in BookingProvider
├── index.css                 # Tailwind import + design tokens (colors, font)
├── config/site.js            # Business details (name, phones, emails, WhatsApp) + link helpers
├── data/content.js           # All page content: nav, services, fleet, stats, features, reviews
├── context/                  # BookingProvider / useBooking – shared "start a booking" action
├── hooks/                    # useBookingForm, useActiveSection, useScrolled
├── lib/inquiry.js            # Validation, EmailJS sending, WhatsApp message builder
├── pages/Home.jsx            # Composes all sections in order
└── components/
    ├── ui/                   # Reusable building blocks (see below)
    ├── booking/BookingForm   # Booking/inquiry form used in Hero and Contact
    └── *.jsx                 # Page sections
```

To change phone numbers, emails, vehicles, services, reviews etc. edit **`src/config/site.js`** or **`src/data/content.js`** – no component changes needed.

## Images & performance

Images are stored as small, compressed **WebP** files in several widths, so phones download a small version and big screens a sharp one.

- `src/assets/images/` – site images, e.g. `fleet/dezire-480w.webp` and `fleet/dezire-768w.webp`.
  Use them with `responsiveImage("fleet/dezire")` and the `<Img>` component (`src/components/ui/Img.jsx`).
- `public/images/hero-car-*.webp` – the hero background, preloaded in `index.html` so it shows instantly.
- `design/originals/` – the original full-size PNG artwork (not used by the site; keep for future edits).

**Adding a new image:** export it as WebP in two widths (e.g. 480px and 768px wide, quality ~75),
name the files `my-image-480w.webp` / `my-image-768w.webp`, put them in `src/assets/images/`, then use
`responsiveImage("my-image")`. Avoid putting large PNG/JPG files directly in `src/`.

The Inter font is self-hosted (`@fontsource-variable/inter`) instead of loaded from Google Fonts, and
animations use Framer Motion's `LazyMotion` to keep the JavaScript small.

## Design system

Colors are defined once as Tailwind theme tokens in `src/index.css` and used as classes:
`bg-ink` / `bg-ink-soft` (page backgrounds), `bg-surface` / `bg-surface-raised` (cards, inputs),
`bg-brand` / `text-brand-light` (yellow accent), `border-line` (subtle borders), `bg-paper` (light sections).

Fonts: **Sora** for headings (`h1`–`h3`, or the `font-display` class) and **Inter** for body text.

Yellow is reserved for the main actions (Call Now, Book a Cab, Request Booking). Secondary buttons use the `outline` or `ghost` variant and icons use the soft `IconBadge` style, so the important buttons stand out.

### Reusable UI components (`src/components/ui`)

| Component | Purpose |
|---|---|
| `Section` | Section wrapper with consistent padding, max width and `base` / `alt` / `light` background tone. |
| `SectionHeading` | Eyebrow + title + description block used at the top of every section (`tone="light"` on light sections). |
| `Button` | Link or button with `primary`, `outline`, `whatsapp`, `ghost` variants and `sm`/`md`/`lg`/`icon` sizes. |
| `Card` | Standard surface card; `interactive` adds the hover lift/highlight, `tone="light"` for light sections. |
| `Reveal` | Shared fade-up scroll animation (pass `index` for staggering). |
| `IconBadge` | Icon badge: `soft` (default, tinted) or `solid` variant, `circle` or `square` shape. |
| `Badge` | Small pill label shown above headings. |
| `Img` | Responsive, lazy-loaded image (see "Images & performance"). |
| `CheckItem` | Check-marked list item. |
| `FormField` + `inputClass` | Labelled form field with error message and consistent input styling. |
| `Logo` | Brand logo mark + name, used in Navbar and Footer. |

## Page sections

| Component | Functionality |
|---|---|
| `Navbar` | Fixed header that turns solid on scroll, highlights the active section, shows the phone number and a "Book a Cab" button; mobile menu. |
| `Hero` | Headline, Call/WhatsApp buttons, highlights and the main **booking form** (`#book`). |
| `HeroStats` | Animated stat cards. |
| `Services` | Icon-based service cards with key points; "Book … Ride" pre-selects the trip type in the booking form. |
| `Fleet` | Vehicle cards with category, seats and specs; "Book Now" pre-selects the vehicle in the booking form. |
| `WhyChooseUs` | Feature highlights. |
| `BookingCTA` | Call-to-action banner with Book Online / Call / WhatsApp. |
| `Testimonials` | Customer review cards on a light background (breaks up the dark page). |
| `Contact` | Clickable contact details and the full inquiry form (adds email + notes). |
| `Footer` | Logo, quick links, services, contact info, credits, back-to-top. |
| `FloatingCall` | Floating WhatsApp and Call buttons. |

## Booking form (backend)

The site is a static frontend. Booking requests work like this:

1. **Validation** – pickup location, name and a valid Indian mobile number are required; email is optional but validated.
2. **Email delivery via [EmailJS](https://www.emailjs.com/)** – when the `VITE_EMAILJS_*` variables are set, the request is emailed to the business with no server needed.
3. **WhatsApp fallback** – when EmailJS isn't configured, the form opens WhatsApp with the booking pre-filled. If EmailJS fails, the user gets a WhatsApp link and the phone number instead.

### Setting up EmailJS

1. Create a free account at https://dashboard.emailjs.com.
2. **Email Services** → add a service (e.g. Gmail with `shribalajicabservices.fbd@gmail.com`) → copy the **Service ID**.
3. **Email Templates** → create a template using these variables:
   `{{trip_type}}`, `{{pickup}}`, `{{drop}}`, `{{travel_date}}`, `{{travel_time}}`, `{{vehicle}}`, `{{from_name}}`, `{{phone}}`, `{{from_email}}`, `{{message}}`, `{{submitted_at}}` (set *Reply To* to `{{reply_to}}`) → copy the **Template ID**.
4. **Account → General** → copy the **Public Key**.
5. Put the values in `.env.local` (or in your hosting provider's environment variables, e.g. Vercel/Netlify) and rebuild:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
```
