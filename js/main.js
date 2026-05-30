/**
 * The Byron Doula — main.js
 * Only behaviours that cannot be done in HTML/CSS live here.
 */

// Nav: transparent over hero, solid on scroll
(function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('nav-solid', window.scrollY > 16);
    window.addEventListener('scroll', update, { passive: true });
    update();
})();

// Mobile menu toggle
(function () {
    const toggle = document.getElementById('menuToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });

    document.addEventListener('click', e => {
        if (!links.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            links.classList.remove('active');
        }
    });
})();

// Smooth scroll — offset for fixed 64px nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
        }
    });
});

// Active nav link
(function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
    });
})();

// Form — submits to Formspree. Sign up at formspree.io and replace FORM_ID below.
(function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    const success = form.closest('.contact-card').querySelector('.contact-success');
    const btn = form.querySelector('.form-submit');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const originalText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        try {
            // TODO: sign up at formspree.io, create a form, and replace REPLACE_WITH_FORM_ID with your form ID
            const res = await fetch('https://formspree.io/f/REPLACE_WITH_FORM_ID', {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                form.hidden = true;
                success.hidden = false;
            } else {
                btn.textContent = 'Something went wrong — please try again';
                setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 5000);
            }
        } catch {
            btn.textContent = 'Network error — please try again';
            setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 5000);
        }
    });
})();
