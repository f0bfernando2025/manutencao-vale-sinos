// ========== Mobile Menu Toggle ==========
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    });
  });
}

// ========== Header Scroll Effect ==========
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 20) {
    header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== Fade-in Animation on Scroll ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .diff-card, .value-card, .section-header, .category-header, .subcategory, .contact-item, .benefit-item, .process-step, .trust-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ========== Form Submission to WhatsApp ==========
const WHATSAPP_NUMBER = '5551999299247';

function handleFormSubmit(formId, intro) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const servico = form.servico.value;
    const mensagem = form.mensagem.value.trim();

    if (!nome || !telefone || !servico || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const text =
      `${intro}\n\n` +
      `*Nome:* ${nome}\n` +
      `*Telefone:* ${telefone}\n` +
      `*Serviço:* ${servico}\n\n` +
      `*Mensagem:*\n${mensagem}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

handleFormSubmit('contact-form', 'Olá Diego! Entrei em contato pelo site:');
handleFormSubmit('orcamento-form', 'Olá Diego! Gostaria de um orçamento:');
