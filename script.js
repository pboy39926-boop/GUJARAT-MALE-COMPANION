// ═══════════════════════════════════════════════════════
//   ★★★ YAHAN APNI SAB DETAILS CHANGE KARO ★★★
// ═══════════════════════════════════════════════════════
const MY = {
  brandMain: "GUJARAT MALE",   // ← brand ka white text
  brandAccent: "COMPANION",    // ← brand ka golden text
  name: "Kabir",              // ← apna alias/professional name
  phone: "919106420341",       // ← WhatsApp number (country code + number, bina + ke)
  city: "Ahmedabad, Gujarat",

  // Rates yahan - naya plan add karne ke liye bas ek line {} copy karo
  services: [
    { icon:"lucide:clock",     title:"1 Hour",         desc:"Quick meet, coffee or short outing",           price:"Inquire", popular: false },
    { icon:"lucide:utensils",  title:"3 Hours",        desc:"Dinner date + movie or long drive",            price:"Inquire", popular: true },
    { icon:"lucide:sun",       title:"Full Night",     desc:"Complete evening till morning",                price:"Inquire", popular: false },
    { icon:"lucide:calendar",  title:"Full Day",       desc:"12 hrs - shopping, lunch, dinner, everything", price:"Inquire", popular: false },
    { icon:"lucide:palm-tree", title:"Weekend",        desc:"Fri evening to Sun - trip, stay, fun",         price:"Inquire", popular: false },
    { icon:"lucide:plane",     title:"Travel Package", desc:"Outstation trips - Goa, Mount Abu, etc.",      price:"Custom",  popular: false }
  ],

  // Naye reviews yahan add karte raho
  reviews: [
    { text:"He was so respectful and charming. My first time booking someone and he made me feel so comfortable. The dinner was amazing and he knew exactly how to keep the conversation going. Will definitely book again!", name:"Sneha",  meta:"Ahmedabad • Dinner Date" },
    { text:"Booked him for my friend's wedding as my plus-one. Everyone thought he was my boyfriend 😂 He was so well-dressed, confident, and danced with me all night. 10/10 recommend!", name:"Riya",   meta:"Rajkot • Wedding Date" },
    { text:"Took him for a Goa weekend and it was the best decision! Beach, clubs, sunset dinner - he planned everything. So much fun and not even for a second did I feel uncomfortable. Total value for money.", name:"Pooja",  meta:"Goa • Weekend Trip" },
    { text:"I was going through a stressful phase at work and just needed good company. He was such a good listener - no judgment, just pure warmth. We just sat at a café for 3 hours and I felt so much better. Thank you ❤️", name:"Ananya", meta:"Ahmedabad • Coffee Date" }
  ]
};

// ═════════ Neeche ka code automatically sab handle karta hai - mat chhedo ═════════

// WhatsApp helpers
const waLink = t => `https://wa.me/${MY.phone}?text=${encodeURIComponent(t)}`;
const val = id => document.getElementById(id).value.trim();
function fmtDate(d){ if(!d) return ''; const x = new Date(d+'T00:00:00'); return x.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}); }
function fmtTime(t){ if(!t) return ''; const [h,m] = t.split(':'); return `${(+h%12)||12}:${m} ${+h<12?'AM':'PM'}`; }

// Saare data-wa links set karta hai (static + dynamic dono)
function initWaLinks(){
  document.querySelectorAll('[data-wa]').forEach(a => a.href = waLink(a.dataset.wa));
}

// Floating button + number + brand auto-set
document.getElementById('waFloat').href = waLink('Hi! I saw your website and would like to know more about your companionship services. (Discreet inquiry)');
const numOnly = MY.phone.slice(-10), pretty = `+91 ${numOnly.slice(0,5)} ${numOnly.slice(5)}`;
document.querySelectorAll('.wa-number').forEach(el => el.textContent = pretty);
document.getElementById('heroName').textContent = MY.name;
document.getElementById('heroCity').textContent = MY.city;
document.querySelectorAll('.b-main').forEach(e => e.textContent = MY.brandMain);
document.querySelectorAll('.b-accent').forEach(e => e.textContent = MY.brandAccent);

// Services render
function renderServices(){
  document.getElementById('servicesGrid').innerHTML = MY.services.map((s,i)=>{
    const custom = s.price === 'Custom';
    const btn = custom
      ? `<a data-wa="Hi, I want a quote for the ${s.title}" target="_blank" href="#" class="w-full border border-neutral-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"><span class="iconify" data-icon="lucide:message-circle"></span>Ask on WhatsApp</a>`
      : `<button data-book="${s.title}" class="w-full ${s.popular ? 'bg-white text-black hover:bg-gold' : 'border border-neutral-700 hover:bg-white hover:text-black'} text-xs font-semibold py-2.5 rounded-xl transition-all duration-300">Book Now</button>`;
    return `<div class="srv anim bg-neutral-900 ${s.popular ? 'border border-gold/40 relative' : 'border border-neutral-800'} rounded-2xl p-6 transition-all duration-500" style="transition-delay:${(i%3)*.1}s">
      ${s.popular ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-[10px] font-bold uppercase tracking-wider text-black">Most Popular</div>' : ''}
      <div class="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4"><span class="iconify text-gold text-xl" data-icon="${s.icon}"></span></div>
      <h3 class="text-base font-semibold mb-1">${s.title}</h3>
      <p class="text-xs text-neutral-500 mb-4">${s.desc}</p>
      <div class="text-2xl font-semibold text-gold-light mb-5">${s.price}</div>${btn}</div>`;
  }).join('');
}

// Reviews render
function renderReviews(){
  const stars = '<span class="iconify text-gold text-sm" data-icon="lucide:star"></span>'.repeat(5);
  document.getElementById('reviewsGrid').innerHTML = MY.reviews.map((r,i)=>`
    <div class="anim bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-gold/20 transition-all duration-300" style="transition-delay:${(i%2)*.1}s">
      <div class="flex items-center gap-1 mb-3">${stars}</div>
      <p class="text-sm text-neutral-400 font-light leading-relaxed mb-5">"${r.text}"</p>
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold-light">${r.name[0]}</div>
        <div><div class="text-sm font-medium">${r.name}</div><div class="text-[11px] text-neutral-500">${r.meta}</div></div>
      </div>
    </div>`).join('');
}

// Booking modal
function openBook(pre){
  const m = document.getElementById('bookModal');
  m.style.display = 'flex'; document.body.style.overflow = 'hidden';
  if(pre){
    const dur = document.getElementById('bDuration'), srv = document.getElementById('bService');
    if([...dur.options].some(o=>o.value===pre)) dur.value = pre;
    else if([...srv.options].some(o=>o.value===pre)) srv.value = pre;
  }
}
function closeBook(){ document.getElementById('bookModal').style.display='none'; document.body.style.overflow=''; }
document.addEventListener('keydown', e => { if(e.key==='Escape') closeBook(); });
document.addEventListener('click', e => { const b = e.target.closest('[data-book]'); if(b) openBook(b.dataset.book); });

// Booking form -> WhatsApp
function sendBook(e){
  e.preventDefault();
  const notes = val('bNotes');
  const lines = ['*NEW BOOKING REQUEST*','',
    `Name: ${val('bName')}`,
    `Phone: ${val('bPhone')}`,
    `City: ${val('bCity')}`,
    `Service: ${val('bService')}`,
    `Date: ${fmtDate(val('bDate'))}`,
    `Time: ${fmtTime(val('bTime'))}`,
    `Duration: ${val('bDuration')}`];
  if(notes) lines.push(`Notes: ${notes}`);
  window.open(waLink(lines.join('\n')), '_blank');
  closeBook(); e.target.reset();
  showToast('Booking WhatsApp par bhej di gayi');
}

// Quick message form -> WhatsApp
function sendMsg(e){
  e.preventDefault();
  const lines = ['*NEW MESSAGE FROM WEBSITE*','',
    `Name: ${val('qName')}`,
    `Phone: ${val('qPhone')}`,
    `Looking for: ${val('qService')}`,'',
    val('qMsg')];
  window.open(waLink(lines.join('\n')), '_blank');
  e.target.reset();
  showToast('Message WhatsApp par bhej diya');
}

// Toast
let toastTimer;
function showToast(m){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = m;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('on'), 3000);
}

// Mobile menu
function toggleMenu(){
  const mm = document.getElementById('mobMenu');
  mm.classList.toggle('hidden');
  document.getElementById('menuIco').setAttribute('data-icon', mm.classList.contains('hidden') ? 'lucide:menu' : 'lucide:x');
}

// FAQ accordion
function togFaq(btn){
  const a = btn.nextElementSibling, i = btn.querySelector('.iconify');
  a.classList.toggle('hidden');
  i.style.transform = a.classList.contains('hidden') ? '' : 'rotate(45deg)';
}

// Scroll animations
const obs = new IntersectionObserver(es => es.forEach(en => {
  if(en.isIntersecting){ en.target.classList.add('show'); obs.unobserve(en.target); }
}), {threshold:.12});

// Init
renderServices();
renderReviews();
initWaLinks();
document.querySelectorAll('.anim,.anim-l,.anim-r').forEach(el => obs.observe(el));
document.getElementById('bDate').min = new Date().toISOString().split('T')[0];
document.getElementById('year').textContent = new Date().getFullYear();

// Scrollspy
const secs = ['home','about','services','reviews','contact'];
window.addEventListener('scroll', () => {
  let cur = 'home';
  secs.forEach(id => { const el = document.getElementById(id); if(el && window.scrollY >= el.offsetTop - 250) cur = id; });
  document.querySelectorAll('.nav-l').forEach(a => {
    const on = a.getAttribute('href') === '#' + cur;
    a.classList.toggle('text-white', on);
    a.classList.toggle('text-neutral-400', !on);
  });
});
