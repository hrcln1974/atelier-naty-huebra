"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5528999835920";

  /* =========================================================
     HELPERS
  ========================================================= */

  function scrollToElement(id) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Elemento não encontrado: #${id}`);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function openWhatsApp(message) {
    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");

  if (menuBtn && nav) {
    function closeMobileMenu() {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
    }

    function toggleMobileMenu() {
      const isOpen = nav.classList.toggle("is-open");

      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    }

    menuBtn.addEventListener("click", toggleMobileMenu);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        closeMobileMenu();
      }
    });
  }

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  const siteHeader = document.querySelector(".site-header");

  function updateHeader() {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* =========================================================
     BOTÕES DE SCROLL
  ========================================================= */

  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", () => {
      scrollToElement(button.dataset.scrollTo);
    });
  });

  const headerBookingBtn =
    document.getElementById("headerBookingBtn");

  if (headerBookingBtn) {
    headerBookingBtn.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToElement("visita");
    });
  }

  /* =========================================================
     FAQ
  ========================================================= */

  const faqButtons = document.querySelectorAll(".faq-q");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");

      if (!item) return;

      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((otherItem) => {
        otherItem.classList.remove("open");

        const otherButton = otherItem.querySelector(".faq-q");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");

          const icon = otherButton.querySelector("span:last-child");

          if (icon) {
            icon.textContent = "＋";
          }
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");

        const icon = button.querySelector("span:last-child");

        if (icon) {
          icon.textContent = "−";
        }
      }
    });
  });

  /* =========================================================
     GALERIA + LIGHTBOX
  ========================================================= */

  const galleryItems = [
    ...document.querySelectorAll(".gallery-item")
  ];

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let activeItems = galleryItems;
  let currentImage = 0;

  function showImage(index) {
    if (
      !lightbox ||
      !lightboxImage ||
      activeItems.length === 0
    ) {
      return;
    }

    currentImage =
      (index + activeItems.length) % activeItems.length;

    const item = activeItems[currentImage];

    if (!item) return;

    const imageSrc = item.dataset.full;

    if (!imageSrc) {
      console.warn("Imagem ampliada sem data-full.");
      return;
    }

    lightboxImage.src = imageSrc;
    lightboxImage.alt =
      item.dataset.caption || "Imagem ampliada";

    if (lightboxCaption) {
      lightboxCaption.textContent =
        item.dataset.caption || "";
    }
  }

  function openLightbox(item) {
    if (!lightbox) return;

    activeItems = galleryItems.filter(
      (galleryItem) =>
        !galleryItem.classList.contains("is-hidden")
    );

    const index = activeItems.indexOf(item);

    if (index === -1) return;

    showImage(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(item);
      }
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightboxPrev?.addEventListener("click", () => {
    showImage(currentImage - 1);
  });

  lightboxNext?.addEventListener("click", () => {
    showImage(currentImage + 1);
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  /* =========================================================
     FILTROS DA GALERIA
  ========================================================= */

  const filterTabs = document.querySelectorAll(".filter-tab");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((button) => {
        button.classList.remove("active");
      });

      tab.classList.add("active");

      const filter = tab.dataset.filter || "all";

      galleryItems.forEach((item) => {
        const shouldShow =
          filter === "all" ||
          item.dataset.category === filter;

        item.classList.toggle(
          "is-hidden",
          !shouldShow
        );
      });
    });
  });

  /* =========================================================
     CATÁLOGO → WHATSAPP
  ========================================================= */

  document.querySelectorAll(".catalog-buy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const name =
        button.dataset.nome || "vestido do catálogo";

      const message =
        `Olá! Tenho interesse no vestido "${name}" ` +
        `do catálogo do Ateliê Natália Huebra. ` +
        `Podem me enviar disponibilidade, valores e mais informações?`;

      openWhatsApp(message);
    });
  });

  /* =========================================================
     MODAL DE VÍDEO
  ========================================================= */

  const videoModal = document.getElementById("videoModal");
  const videoModalFrame =
    document.getElementById("videoModalFrame");
  const videoModalClose =
    document.getElementById("videoModalClose");

  function closeVideoModal() {
    if (!videoModal) return;

    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (videoModalFrame) {
      videoModalFrame.replaceChildren();
    }
  }

  function isValidYouTubeId(id) {
    return (
      typeof id === "string" &&
      /^[a-zA-Z0-9_-]{11}$/.test(id)
    );
  }

  function openVideoModal(item) {
    if (!videoModal || !videoModalFrame) return;

    const videoId = item.dataset.youtube || "";
    const caption =
      item.dataset.caption ||
      "Vídeo do Ateliê Natália Huebra";

    if (!isValidYouTubeId(videoId)) {
      alert(
        "Este vídeo ainda não foi configurado. " +
        "Adicione o ID de 11 caracteres do vídeo do YouTube no atributo data-youtube."
      );
      return;
    }

    const iframe = document.createElement("iframe");

    iframe.src =
      `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

    iframe.title = caption;
    iframe.loading = "lazy";

    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );

    iframe.setAttribute("allowfullscreen", "");

    videoModalFrame.replaceChildren(iframe);

    videoModal.classList.add("open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    videoModalClose?.focus();
  }

  document.querySelectorAll(".video-item").forEach((item) => {
    item.addEventListener("click", () => {
      openVideoModal(item);
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVideoModal(item);
      }
    });
  });

  videoModalClose?.addEventListener("click", closeVideoModal);

  videoModal?.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideoModal();
    }
  });

  /* =========================================================
     FORMULÁRIO → WHATSAPP
  ========================================================= */

  const bookingForm =
    document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name =
        document.getElementById("clientName")?.value.trim() || "";

      const email =
        document.getElementById("clientEmail")?.value.trim() || "";

      const phone =
        document.getElementById("clientPhone")?.value.trim() || "";

      const interest =
        document.getElementById("clientInterest")?.value || "";

      const message =
        document.getElementById("clientMessage")?.value.trim() || "";

      if (!name || !phone || !interest) {
        bookingForm.reportValidity();
        return;
      }

      const whatsappMessage = [
        "Olá! Gostaria de solicitar um agendamento no Ateliê Natália Huebra.",
        "",
        `Nome: ${name}`,
        `Telefone/WhatsApp: ${phone}`,
        `Interesse: ${interest}`,
        email ? `E-mail: ${email}` : "",
        message ? `Mensagem: ${message}` : ""
      ]
        .filter(Boolean)
        .join("\n");

      openWhatsApp(whatsappMessage);
    });
  }

  /* =========================================================
     YOUTUBE
  ========================================================= */

  const youtubeChannel =
    document.getElementById("youtubeChannel");

  if (youtubeChannel) {
    youtubeChannel.addEventListener("click", () => {
      const channelUrl =
        youtubeChannel.dataset.url?.trim() || "";

      if (!channelUrl) {
        alert(
          "O canal do YouTube ainda não foi configurado."
        );
        return;
      }

      window.open(
        channelUrl,
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  /* =========================================================
     TECLADO / MODAIS
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      if (lightbox?.classList.contains("open")) {
        if (event.key === "ArrowLeft") {
          showImage(currentImage - 1);
        }

        if (event.key === "ArrowRight") {
          showImage(currentImage + 1);
        }
      }

      return;
    }

    if (lightbox?.classList.contains("open")) {
      closeLightbox();
      return;
    }

    if (videoModal?.classList.contains("open")) {
      closeVideoModal();
    }
  });

  /* =========================================================
     IMAGENS — FALLBACK
  ========================================================= */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-load-error");

        console.warn(
          `Imagem não encontrada: ${image.currentSrc || image.src}`
        );
      },
      { once: true }
    );
  });

  /* =========================================================
     ANO DO RODAPÉ
  ========================================================= */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }
});
