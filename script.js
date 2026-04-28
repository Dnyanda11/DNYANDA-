/* =============================================
   DNYANDA GIRAWALE — PORTFOLIO JS
   ============================================= */

// ---- TYPED ROLE ----
const roles = [
    "Full Stack Developer",
    "React.js Enthusiast",
    "UI/UX Designer",
    "Problem Solver",
    "Open to Opportunities",
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;
  const typedEl = document.getElementById("typed-role");
  
  function typeRole() {
    const current = roles[roleIndex];
    if (deleting) {
      typedEl.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
    }
    setTimeout(typeRole, deleting ? 60 : 90);
  }
  typeRole();
  
  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  let mx = 0, my = 0, fx = 0, fy = 0;
  
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });
  
  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) *.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animFollower);
  }
  animFollower();
  
  document.querySelectorAll("a, button, .tech-tag").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
      follower.style.transform = "translate(-50%,-50%) scale(0.5)";
      follower.style.opacity = "0.15";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.opacity = "0.4";
    });
  });
  
  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
  
  // ---- NAV MOBILE TOGGLE ----
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = navToggle.querySelectorAll("span");
    spans.forEach(s => s.classList.toggle("active"));
  });
  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
  
  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
  
  // ---- REVEAL ON SCROLL ----
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
          // Animate skill bars when visible
          const fills = entry.target.querySelectorAll(".skill-fill");
          fills.forEach(f => f.classList.add("animate"));
        }, 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));
  
  // Stagger sibling reveals
  document.querySelectorAll(".skills-grid, .projects-grid, .achievements-grid, .timeline").forEach(grid => {
    const children = grid.querySelectorAll(".reveal");
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
  
  // ---- BACK TO TOP ----
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  // ---- CONTACT FORM ----
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      success.classList.add("show");
      form.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        success.classList.remove("show");
      }, 4000);
    }, 1200);
  });
  
  // ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
  
  // ---- SKILL BARS — ALSO TRIGGER ON INITIAL LOAD IF IN VIEW ----
  window.addEventListener("load", () => {
    document.querySelectorAll(".reveal").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("visible");
        el.querySelectorAll(".skill-fill").forEach(f => f.classList.add("animate"));
      }
    });
  });
  
  // ---- NAV TOGGLE ANIMATION ----
  navToggle.addEventListener("click", () => {
    const [s1, s2, s3] = navToggle.querySelectorAll("span");
    if (navLinks.classList.contains("open")) {
      s1.style.transform = "rotate(45deg) translate(5px, 5px)";
      s2.style.opacity = "0";
      s3.style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      s1.style.transform = "";
      s2.style.opacity = "";
      s3.style.transform = "";
    }
  });