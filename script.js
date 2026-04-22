document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    window.copyPromoCode = function() {
        const promoCode = 'DAY100';
        navigator.clipboard.writeText(promoCode).then(function() {
            const btn = document.querySelector('.copy-promo-btn');
            if (!btn) {
                return;
            }
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="icon-copy"></i> Промокод скопирован!';
            btn.style.background = 'rgba(0, 255, 136, 0.2)';
            btn.style.borderColor = 'var(--accent-green)';
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(function() {
            alert('Скопируйте промокод вручную: DAY100');
        });
    };

    const multiplierValue = document.querySelector('.multiplier-value');
    if (multiplierValue) {
        let multiplier = 1.0;
        setInterval(function() {
            multiplier += Math.random() * 0.2;
            if (multiplier > 100) {
                multiplier = 1.0;
            }
            multiplierValue.textContent = 'x' + multiplier.toFixed(2);
        }, 500);
    }

    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                header.style.background = 'rgba(18, 18, 18, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
            } else {
                header.style.background = '';
                header.style.backdropFilter = '';
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === path) {
            link.style.color = 'var(--text-primary)';
        }
    });

    const affiliateLink = 'https://lknt.pro/bc30';
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-demo, .nav-play-btn').forEach(function(link) {
        if (link.tagName.toLowerCase() === 'a') {
            link.setAttribute('href', affiliateLink);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'nofollow noopener noreferrer');
        }
    });

    const yearElement = document.querySelector('footer .footer-copyright p');
    if (yearElement) {
        const currentYear = String(new Date().getFullYear());
        yearElement.innerHTML = yearElement.innerHTML.replace(/\b20\d{2}\b/, currentYear);
    }
});