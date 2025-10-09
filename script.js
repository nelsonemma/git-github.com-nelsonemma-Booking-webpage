/* ====== NAV TOGGLE (mobile) ====== */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('siteHeader');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('mobile-open');
});

/* Close mobile menu when clicking outside (nice UX) */
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 720) {
    if (!header.contains(e.target) && mainNav.classList.contains('mobile-open')) {
      mainNav.classList.remove('mobile-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ====== COUNTDOWN (live) ====== */
/* Event start: 31 Dec 2025, 20:00 local time */
const target = new Date(2025, 11, 31, 20, 0, 0); // months are 0-based (11 = Dec)

const elDays = document.getElementById('cd-days');
const elHours = document.getElementById('cd-hours');
const elMins = document.getElementById('cd-mins');
const elSecs = document.getElementById('cd-secs');

function pad(n){ return n < 10 ? '0' + n : String(n); }

function updateCountdown(){
  const now = new Date();
  let diff = target - now; // milliseconds
  if (diff <= 0){
    elDays.textContent = '00';
    elHours.textContent = '00';
    elMins.textContent = '00';
    elSecs.textContent = '00';
    clearInterval(countInterval);
    return;
  }
  const secs = Math.floor(diff / 1000);
  const days = Math.floor(secs / (24*3600));
  const hours = Math.floor((secs % (24*3600)) / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  elDays.textContent = pad(days);
  elHours.textContent = pad(hours);
  elMins.textContent = pad(minutes);
  elSecs.textContent = pad(seconds);
}
const countInterval = setInterval(updateCountdown, 1000);
updateCountdown();

/* ====== TICKET / PRICE LOGIC ====== */
const unitPrice = 59999;
const ticketsInput = document.getElementById('tickets');
const totalEl = document.getElementById('total-price');
const unitPriceEl = document.getElementById('unit-price');
const incrBtn = document.getElementById('qty-incr');
const decrBtn = document.getElementById('qty-decr');

unitPriceEl.textContent = unitPrice.toLocaleString();
function recalc(){
  let q = parseInt(ticketsInput.value, 10);
  if (!q || q < 1) q = 1;
  ticketsInput.value = q;
  const total = unitPrice * q;
  totalEl.textContent = total.toLocaleString();
}
incrBtn.addEventListener('click', () => { ticketsInput.value = parseInt(ticketsInput.value||1)+1; recalc(); });
decrBtn.addEventListener('click', () => { ticketsInput.value = Math.max(1, parseInt(ticketsInput.value||1)-1); recalc(); });
ticketsInput.addEventListener('input', recalc);
recalc();

/* ====== BOOK NOW (WhatsApp) ====== */
const bookBtn = document.getElementById('bookNow');
bookBtn.addEventListener('click', () => {
  const qty = parseInt(ticketsInput.value, 10) || 1;
  const total = unitPrice * qty;
  const message = `Hi, I want to book ${qty} ticket(s) for The Biggest Yacht Party 2025. Total: ₦${total.toLocaleString()}. Please share location and next steps.`;
  const phone = '2349047219373'; // use country code 234 + number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});
