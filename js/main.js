const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));


(() => {
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  if (!burger || !navLinks) return;

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });


  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));
})();


(() => {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("#navLinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
})();


(() => {
  const form = $("#contactForm");
  if (!form) return;

  const msg = $("#formMsg");
  const name = $("#name");
  const email = $("#email");
  const message = $("#message");

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.classList.remove("show");
    msg.textContent = "";

    const n = name.value.trim();
    const em = email.value.trim();
    const m = message.value.trim();

    const errors = [];
    if (n.length < 2) errors.push("Моля, въведи име (поне 2 символа).");
    if (!isEmail(em)) errors.push("Моля, въведи валиден e-mail адрес.");
    if (m.length < 10) errors.push("Съобщението трябва да е поне 10 символа.");

    if (errors.length) {
      msg.textContent = errors.join(" ");
      msg.style.borderColor = "rgba(239,68,68,.35)";
      msg.style.background = "rgba(239,68,68,.12)";
      msg.classList.add("show");
      return;
    }

    // No backend: simulate success
    msg.textContent = "Благодарим! Съобщението е изпратено успешно. Ще се свържем с теб до 1 работен ден.";
    msg.style.borderColor = "rgba(34,197,94,.35)";
    msg.style.background = "rgba(34,197,94,.12)";
    msg.classList.add("show");
    form.reset();
  });
})();


(() => {
  const items = $$(".faq-item");
  if (!items.length) return;

  items.forEach(item => {
    const btn = $(".faq-q", item);
    if (!btn) return;

    btn.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();


(() => {
  const gallery = $("#gallery");
  const modal = $("#modal");
  const modalImg = $("#modalImg");
  const modalTitle = $("#modalTitle");
  const closeBtn = $("#modalClose");

  if (!gallery || !modal || !modalImg || !closeBtn) return;

  const openModal = (src, alt) => {
    modalImg.src = src;
    modalImg.alt = alt || "Снимка от галерията";
    modalTitle.textContent = alt || "Галерия";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };

  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    openModal(img.src, img.alt);
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
