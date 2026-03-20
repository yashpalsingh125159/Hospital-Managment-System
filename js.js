
// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('btt').classList.toggle('visible', window.scrollY > 400);
});

// ── HAMBURGER ──
const ham = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  ham.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── GALLERY FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

// ── LIGHTBOX ──
function openLightbox(el) {
  const img = el.querySelector('img');
  const cap = el.querySelector('.gallery-overlay span');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').textContent = cap ? cap.textContent : '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── APPOINTMENT FORM ──
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date  = document.getElementById('apptDate').value;
  const slot  = document.getElementById('timeSlot').value;
  const dept  = document.getElementById('dept').value;

  if (!fname || !lname || !email || !phone || !date || !slot || !dept) {
    alert('Please fill in all required fields before submitting.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.'); return;
  }

  // Show success toast
  const toast = document.getElementById('toast');
  toast.textContent = `✅ Hi ${fname}, your appointment for ${dept} on ${date} is confirmed!`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);

  // Reset form
  ['fname','lname','email','phone','apptDate','timeSlot','dept','msg'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

// ── SET MIN DATE ──
const dateInput = document.getElementById('apptDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ── SMOOTH ANCHOR ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});