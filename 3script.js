// 3script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Интерактивные вопросы FAQ (раскрывающиеся ответы)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        // Изначально скрываем ответы
        answer.style.display = 'none';
        answer.style.transition = 'all 0.3s ease';

        question.style.cursor = 'pointer';
        question.style.userSelect = 'none'; // Запрещаем выделение текста заголовка

        question.addEventListener('click', function() {
            // Закрываем все остальные открытые ответы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('p');
            otherAnswer.style.display = 'none';
            otherItem.classList.remove('active');
                }
            });

            // Переключаем текущий ответ
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                item.classList.add('active');
            }
        });
    });

    // 2. Галерея изображений с модальным окном
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = createModal();
    const modalImg = modal.querySelector('.modal-content');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Закрытие модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close')) {
            modal.style.display = 'none';
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    // 3. Плавная прокрутка для навигации
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Нажата ссылка в меню:', this.textContent);
        });
    });

    // 4. Анимация появления элементов при прокрутке
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

    // Наблюдаем за важными элементами
    document.querySelectorAll('.faq-section, .contact-section, .pagination').forEach(el => {
        observer.observe(el);
    });

    // 5. Улучшенная подсветка ссылок в навигации при наведении
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#2980b9';
            this.style.background = '#f0f8ff';
        });

        link.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.background = '';
        });
    });

    // 6. Адаптивное меню для мобильных устройств
    createMobileMenu();
});

// Функция создания модального окна для галереи
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        justify-content: center;
        align-items: center;
    `;

    modal.innerHTML = `
        <span class="close" style="
            position: absolute;
            top: 20px;
            right: 35px;
            color: #fff;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        ">&times;</span>
        <img class="modal-content" style="
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
        ">
    `;

    document.body.appendChild(modal);
    return modal;
}

// Функция создания адаптивного меню
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰ Меню';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 1001;
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    `;

    document.body.insertAdjacentElement('afterbegin', mobileMenuBtn);

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

    // Инициализируем отображение при загрузке
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        mobileMenuBtn.style.display = 'block';
    }
}

// Добавляем CSS для анимации появления элементов
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        /* Анимация появления секций */
        .faq-section,
        .contact-section,
        .pagination {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .faq-section.visible,
        .contact-section.visible,
        .pagination.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Стиль активного вопроса в FAQ */
        .faq-item.active {
            background: #e3f2fd;
            border-left-color: #2196f3;
        }

        /* Плавное появление ответа в FAQ */
        .faq-item p {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
        }

        .faq-item.active p {
            max-height: 200px;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Вызываем функцию добавления анимаций
addCSSAnimations();
function goToPrevious() {
  window.location.href = "index.html";
}

function goToNext() {
  window.location.href = "contact.html";
}
