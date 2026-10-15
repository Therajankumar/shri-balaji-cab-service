# Shri Balaji Faridabad Cab Service

Single-page marketing website for Shri Balaji Faridabad Cab Service, built with React 19, Vite, Tailwind CSS v4, Framer Motion and React Icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional – see "Inquiry form" below
npm run dev                  # http://localhost:5173
npm run build                # production build in dist/
npm run lint
```

## Project structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Renders the Home page
├── index.css             # Tailwind import + global styles
├── pages/Home.jsx        # Composes all sections in order
├── lib/inquiry.js        # Inquiry form logic: validation, EmailJS sending, WhatsApp link
└── components/           # Page sections (see below)
```

## Components

| Component | Functionality |
|---|---|
| `Navbar` | Fixed top header with logo, anchor links (Home, Services, Fleet, Contact), "Book Now" call button and a mobile hamburger menu. |
| `Hero` | Full-screen landing section (`#home`) with business name, service summary, Call Now (`tel:`) and WhatsApp buttons, and an animated car image. |
| `HeroStats` | Four animated stat cards (1000+ customers, 5+ vehicle types, 24×7 support, All India permit). |
| `Services` | Service cards (`#services`): Airport pickup/drop, Local rides, Outstation trips, Safe & reliable service. |
| `Fleet` | Vehicle cards (`#fleet`): Dzire, Ertiga, Innova Crysta, Kia Carens, Tempo Traveller – each with seating, features and a "Book Now" call button. |
| `WhyChooseUs` | Four feature highlights: Safe & trusted, 24×7, Affordable pricing, All India permit. |
| `BookingCTA` | Call-to-action banner with Call Now and WhatsApp buttons. |
| `Testimonials` | Customer review cards with 5-star ratings. |
| `Contact` | Contact details (phones, emails, service area, hours) and the **inquiry form** (`#contact`). |
| `Footer` | Logo, quick links, service list, contact info, credits and a scroll-to-top button. |
| `FloatingCall` | Floating WhatsApp and Call buttons, always visible in the bottom-right corner. |
| `Button` | Reusable link-button (primary/outline variants) – currently unused. |
| `src/Test.jsx` | Scratch test component – not used by the app. |

## Inquiry form (backend)

The site is a static frontend. The contact form is wired up as follows:

1. **Validation** – name, a valid Indian mobile number, and trip details are required; email is optional but validated.
2. **Email delivery via [EmailJS](https://www.emailjs.com/)** – when the `VITE_EMAILJS_*` variables are set, the inquiry is emailed to the business with no server needed.
3. **WhatsApp fallback** – when EmailJS isn't configured, the form opens WhatsApp (+91 9229129633) with the inquiry pre-filled. If EmailJS fails, the user gets a WhatsApp link and the phone number instead.

### Setting up EmailJS

1. Create a free account at https://dashboard.emailjs.com.
2. **Email Services** → add a service (e.g. Gmail with `shribalajicabservices.fbd@gmail.com`) → copy the **Service ID**.
3. **Email Templates** → create a template using these variables:
   `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{submitted_at}}` (set *Reply To* to `{{reply_to}}`) → copy the **Template ID**.
4. **Account → General** → copy the **Public Key**.
5. Put the values in `.env.local` (or in your hosting provider's environment variables, e.g. Vercel/Netlify) and rebuild:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
```
