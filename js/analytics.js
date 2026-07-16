// ============================================================
// Google Analytics 4 + conversion event tracking
// Paste your GA4 Measurement ID (looks like G-XXXXXXXXXX) below.
// Until it is set, this file does nothing.
// ============================================================
const GA_ID = "G-JXHB2YR027";

if (GA_ID) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_ID);

  // Conversion-intent clicks
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a) return;
    const h = a.href || "";
    if (h.indexOf("wa.me") !== -1)             gtag("event", "whatsapp_click");
    else if (h.indexOf("fiverr.com") !== -1)   gtag("event", "fiverr_click");
    else if (h.indexOf("upwork.com") !== -1)   gtag("event", "upwork_click");
    else if (h.indexOf("linkedin.com") !== -1) gtag("event", "linkedin_click");
    else if (h.indexOf("mailto:") === 0)       gtag("event", "email_click");
    else if (h.indexOf("tel:") === 0)          gtag("event", "phone_click");
  });

  // Form submissions (contact form + checklist signup)
  document.querySelectorAll("form").forEach(f => {
    f.addEventListener("submit", () => {
      gtag("event", f.classList.contains("magnet-form") ? "checklist_signup" : "contact_form_submit");
    });
  });
}
