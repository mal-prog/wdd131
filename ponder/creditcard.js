const $ = (q) => document.querySelector(q);

function normalizeNumber(v) {
  return v.replace(/[^\d]/g, "");
}

function notExpired(mm, yy) {
  const m = parseInt(mm, 10);
  const y = parseInt(yy, 10);
  if (Number.isNaN(m) || Number.isNaN(y) || m < 1 || m > 12) return false;

  const fullY = y < 100 ? 2000 + y : y;
  const now = new Date();
  const curM = now.getMonth() + 1;
  const curY = now.getFullYear();

  return fullY > curY || (fullY === curY && m >= curM);
}

function showErrors(list) {
  const box = $("#formErrors");
  box.innerHTML = list.length ? list.map(msg => `• ${msg}`).join("<br>") : "";
}

function formatNumberLive(input) {
  input.addEventListener("input", () => {
    const digits = normalizeNumber(input.value).slice(0, 16);
    const parts = digits.match(/.{1,4}/g) || [];
    input.value = parts.join(" ");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#cardForm");
  const thanks = $("#thanks");
  formatNumberLive($("#number"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];
    const number = normalizeNumber($("#number").value);
    const holder = $("#holder").value.trim();
    const mm = $("#month").value.trim();
    const yy = $("#year").value.trim();
    const cvv = $("#cvv").value.trim();

    if (number !== "1234123412341234") {
      errors.push("Card number must be exactly 1234 1234 1234 1234.");
    }
    if (!holder) errors.push("Card holder name is required.");
    if (!notExpired(mm, yy)) errors.push("Card is expired or invalid.");
    if (!/^\d{3}$/.test(cvv)) errors.push("CVV must be 3 digits.");

    showErrors(errors);

    if (errors.length === 0) {
      form.hidden = true;
      thanks.hidden = false;
    }
  });
});





