// script.js - minimal, dependency-free
(function(){
  const PRICE = 60000;
  const qtyInput = document.getElementById('qty');
  const incr = document.getElementById('incr');
  const decr = document.getElementById('decr');
  const totalAmount = document.getElementById('total-amount');
  const continueBtn = document.getElementById('continueBtn');

  // Nav elements
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const closePageBtn = document.getElementById('closePageBtn');

  function formatNumber(n){
    return Number(n).toLocaleString('en-NG');
  }

  function updateTotal(){
    let q = parseInt(qtyInput.value || 0, 10);
    if (isNaN(q) || q < 0) q = 0;
    const total = q * PRICE;
    totalAmount.textContent = formatNumber(total);
  }

  incr.addEventListener('click', ()=> {
    qtyInput.value = Math.max(0, (parseInt(qtyInput.value||0,10) + 1));
    updateTotal();
  });

  decr.addEventListener('click', ()=> {
    qtyInput.value = Math.max(0, (parseInt(qtyInput.value||0,10) - 1));
    updateTotal();
  });

  qtyInput.addEventListener('input', ()=>{
    let val = parseInt(qtyInput.value || 0, 10);
    if (isNaN(val) || val < 0){ val = 0; }
    qtyInput.value = val;
    updateTotal();
  });

  // Continue / WhatsApp booking
  continueBtn.addEventListener('click', ()=>{
    const q = parseInt(qtyInput.value || 0, 10);
    if (q === 0){
      const message = encodeURIComponent(
        `Hi! I'm interested in THE BIGGEST YACHT PARTY OF 2025. I would like more info about booking.`
      );
      window.open(`https://wa.me/2349047219373?text=${message}`, '_blank');
      return;
    }
    const total = q * PRICE;
    const message = encodeURIComponent(
      `Hello! I want to book ${q} ticket(s) for THE BIGGEST YACHT PARTY OF 2025. Total: ₦${total.toLocaleString('en-NG')}. Please share booking details.`
    );
    window.open(`https://wa.me/2349047219373?text=${message}`, '_blank');
  });

  // NAV open/close
  function openNav(){
    mobileNav.classList.add('open');
    navBackdrop.classList.add('open');
    mobileNav.setAttribute('aria-hidden','false');
    navBackdrop.setAttribute('aria-hidden','false');
  }
  function closeNav(){
    mobileNav.classList.remove('open');
    navBackdrop.classList.remove('open');
    mobileNav.setAttribute('aria-hidden','true');
    navBackdrop.setAttribute('aria-hidden','true');
  }

  menuBtn.addEventListener('click', openNav);
  navBackdrop.addEventListener('click', closeNav);
  navCloseBtn.addEventListener('click', closeNav);

  // optional: close button to go back (or you can hook it to close modal)
  closePageBtn.addEventListener('click', ()=>{
    if (window.history.length > 1) window.history.back();
  });

  // close nav with Escape
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeNav();
  });

  // init
  updateTotal();

})();
