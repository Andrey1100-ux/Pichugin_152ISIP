// script.js

// Функция для плавной прокрутки к якорям в навигации
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Проверяем, что ссылка ведёт к якорю на текущей странице
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20, // Отступ сверху для удобства
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Добавление эффекта появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами, которые должны появляться при прокрутке
    document.querySelectorAll('.map-container, .description, .icons-container, .contact-section').forEach(el => {
        observer.observe(el);
    });

    // Валидация email в блоке контактов
    const emailLink = document.querySelector('.contact-info a');
    if (emailLink) {
        // Исправление ошибки в href (ailto → mailto)
        const email = emailLink.textContent;
        emailLink.href = `mailto:${email}`;

        // Добавляем подсказку при наведении
        emailLink.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
            this.style.fontWeight = 'bold';
        });

        emailLink.addEventListener('mouseleave', function() {
            this.style.textDecoration = '';
            this.style.fontWeight = '';
        });
    }

    // Анимация карточек иконок при наведении (дополнительный эффект)
    document.querySelectorAll('.icon-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Адаптивное меню для мобильных устройств (если понадобится в будущем)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰ Меню';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 1000;
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
        `;

        document.body.insertBefore(mobileMenuBtn, nav);

        mobileMenuBtn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
                mobileMenuBtn.style.display = 'block';
            } else {
                nav.style.display = 'flex';
                mobileMenuBtn.style.display = 'none';
            }
        });
    };

    createMobileMenu();
});

// Дополнительная функция для отслеживания прокрутки и добавления класса к шапке
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '';
    }
});
