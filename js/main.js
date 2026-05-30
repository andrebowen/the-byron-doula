/**
 * The Byron Doula — main.js
 * Only behaviours that cannot be done in HTML/CSS live here.
 */

const CONTACT_EMAIL = 'hello@thebyrondoula.com';

// Nav: transparent over hero, solid on scroll (legacy pages)
(function () {
    const nav = document.querySelector('nav:not(.bento-nav-drawer)');
    if (!nav || nav.classList.contains('bento-nav')) return;
    const update = () => nav.classList.toggle('nav-solid', window.scrollY > 16);
    window.addEventListener('scroll', update, { passive: true });
    update();
})();

// Mobile menu toggle (legacy pages)
(function () {
    const toggle = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
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

// Bento nav drawer (homepage)
(function () {
    const toggle = document.getElementById('navToggle');
    const drawer = document.getElementById('navDrawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
        const open = toggle.classList.toggle('open');
        drawer.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('open');
            drawer.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            toggle.classList.remove('open');
            drawer.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
})();

// Smooth scroll — offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 72,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link
(function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .bento-nav-links a, .bento-nav-drawer a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
    });
})();

// Pre-select service when visitor clicks a service CTA
(function () {
    const serviceSelect = document.getElementById('service');
    if (!serviceSelect) return;

    function setService(value) {
        if (value && serviceSelect.querySelector(`option[value="${value}"]`)) {
            serviceSelect.value = value;
        }
    }

    document.querySelectorAll('a[data-service]').forEach(a => {
        a.addEventListener('click', () => setService(a.dataset.service));
    });

    const fromUrl = new URLSearchParams(window.location.search).get('service');
    if (fromUrl) setService(fromUrl);
})();

// Contact form — submits via FormSubmit.co
(function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const wrap = form.closest('.bento-contact-form-wrap') || form.closest('.contact-card');
    const success = wrap?.querySelector('.contact-success');
    const footnote = wrap?.querySelector('.contact-form-footnote');
    const btn = form.querySelector('.form-submit');
    if (!success || !btn) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.querySelector(':invalid')?.focus();
            return;
        }

        const originalText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        const data = new FormData(form);
        data.append('_captcha', 'false');
        data.append('_template', 'table');

        try {
            const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            const result = await res.json().catch(() => ({}));

            if (res.ok && result.success !== 'false') {
                form.hidden = true;
                if (footnote) footnote.hidden = true;
                success.hidden = false;
            } else {
                btn.textContent = 'Something went wrong — please try again';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 5000);
            }
        } catch {
            btn.textContent = 'Network error — please try again';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 5000);
        }
    });
})();
