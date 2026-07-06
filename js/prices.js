// ============================================================
// Live prices from Google Sheets
// The sheet is published as CSV (File > Share > Publish to web).
// Rows: key,value  e.g.  starter,199
// If the URL is empty or the fetch fails, the prices hard-coded
// in the HTML remain as fallback.
// ============================================================
const PRICES_SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqMMu2nv8Bw2C3KGk3CMLr0w9lFZDfdn2s4pVbOtVsMvxt18rUdbPoSieAB4FCaU_5Q_YjgsgM5rWL/pub?gid=0&single=true&output=csv";

if (PRICES_SHEET_CSV) {
  fetch(PRICES_SHEET_CSV)
    .then(r => r.text())
    .then(txt => {
      // Find any known plan key anywhere in a row; the next cell is its price.
      const KEYS = ["starter", "growth", "dedicated"];
      const prices = {};
      txt.trim().split(/\r?\n/).forEach(line => {
        const cells = line.split(",").map(c => c.trim().replace(/^"|"$/g, ""));
        for (let i = 0; i < cells.length - 1; i++) {
          const key = cells[i].toLowerCase();
          const val = cells[i + 1].replace(/[^0-9.]/g, "");
          if (KEYS.includes(key) && val && !isNaN(parseFloat(val))) {
            prices[key] = val;
          }
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
          "dedicated-sdr": ["Dedicated BDR", "dedicated"]
        };
        Array.from(planSelect.options).forEach(o => {
          const meta = labels[o.value];
          if (meta && prices[meta[1]]) {
            o.textContent = meta[0] + " · $" + prices[meta[1]] + "/mo";
          }
        });
      }
    })
    .catch(() => { /* keep HTML fallback prices */ });
}
