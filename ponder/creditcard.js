window.addEventListener("DOMContentLoaded", () => {

  const digits = (s) => (s || "").replace(/\D/g, "");

  const form = document.querySelector("#paymentForm");
  const msg  = document.querySelector("#formMsg");
  const numberInput = document.querySelector("#cardNumber");
  const holderInput = document.querySelector("#cardHolder");
  const mmEl = document.querySelector("#expMonth");
  const yyEl = document.querySelector("#expYear");
  const cvvEl = document.querySelector("#cvv");

  // Format card number while typing
  numberInput.addEventListener("input", () => {
    const raw = digits(numberInput.value).slice(0, 16);
    const grouped = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    numberInput.value = grouped;
  });

  // Only digits in MM/YY/CVV
  [mmEl, yyEl, cvvEl].forEach(inp => {
    inp.addEventListener("input", () => {
      inp.value = digits(inp.value);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.className = "form-msg";
    msg.textContent = "";

    const EXACT = "1234123412341234";

    const num = digits(numberInput.value);
    const name = holderInput.value.trim();
    const mm = digits(mmEl.value);
    const yy = digits(yyEl.value);
    const cvv = digits(cvvEl.value);

    let errors = [];

    if (num !== EXACT) errors.push("Card number must be exactly 1234123412341234.");
    if (!name) errors.push("Card holder name is required.");

    const m = Number(mm);
    if (!(m >= 1 && m <= 12)) errors.push("Expiration month must be 01–12.");

    if (yy.length !== 2) errors.push("Expiration year must be two digits (YY).");

    if (errors.length === 0) {
      const fullYear = 2000 + Number(yy);
      const expEnd = new Date(fullYear, m, 0, 23, 59, 59);
      if (isNaN(expEnd.getTime()) || expEnd < new Date()) {
        errors.push("Card is expired.");
      }
    }

    if (!(cvv.length === 3 || cvv.length === 4)) errors.push("CVV must be 3 or 4 digits.");

    if (errors.length) {
      msg.textContent = "❌ " + errors[0];
      msg.classList.add("err");
      return;
    }

    // ✅ SUCCESS MESSAGE
    msg.textContent = "✅ Payment approved. Thank you!";
    msg.classList.add("ok");

    // Optional - reset form
    // form.reset();
  });
});




