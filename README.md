# Aashar Tanveer — B2B Lead Generation & SDR Services Website

Live URL (after publishing): **https://aashartanveer.github.io/**

## 🚀 How to go live (one-time, ~5 minutes)

1. Go to https://github.com/new (logged in as **aashartanveer**).
2. Repository name must be exactly: **`aashartanveer.github.io`** — this gives you the clean root URL.
3. Keep it **Public**, don't add a README, click **Create repository**.
4. Then in this folder run:
   ```
   git remote add origin https://github.com/aashartanveer/aashartanveer.github.io.git
   git push -u origin main
   ```
5. Wait 1–2 minutes → visit https://aashartanveer.github.io/

## 🔍 Getting on Google Search

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://aashartanveer.github.io/`
3. Verify (the "HTML tag" method: paste the meta tag they give you into `index.html` `<head>` and push).
4. Sitemaps → submit `sitemap.xml`
5. URL Inspection → paste the homepage URL → **Request Indexing** (do the same for the other 4 pages).

Google usually indexes within a few days to 2 weeks. The site already includes: meta descriptions, canonical URLs, Open Graph tags, JSON-LD structured data (Person + ProfessionalService), robots.txt and sitemap.xml.

## ✉️ Activating the contact form (important!)

The contact form uses FormSubmit (free). **The first time someone submits the form, FormSubmit sends an activation email to aashartanveer56@gmail.com — you must click the confirmation link once.** After that, every submission arrives in your Gmail automatically. Test it yourself after going live.

## 🖼️ Adding your photo

Put your professional photo in the `images/` folder as `profile.jpg`, then in `index.html` replace:

```html
<div class="avatar" id="avatar">AT</div>
```

with:

```html
<div class="avatar" id="avatar"><img src="images/profile.jpg" alt="Muhammad Aashar Tanveer"></div>
```

## ⭐ Adding real testimonials later

When you receive real Fiverr/Upwork reviews, ask Claude to add a testimonials section — paste the exact review text and the client's first name/country. Never invent reviews; fake testimonials can get the site penalized and destroy client trust.

## Pages

- `index.html` — Home (hero, stats, services, results, process, FAQ)
- `services.html` — All 8 services in detail
- `pricing.html` — Starter $199 / Growth $399 / Dedicated SDR $799 monthly packages
- `about.html` — Career timeline, certifications, education
- `contact.html` — Contact form + all channels
- `thanks.html` — Form thank-you page
