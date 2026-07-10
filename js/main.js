// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

// Footer year
document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Sticky header state + scroll progress bar
const header = document.querySelector(".site-header");
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.appendChild(progress);

function onScroll() {
  if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progress.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// FAQ accordion
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(open => {
      open.classList.remove("open");
      open.querySelector(".faq-a").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Staggered reveal: children of grids animate one after another
document.querySelectorAll(".cards-grid, .steps-grid, .results-grid, .pricing-grid, .testi-grid").forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    if (child.classList.contains("reveal")) {
      child.style.transitionDelay = (i * 90) + "ms";
    }
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Animated counters: any element with data-count
const easeOut = t => 1 - Math.pow(1 - t, 3);
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      if (isNaN(target)) return;
      const duration = 1500;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = prefix + Math.round(target * easeOut(p)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.6 }
);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));
}

// Pre-select package on contact page from ?plan= query
const planParam = new URLSearchParams(window.location.search).get("plan");
if (planParam) {
  const planSelect = document.getElementById("plan");
  if (planSelect) planSelect.value = planParam;
}

// ============================================================
// Background FX: particle network (hero) + parallax shapes
// ============================================================
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Particle network: nodes connecting = pipeline being built ---
function initParticles(host) {
  const canvas = document.createElement("canvas");
  canvas.className = "fx-canvas";
  host.prepend(canvas);
  const ctx = canvas.getContext("2d");
  let w, h, pts;

  function build() {
    w = canvas.width = host.offsetWidth;
    h = canvas.height = host.offsetHeight;
    const count = w < 720 ? 32 : 68;
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.4
    }));
  }
  build();
  window.addEventListener("resize", build);

  let mouse = { x: -9999, y: -9999 };
  host.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
  host.addEventListener("mouseleave", () => { mouse = { x: -9999, y: -9999 }; });

  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(host);

  const LINK = 130, MOUSE_LINK = 170;
  (function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = "rgba(0, 194, 168, 0.5)";
      ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = "rgba(0, 194, 168, " + (0.16 * (1 - d2 / (LINK * LINK))).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const p = pts[i];
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md2 = mdx * mdx + mdy * mdy;
      if (md2 < MOUSE_LINK * MOUSE_LINK) {
        ctx.strokeStyle = "rgba(56, 189, 248, " + (0.28 * (1 - md2 / (MOUSE_LINK * MOUSE_LINK))).toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
  })();
}

// --- Parallax shapes: rings / glows / dot grids drifting on scroll ---
function initParallaxShapes() {
  const sections = document.querySelectorAll("section");
  const shapes = [];
  const make = (parent, cls, style, factor) => {
    const el = document.createElement("div");
    el.className = "bg-shape " + cls;
    Object.assign(el.style, style);
    el.dataset.pf = factor;
    parent.prepend(el);
    shapes.push(el);
  };
  sections.forEach((sec, i) => {
    sec.classList.add("has-bg-fx");
    if (i % 2 === 0) {
      make(sec, "ring",  { top: "10%",  right: "5%"   },  0.16);
      make(sec, "dots",  { bottom: "6%", left: "3%"   }, -0.10);
      make(sec, "blob",  { top: "40%",  left: "-120px"},  0.08);
    } else {
      make(sec, "blob",  { top: "12%",  left: "-100px"},  0.14);
      make(sec, "ring",  { bottom: "12%", right: "7%" }, -0.10);
      make(sec, "dots",  { top: "8%",   right: "20%"  },  0.06);
    }
  });

  let ticking = false;
  function update() {
    ticking = false;
    const mid = window.innerHeight / 2;
    for (const el of shapes) {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
      const f = parseFloat(el.dataset.pf);
      el.style.transform = "translateY(" + ((rect.top + rect.height / 2 - mid) * f).toFixed(1) + "px)";
    }
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

if (!reducedMotion) {
  document.querySelectorAll(".hero, .page-hero").forEach(initParticles);
  initParallaxShapes();
}
