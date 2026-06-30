/**
 * Yakup Efe Çelebi — Core Portfolio Engine
 * Architecture: Modular Vanilla JS ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollProgress();
    initNavigations();
    initProjectCarousel();
    initLaptopScrollAnimation();
    initScrollReveal();
    initCounters();
    initMagneticSkills();
    initHeroCanvas();
});

/* ── CUSTOM MOUSE CURSOR EFFECT ── */
function initCursor() {
    const cd = document.getElementById('cd');
    const cr = document.getElementById('cr');
    
    if (cd && cr && window.innerWidth > 768) {
        let cx = -100, cy = -100, rx = -100, ry = -100;
        
        document.addEventListener('mousemove', (e) => {
            cx = e.clientX;
            cy = e.clientY;
            cd.style.left = `${cx}px`;
            cd.style.top = `${cy}px`;
        });
        
        const renderLoop = () => {
            rx += (cx - rx) * 0.12;
            ry += (cy - ry) * 0.12;
            cr.style.left = `${rx}px`;
            cr.style.top = `${ry}px`;
            requestAnimationFrame(renderLoop);
        };
        requestAnimationFrame(renderLoop);
        
        document.querySelectorAll('a, button, .sk-b, .lang-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
        });
    }
}

/* ── REAL-TIME TOP SCROLL PROGRESS BAR ── */
function initScrollProgress() {
    const spb = document.getElementById('spb');
    if (!spb) return;
    window.addEventListener('scroll', () => {
        const totalScrollable = document.body.scrollHeight - window.innerHeight;
        const currentPercentage = (window.scrollY / totalScrollable) * 100;
        spb.style.width = `${currentPercentage}%`;
    }, { passive: true });
}

/* ── SCROLL-TRIGGERED FLOATING NAVIGATION SYSTEM ── */
function initNavigations() {
    const gnav = document.getElementById('gnav');
    const snav = document.getElementById('snav');
    
    window.addEventListener('scroll', () => {
        if (gnav) gnav.classList.toggle('sc', window.scrollY > 10);
        if (snav) snav.classList.toggle('show', window.scrollY > window.innerHeight * 0.5);
    }, { passive: true });

    // Subnav Interaction Observer for dynamic highlights
    const snlinks = document.querySelectorAll('.snav-links a');
    ['about', 'skills', 'laptop-section', 'languages', 'contact'].forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    snlinks.forEach(a => {
                        a.classList.toggle('act', a.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.3 }).observe(section);
    });

    // Smooth Scrolling Engine
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ── LAPTOP INTERN CAROUSEL GENERATOR ── */
function initProjectCarousel() {
    const projects = [
        { num: '01 / 05', title: 'BOSE Platform', desc: 'Yapay zeka ile piyasa analizi yapan güvenli ticaret platformu. MERN stack, gerçek zamanlı veri analizi ve AI destekli karar mekanizmaları.', chips: ['React', 'Node.js', 'MongoDB', 'AI/ML'], vis: '📈', vcls: 'cv1', link: 'https://github.com/yecairdrop' },
        { num: '02 / 05', title: 'Waste Watchers Romania', desc: 'Arduino ile donanım-yazılım entegrasyonlu sürdürülebilirlik çözümleri. Uluslararası kapsamlı proje.', chips: ['Arduino', 'C++', 'Sensör Prog.'], vis: '♻️', vcls: 'cv2', link: 'https://github.com/yecairdrop' },
        { num: '03 / 05', title: "What's Your Perfume?", desc: 'Kullanıcı tercihlerini analiz ederek kişiye özel parfüm öneren web platformu.', chips: ['React', 'Node.js', 'REST API'], vis: '🌸', vcls: 'cv3', link: 'https://github.com/yecairdrop' },
        { num: '04 / 05', title: 'Akademik Projeler', desc: 'Üniversite organizasyonlarına veritabanı ve web geliştirme desteği.', chips: ['Python', 'Java', 'Web'], vis: '🎓', vcls: 'cv4', link: 'https://github.com/yecairdrop' },
        { num: '05 / 05', title: 'Kişisel Web Siteleri', desc: 'Mühendisler için profesyonel portfolyo ve web sitesi geliştirme.', chips: ['React', 'Tailwind', 'HTML/CSS'], vis: '🌐', vcls: 'cv5', link: 'https://github.com/yecairdrop' }
    ];

    const track = document.getElementById('carouselTrack');
    const dotsEl = document.getElementById('carDots');
    if (!track || !dotsEl) return;
    
    const dotEls = [];
    let curSlide = 0;

    track.style.width = `${projects.length * 100}%`;
    
    projects.forEach((p, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.width = `${100 / projects.length}%`;
        slide.innerHTML = `
            <div class="cs-visual ${p.vcls}"><span style="font-size:3.5rem">${p.vis}</span></div>
            <div class="cs-body">
                <div class="cs-num">${p.num}</div>
                <div class="cs-title">${p.title}</div>
                <div class="cs-desc">${p.desc}</div>
                <div class="cs-chips">${p.chips.map(c => `<span class="cs-chip">${c}</span>`).join('')}</div>
                <a href="${p.link}" target="_blank" rel="noopener" class="cs-link">
                    GitHub'da İncele 
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>`;
        track.appendChild(slide);
        
        const dot = document.createElement('div');
        dot.className = `car-dot ${i === 0 ? 'act' : ''}`;
        dotsEl.appendChild(dot);
        dotEls.push(dot);
        dot.addEventListener('click', () => goSlide(i));
    });

    const goSlide = (n) => {
        curSlide = Math.max(0, Math.min(projects.length - 1, n));
        track.style.transform = `translateX(-${curSlide * (100 / projects.length)}%)`;
        dotEls.forEach((d, i) => d.classList.toggle('act', i === curSlide));
    };

    document.getElementById('carPrev')?.addEventListener('click', () => goSlide(curSlide - 1));
    document.getElementById('carNext')?.addEventListener('click', () => goSlide(curSlide + 1));

    // Touch Support Swipe Event
    let tx = 0;
    const cw = document.getElementById('carouselWrap');
    cw?.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    cw?.addEventListener('touchend', (e) => {
        const dx = tx - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) goSlide(dx > 0 ? curSlide + 1 : curSlide - 1);
    }, { passive: true });
}

/* ── CINEMATIC INTERACTIVE 3D LAPTOP INTERACTION MOCKUP ── */
function initLaptopScrollAnimation() {
    const laptopSection = document.getElementById('laptop-section');
    const laptopWrap = document.getElementById('laptopWrap');
    const laptopLid = document.getElementById('laptopLid');
    const laptopLabel = document.getElementById('laptopLabel');
    const laptopStatus = document.getElementById('laptopStatus');
    const screenBg = document.getElementById('screenBg');
    const scrollHint = document.getElementById('scrollHint');

    if (!laptopSection || !laptopWrap || !laptopLid) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => {
        const rect = laptopSection.getBoundingClientRect();
        const secH = laptopSection.offsetHeight;
        const viewH = window.innerHeight;
        const prog = clamp(-rect.top / (secH - viewH), 0, 1);

        laptopLabel?.classList.toggle('show', prog > 0.04);
        const p2 = ease(clamp((prog - 0.25) / 0.47, 0, 1));

        // Laptop base scale configuration
        const outerX = lerp(18, 0, p2);
        const sc = lerp(0.65, 0.84, p2);
        const ty = lerp(30, -10, p2);
        laptopWrap.style.transform = `perspective(1400px) translateY(${ty}px) rotateX(${outerX}deg) scale(${sc})`;

        // Lid angle setup
        const lidX = lerp(-75, -2, p2);
        laptopLid.style.transform = `rotateX(${lidX}deg)`;

        if (screenBg) screenBg.style.opacity = clamp((p2 - 0.55) / 0.45, 0, 1);
        scrollHint?.classList.toggle('hide', prog > 0.1);

        if (laptopStatus) {
            if (prog < 0.25) laptopStatus.textContent = '';
            else if (prog < 0.72) laptopStatus.textContent = 'Ekran açılıyor…';
            else laptopStatus.textContent = '← Projeleri kaydırarak keşfet →';
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ── SCROLL INTERSECTION REVEAL CONTROLLER ── */
function initScrollReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('on');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));
}

/* ── DYNAMIC ASYNC STAT COUNTER ANIMATION ── */
function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.c, 10);
                let current = 0;
                const increment = target / 55;
                
                const interval = setInterval(() => {
                    current = Math.min(current + increment, target);
                    el.textContent = Math.floor(current) + (current >= target ? '+' : '');
                    if (current >= target) clearInterval(interval);
                }, 16);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-c]').forEach(el => counterObserver.observe(el));
}

/* ── MAC-STYLE MAGNETIC ADAPTIVE PILLS HOVER EFFECT ── */
function initMagneticSkills() {
    document.querySelectorAll('.sk-b').forEach(b => {
        b.addEventListener('mousemove', (e) => {
            const r = b.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.22;
            const y = (e.clientY - r.top - r.height / 2) * 0.22;
            b.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
        });
        b.addEventListener('mouseleave', () => {
            b.style.transform = '';
        });
    });
}

/* ── INTERACTIVE CANVAS AMBIENT CONSTELLATION FLUID ANIMATION ── */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W, H;
    const dots = [];
    
    const resize = () => {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < 60; i++) {
        dots.push({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.00016,
            vy: (Math.random() - 0.5) * 0.00016,
            r: Math.random() * 1.3 + 0.4,
            o: Math.random() * 0.18 + 0.05
        });
    }

    let mouseXNorm = 0.5, mouseYNorm = 0.5;
    document.addEventListener('mousemove', (e) => {
        mouseXNorm = e.clientX / window.innerWidth;
        mouseYNorm = e.clientY / window.innerHeight;
    }, { passive: true });

    const animate = () => {
        ctx.clearRect(0, 0, W, H);
        
        dots.forEach(d => {
            d.x += d.vx + (mouseXNorm - 0.5) * 0.00003;
            d.y += d.vy + (mouseYNorm - 0.5) * 0.00003;
            
            if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
            if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;
            
            ctx.beginPath();
            ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(29, 29, 31, ${d.o})`;
            ctx.fill();
        });

        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = (dots[i].x - dots[j].x) * W;
                const dy = (dots[i].y - dots[j].y) * H;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x * W, dots[i].y * H);
                    ctx.lineTo(dots[j].x * W, dots[j].y * H);
                    ctx.strokeStyle = `rgba(29, 29, 31, ${(0.07 * (1 - distance / 100)).toFixed(3)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}