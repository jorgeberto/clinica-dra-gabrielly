// CONFIG: troque pelo WhatsApp real da clínica (DDI+DDD+numero, só dígitos)
const WHATSAPP_NUMBER = "5511999999999";

// Menu mobile
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Header sombra no scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.08)' : 'none';
}, { passive: true });

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.pain-card, .service, .review, .step, .about-copy, .form-card').forEach(el => {
  el.classList.add('reveal'); io.observe(el);
});

// Form -> WhatsApp (conversão)
document.getElementById('leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const need = document.getElementById('fNeed').value;
  const time = document.getElementById('fTime').value;
  const isUrgent = /dor|urgência/i.test(need);

  const lines = [
    `Olá, Dra. Gabrielly! Aqui é ${name}.`,
    ``,
    `Vi o site da clínica e gostaria de agendar uma avaliação.`,
    ``,
    `• Motivo da consulta: ${need}`,
    `• Melhor período para atendimento: ${time}`,
    ...(isUrgent ? [``, `Observação: estou com dor e preciso de atendimento prioritário, por favor.`] : []),
    ``,
    `Poderia me informar os próximos horários disponíveis? Obrigado(a)!`
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank');
});

// Atualiza todos os botões wa.me automaticamente se o número for trocado acima
document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
  try {
    const u = new URL(a.href);
    const text = u.searchParams.get('text') || '';
    // só substitui o número, mantém o texto original de cada botão
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] !== WHATSAPP_NUMBER) {
      a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }
  } catch(e){}
});
