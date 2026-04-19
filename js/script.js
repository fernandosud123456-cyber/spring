/* =========================================================
   Spring Space — Scripts
   ========================================================= */

/* ---------- DATA: events + captions + image counts ---------- */
const EVENTS = [
    {
        id: 1, slug: 'aniversario-50',
        title: '50 anos — vitória e gratidão',
        category: 'aniversario', badge: 'Aniversário',
        count: 6,
        caption: 'Celebramos os 50 anos de uma cliente muito querida. Parabéns pela vitória!'
    },
    {
        id: 2, slug: 'salao-cenario',
        title: 'O cenário perfeito',
        category: 'casamento', badge: 'Salão',
        count: 15,
        caption: 'Cada detalhe desse salão tá impecável — feito para grandes momentos.'
    },
    {
        id: 3, slug: 'noite-inesquecivel',
        title: 'Uma noite inesquecível',
        category: 'aniversario', badge: 'Aniversário',
        count: 10,
        caption: 'Cada detalhe pensado com carinho para uma noite cheia de emoção.'
    },
    {
        id: 4, slug: 'sabores',
        title: 'Sabores inesquecíveis',
        category: 'aniversario', badge: 'Doces & Mesa',
        count: 12,
        caption: 'Porque uma festa perfeita também tem sabores inesquecíveis.'
    },
    {
        id: 5, slug: 'noite-magica',
        title: 'Uma noite mágica',
        category: 'aniversario', badge: 'Aniversário',
        count: 6,
        caption: 'Cheia de encanto, emoção e momentos para guardar para sempre.'
    },
    {
        id: 6, slug: 'amor-existe',
        title: 'A prova de que o amor existe',
        category: 'casamento', badge: 'Casamento',
        count: 21,
        caption: 'Hoje não foi só uma festa — foi a certeza de que o amor existe.'
    },
    {
        id: 7, slug: 'historia-de-amor',
        title: 'Uma história de amor',
        category: 'casamento', badge: 'Casamento',
        count: 18,
        caption: 'Uma história construída com carinho e amor.'
    },
    {
        id: 8, slug: 'bodas-33-anos',
        title: 'Bodas · 33 anos de amor',
        category: 'boda', badge: 'Bodas',
        count: 7,
        caption: '33 anos de amor merecem uma celebração inesquecível.'
    }
];

/* Optional videos — drop files into /videos and list them here.
   Each video will render as a card in the gallery under the "Vídeos" filter. */
const VIDEOS = [
    // { file: 'casamento-destaque.mp4', poster: 'evento6/3.jpg', title: 'Casamento — melhores momentos', category: 'casamento' },
];

/* ---------- Helpers ---------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ---------- Year in footer ---------- */
$$('#year').forEach(el => el.textContent = new Date().getFullYear());

/* ---------- Header scroll state ---------- */
const header = $('#site-header');
const onScroll = () => {
    if (!header) return;
    if (header.classList.contains('scrolled') && window.scrollY === 0 && !header.hasAttribute('data-force')) {
        // let contato.html keep scrolled look always
    }
    if (!header.hasAttribute('data-force')) {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }
};
if (header && header.classList.contains('scrolled')) header.setAttribute('data-force','');
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const burger = $('#burger');
const nav    = $('#site-nav');
if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
    });
    $$('#site-nav a').forEach(a => a.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
    }));
}

/* ---------- Hero slideshow ---------- */
(function heroSlideshow() {
    const slides = $$('#hero-slides .hero-slide');
    if (slides.length < 2) return;
    let i = 0;
    setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
    }, 5500);
})();

/* ---------- Reveal on scroll ---------- */
(function revealOnScroll() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
})();

/* ---------- Gallery builder ---------- */
(function gallery() {
    const grid = $('#galeria');
    if (!grid) return;

    const frag = document.createDocumentFragment();

    EVENTS.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'evento';
        card.dataset.category = ev.category;
        card.dataset.type = 'photo';
        card.dataset.eventId = String(ev.id);
        card.innerHTML = `
            <div class="evento-media">
                <img src="evento${ev.id}/1.jpg" alt="${ev.title}" loading="lazy">
                <span class="evento-badge">${ev.badge}</span>
                <span class="evento-count">📷 ${ev.count}</span>
            </div>
            <div class="evento-caption">
                <h3>${ev.title}</h3>
                <p>${ev.caption}</p>
            </div>
        `;
        frag.appendChild(card);
    });

    // Videos
    VIDEOS.forEach((v, idx) => {
        const card = document.createElement('div');
        card.className = 'evento is-video';
        card.dataset.category = v.category || 'video';
        card.dataset.type = 'video';
        card.dataset.videoIndex = String(idx);
        card.innerHTML = `
            <div class="evento-media">
                <img src="${v.poster || ''}" alt="${v.title}" loading="lazy">
                <span class="evento-badge">Vídeo</span>
            </div>
            <div class="evento-caption">
                <h3>${v.title}</h3>
                <p>Clique para assistir</p>
            </div>
        `;
        frag.appendChild(card);
    });

    // Placeholder if no videos yet
    if (VIDEOS.length === 0) {
        const ph = document.createElement('div');
        ph.className = 'video-placeholder reveal';
        ph.dataset.category = 'video';
        ph.innerHTML = `
            <h3>Espaço reservado para vídeos</h3>
            <p>Em breve, os vídeos dos eventos chegam aqui.</p>
            <p style="margin-top:10px;font-size:13px;">
                Para adicionar: coloque os arquivos em <code>videos/</code> e edite a lista <code>VIDEOS</code> em <code>js/script.js</code>.
            </p>
        `;
        frag.appendChild(ph);
    }

    grid.appendChild(frag);

    // reveal animation for cards
    const cards = $$('.evento', grid);
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('show'), (i % 6) * 80);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(c => io.observe(c));
    } else {
        cards.forEach(c => c.classList.add('show'));
    }

    /* Filters */
    const filters = $$('#filters button');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            $$('.evento, .video-placeholder', grid).forEach(el => {
                const show = f === 'todos' || el.dataset.category === f
                    || (f === 'video' && el.classList.contains('is-video'));
                el.style.display = show ? '' : 'none';
            });
        });
    });

    /* Lightbox */
    const lb         = $('#lightbox');
    const lbContent  = $('#lb-content');
    const lbCounter  = $('#lb-counter');
    const lbClose    = $('#lb-close');
    const lbPrev     = $('#lb-prev');
    const lbNext     = $('#lb-next');

    let current = { type: 'photo', eventId: null, index: 0, total: 0, videoIndex: null };

    function renderLightbox() {
        if (current.type === 'photo') {
            lbContent.innerHTML = `<img src="evento${current.eventId}/${current.index + 1}.jpg" alt="">`;
            lbCounter.textContent = `${current.index + 1} / ${current.total}`;
            lbPrev.style.display = current.total > 1 ? '' : 'none';
            lbNext.style.display = current.total > 1 ? '' : 'none';
        } else if (current.type === 'video') {
            const v = VIDEOS[current.videoIndex];
            lbContent.innerHTML = `<video src="videos/${v.file}" controls autoplay playsinline></video>`;
            lbCounter.textContent = v.title || '';
            lbPrev.style.display = 'none';
            lbNext.style.display = 'none';
        }
    }

    function openLightboxForEvent(id) {
        const ev = EVENTS.find(e => e.id === id);
        if (!ev) return;
        current = { type: 'photo', eventId: id, index: 0, total: ev.count, videoIndex: null };
        renderLightbox();
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function openLightboxForVideo(idx) {
        current = { type: 'video', eventId: null, index: 0, total: 0, videoIndex: idx };
        renderLightbox();
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
        lbContent.innerHTML = '';
        document.body.style.overflow = '';
    }
    function step(dir) {
        if (current.type !== 'photo') return;
        current.index = (current.index + dir + current.total) % current.total;
        renderLightbox();
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.dataset.type === 'video') {
                openLightboxForVideo(parseInt(card.dataset.videoIndex, 10));
            } else {
                openLightboxForEvent(parseInt(card.dataset.eventId, 10));
            }
        });
    });

    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    lbPrev.addEventListener('click', e => { e.stopPropagation(); step(-1); });
    lbNext.addEventListener('click', e => { e.stopPropagation(); step(1); });

    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
    });

    // Swipe for mobile
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
    });
})();
