/* =========================================================
   SUMMIT RIDGE ROOFING
   Portfolio Demo
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuButton = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );
      });
    });
  }


  /* =======================================================
     HEADER SHADOW ON SCROLL
     ======================================================= */

  const header = document.querySelector(".site-header");

  const handleHeaderScroll = () => {

    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderScroll();

  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );


  /* =======================================================
     FAQ ACCORDION
     ======================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

      const isCurrentlyActive =
        item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("active");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      // Open selected item if it wasn't already open
      if (!isCurrentlyActive) {

        item.classList.add("active");

        question.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  });


  /* =======================================================
     CONTACT FORM
     ======================================================= */

  const contactForm =
    document.getElementById("contactForm");

  const formSuccess =
    document.getElementById("formSuccess");

  if (contactForm && formSuccess) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      // Native browser validation
      if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;
      }

      const submitButton =
        contactForm.querySelector(".btn-submit");

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML = `
          Processing...
        `;
      }

      // Simulate request processing for the portfolio demo
      window.setTimeout(() => {

        formSuccess.classList.add("visible");

        contactForm
          .querySelectorAll("input, textarea, select")
          .forEach((field) => {
            field.disabled = true;
          });

        if (submitButton) {
          submitButton.style.display = "none";
        }

        const successOffset =
          formSuccess.getBoundingClientRect().top +
          window.scrollY -
          120;

        window.scrollTo({
          top: successOffset,
          behavior: "smooth"
        });

      }, 700);
    });
  }


  /* =======================================================
     ZIP CODE INPUT
     ======================================================= */

  const zipInput = document.getElementById("zip");

  if (zipInput) {

    zipInput.addEventListener("input", () => {

      zipInput.value =
        zipInput.value.replace(/\D/g, "").slice(0, 5);
    });
  }


  /* =======================================================
     PHONE INPUT
     ======================================================= */

  const phoneInput =
    document.getElementById("phone");

  if (phoneInput) {

    phoneInput.addEventListener("input", () => {

      let value =
        phoneInput.value.replace(/\D/g, "");

      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      if (value.length >= 7) {

        phoneInput.value =
          `(${value.slice(0, 3)}) ` +
          `${value.slice(3, 6)}-${value.slice(6)}`;

      } else if (value.length >= 4) {

        phoneInput.value =
          `(${value.slice(0, 3)}) ${value.slice(3)}`;

      } else if (value.length > 0) {

        phoneInput.value =
          `(${value}`;
      }
    });
  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElement =
    document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     SMOOTH SCROLL WITH HEADER OFFSET
     ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId === "#top"
      ) {

        if (targetId === "#top") {
          event.preventDefault();

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }

        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });


  /* =======================================================
     SIMPLE REVEAL ANIMATIONS
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".comparison-card, " +
    ".service-card, " +
    ".benefit, " +
    ".process-step, " +
    ".review-card"
  );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("revealed");

            observerInstance.unobserve(
              entry.target
            );
          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {

      element.classList.add("reveal");

      observer.observe(element);
    });
  }

});