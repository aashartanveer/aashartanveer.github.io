// ============================================================
// Live prices from Google Sheets
// The sheet is published as CSV (File > Share > Publish to web).
// Rows: key,value  e.g.  starter,199
// If the URL is empty or the fetch fails, the prices hard-coded
// in the HTML remain as fallback.
// ============================================================
const PRICES_SHEET_CSV = ""; // <- paste published Google Sheet CSV URL here

if (PRICES_SHEET_CSV) {
  fetch(PRICES_SHEET_CSV)
    .then(r => r.text())
    .then(txt => {
      const prices = {};
      txt.trim().split(/\r?\n/).forEach(line => {
        const [k, v] = line.split(",");
        if (k && v && !isNaN(parseFloat(v))) {
          prices[k.trim().toLowerCase()] = v.trim();
        }
      });

      // Any element tagged data-price="starter|growth|dedicated"
      document.querySelectorAll("[data-price]").forEach(el => {
        const key = el.getAttribute("data-price");
        if (prices[key]) el.textContent = prices[key];
      });

      // Contact page package dropdown
      const planSelect = document.getElementById("plan");
      if (planSelect) {
        const labels = {
          "starter": ["Starter", "starter"],
          "growth": ["Growth", "growth"],
          "dedicated-sdr": ["Dedicated SDR", "dedicated"]
        };
        Array.from(planSelect.options).forEach(o => {
          const meta = labels[o.value];
          if (meta && prices[meta[1]]) {
            o.textContent = meta[0] + " — $" + prices[meta[1]] + "/mo";
          }
        });
      }
    })
    .catch(() => { /* keep HTML fallback prices */ });
}
