// 2script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Плавная прокрутка к якорям (если в будущем добавите якоря)
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику для якорей, если они появятся
            console.log('Нажата ссылка в меню:', this.textContent);
        });
    });

    // 2. Анимация появления карточек рек при прокрутке
    const riverCards = document.querySelectorAll('.river-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    riverCards.forEach(card => {
        cardObserver.observe(card);
    });

    // 3. Улучшенная анимация наведения на карточки рек
    riverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // 4. Эффект для кнопки «Следующая страница»
    const nextPageBtn = document.querySelector('.next-page-btn');

    if (nextPageBtn) {
        // Добавляем эффект пульсации при загрузке страницы
        setTimeout(() => {
            nextPageBtn.style.animation = 'pulse 2s infinite';
        }, 1000);

        // Убираем анимацию при наведении
        nextPageBtn.addEventListener('mouseenter', function() {
            this.style.animation = '';
        });

        nextPageBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }

    // 5. Адаптивное меню для мобильных устройств
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
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
            font-size: 0.9rem;
        `;

        document.body.insertBefore(mobileMenuBtn, nav);

        mobileMenuBtn.addEventListener('click', () => {
            const isNavVisible = nav.style.display === 'flex';
            nav.style.display = isNavVisible ? 'none' : 'flex';
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

        // Инициализируем отображение при загрузке
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
            mobileMenuBtn.style.display = 'block';
        }
    };

    createMobileMenu();

    // 6. Эффект параллакса для заголовка при прокрутке
    window.addEventListener('scroll', function() {
        const h1 = document.querySelector('h1');
        const scrollPosition = window.pageYOffset;

        h1.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    });

    // 7. Подсветка активной карточки при клике
    riverCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Убираем выделение у всех карточек
            riverCards.forEach(c => c.classList.remove('active'));
            // Добавляем выделение текущей
            this.classList.add('active');

            // Показываем информацию в консоли
            const riverName = this.querySelector('h3').textContent;
            console.log(`Выбрана река: ${riverName}`);
        });
    });
});

// 8. Функция для добавления CSS-анимаций (добавляем в head)
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        /* Анимация появления карточек */
        .river-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .river-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Эффект пульсации для кнопки */
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
            100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
        }

        /* Стиль активной карточки */
        .river-card.active {
            border: 2px solid #3498db;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
}

// Вызываем функцию добавления анимаций
addCSSAnimations();
