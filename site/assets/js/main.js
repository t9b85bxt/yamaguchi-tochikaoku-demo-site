/* =============================================================
   山口孝夫土地家屋調査士事務所 ｜ デモサイト  main.js
   スクロール表示アニメーションはCSS（animation-timeline）で実装。
   JSの役割：
   - モバイルナビ開閉
   - ヘッダー影の切り替え
   - FAQアコーディオン
   - フォームのバリデーション＋デモ用送信ブロック
   - スクロール駆動アニメーション未対応ブラウザ向けの保険
   ============================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsSDA = CSS && CSS.supports && CSS.supports("animation-timeline: view()");

  /* ---------- 現在年 ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- data-stagger の子に順番indexを付与 ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var n = 0;
    Array.prototype.forEach.call(group.children, function (child) {
      if (child.classList.contains("reveal")) child.style.setProperty("--i", n++);
    });
  });

  /* ---------- スクロール駆動アニメ未対応時の保険 ----------
     CSSの @supports で対応ブラウザだけがフェード対象になるが、
     万一 .reveal が隠れたままにならないよう明示的に表示する。 */
  if (reduceMotion || !supportsSDA) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- ヘッダー：スクロールで影 ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  /* ---------- モバイルナビ ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var overlay = document.querySelector(".nav-overlay");
  if (toggle && overlay) {
    var setNav = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      overlay.classList.toggle("is-open", open);
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    overlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ---------- FAQ アコーディオン ---------- */
  document.querySelectorAll(".acc-item").forEach(function (item) {
    var trigger = item.querySelector(".acc-trigger");
    var panel = item.querySelector(".acc-panel");
    if (!trigger || !panel) return;
    var inner = panel.querySelector(".acc-panel__inner");

    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      var group = item.closest(".accordion");
      if (group && !isOpen) {
        group.querySelectorAll(".acc-trigger[aria-expanded='true']").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          var p = t.closest(".acc-item").querySelector(".acc-panel");
          if (p) p.style.height = "0px";
        });
      }
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.height = isOpen ? "0px" : inner.offsetHeight + "px";
    });

    window.addEventListener("resize", function () {
      if (trigger.getAttribute("aria-expanded") === "true") {
        panel.style.height = inner.offsetHeight + "px";
      }
    }, { passive: true });
  });

  /* ---------- モーダル ---------- */
  var modal = document.querySelector(".modal");
  var openModal = function (title, body) {
    if (!modal) return;
    modal.querySelector("[data-modal-title]").textContent = title;
    modal.querySelector("[data-modal-body]").textContent = body;
    modal.classList.add("is-open");
    var closer = modal.querySelector("[data-modal-close]");
    if (closer) closer.focus();
  };
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.hasAttribute("data-modal-close")) {
        modal.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") modal.classList.remove("is-open");
    });
  }

  /* ---------- フォーム：バリデーション＋デモ送信ブロック ---------- */
  var form = document.querySelector("[data-demo-form]");
  if (form) {
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrap = field.closest(".form-field") || field.closest(".form-check");
        var valid = field.type === "checkbox" ? field.checked : String(field.value).trim() !== "";
        if (field.type === "email" && valid) {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        }
        if (wrap) wrap.classList.toggle("is-invalid", !valid);
        if (!valid && ok) { ok = false; field.focus(); }
      });
      if (!ok) {
        openModal("入力内容をご確認ください", "未入力の必須項目、またはメールアドレスの形式に誤りがあります。");
        return;
      }
      openModal(
        "これはデモサイトです",
        "実際の送信は行われません。ご相談は、お電話 024-932-1910 へお願いいたします。本番サイトでは、この内容が事務所へ届く仕組みを実装します。"
      );
      form.reset();
    });
    form.addEventListener("input", function (e) {
      var wrap = e.target.closest(".form-field") || e.target.closest(".form-check");
      if (wrap) wrap.classList.remove("is-invalid");
    });
  }

  /* ---------- デモ用：送信系リンクのガード ---------- */
  document.querySelectorAll("[data-demo-action]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("これはデモサイトです", "この操作はデモ環境では動作しません。お問い合わせはお電話（024-932-1910）へお願いいたします。");
    });
  });
})();
