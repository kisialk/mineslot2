// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Copy promo code function
    window.copyPromoCode = function() {
        const promoCode = 'DAY100';
        navigator.clipboard.writeText(promoCode).then(() => {
            const btn = document.querySelector('.copy-promo-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="icon-copy"></i> Промокод скопирован!';
            btn.style.background = 'rgba(0, 255, 136, 0.2)';
            btn.style.borderColor = 'var(--accent-green)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            alert('Скопируйте промокод вручную: DAY100');
        });
    };
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.info-card, .benefit-card, .strategy-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
    
    // Update multiplier animation
    const multiplierValue = document.querySelector('.multiplier-value');
    if (multiplierValue) {
        let multiplier = 1.0;
        const updateMultiplier = () => {
            multiplier += (Math.random() * 0.2);
            if (multiplier > 100) multiplier = 1.0;
            multiplierValue.textContent = `x${multiplier.toFixed(2)}`;
        };
        setInterval(updateMultiplier, 500);
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Table row hover effects
    document.querySelectorAll('table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-card-hover)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Update all button URLs to use referral link
    const referralLinks = {
        'play': 'https://lknt.pro/969d',
        'demo': 'https://lknt.pro/969d',
        'register': 'https://lknt.pro/969d'
    };
    
    // Update play buttons
    document.querySelectorAll('.btn-primary, .nav-play-btn').forEach(btn => {
        if (btn.classList.contains('btn-primary') || btn.classList.contains('nav-play-btn')) {
            btn.href = referralLinks.play;
        }
    });
    
    // Update demo buttons
    document.querySelectorAll('.btn-secondary, .btn-demo').forEach(btn => {
        if (btn.href.includes('#demo')) {
            btn.addEventListener('click', function(e) {
                if (!this.getAttribute('target') || this.getAttribute('target') !== '_blank') {
                    e.preventDefault();
                    window.open(referralLinks.demo, '_blank');
                }
            });
        } else if (btn.classList.contains('btn-demo')) {
            btn.href = referralLinks.demo;
        }
    });
    
    // Set current year in footer
    const yearElement = document.querySelector('footer .footer-copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add active class to current section in nav
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const highlightNav = () => {
        let scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);
    
    // Initialize tooltips for risk labels
    const riskElements = document.querySelectorAll('.risk-low, .risk-medium, .risk-high, .risk-extreme');
    riskElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const riskType = this.classList.contains('risk-low') ? 'Низкий риск' :
                           this.classList.contains('risk-medium') ? 'Средний риск' :
                           this.classList.contains('risk-high') ? 'Высокий риск' : 'Экстремальный риск';
            
            const tooltip = document.createElement('div');
            tooltip.className = 'risk-tooltip';
            tooltip.textContent = riskType;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--bg-card)';
            tooltip.style.color = 'var(--text-primary)';
            tooltip.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
            tooltip.style.borderRadius = 'var(--radius-sm)';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.border = '1px solid var(--border-color)';
            
            this.appendChild(tooltip);
        });
        
        el.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.risk-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});