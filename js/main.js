function initRevealAnimation() {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (!revealItems.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
        observer.observe(item);
    });
}

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
        return;
    }

    const phrases = [
        'Cybersecurity Research',
        'CTF Competitions',
        'Vulnerability Research',
        'Web Security',
        'Binary Analysis',
        'Cryptography',
        'Network Protocol Security',
        'Mobile Security'
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typingElement.textContent = phrases[0];
        return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex = Math.max(charIndex - 1, 0);
        } else {
            charIndex = Math.min(charIndex + 1, currentPhrase.length);
        }

        typingElement.textContent = currentPhrase.slice(0, charIndex);

        let nextDelay = isDeleting ? 48 : 92;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            nextDelay = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            nextDelay = 320;
        }

        window.setTimeout(tick, nextDelay);
    };

    window.setTimeout(tick, 420);
}

function initSmoothAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector.length <= 1) {
                return;
            }

            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        return;
    }

    const feedbackNode = document.getElementById('contact-feedback');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) {
            return;
        }

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '发送中...';

        window.setTimeout(() => {
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

            if (feedbackNode) {
                feedbackNode.textContent = '消息已收到，我们会尽快联系你。';
            }
        }, 900);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimation();
    initTypingEffect();
    initSmoothAnchor();
    initContactForm();
});
