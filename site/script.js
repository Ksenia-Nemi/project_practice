// Обработка формы подписки на новости
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Спасибо за подписку! На адрес ' + email + ' будут отправляться новости проекта.');
            this.reset();
        });
    }

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем при загрузке страницы

    // Обработка загрузки фото
    const photoUpload = document.getElementById('photo-upload');
    const uploadButton = document.querySelector('.upload-button');

    photoUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                // Здесь можно добавить предпросмотр изображения
                uploadButton.innerHTML = '<i class="fas fa-check"></i> Фото загружено';
                uploadButton.classList.add('success');
                
                // Имитация обработки фото
                setTimeout(() => {
                    alert('Ваше фото успешно загружено! Скоро вы получите рекомендации по стилю.');
                    uploadButton.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Загрузить фото';
                    uploadButton.classList.remove('success');
                }, 2000);
            } else {
                alert('Пожалуйста, выберите изображение');
            }
        }
    });

    // Добавление стилей для анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s, transform 0.6s;
        }
        
        .feature-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .main-nav.active {
            display: block;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .upload-button.success {
            background-color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);

    // Добавление эффекта параллакса для hero-секций
    const heroSections = document.querySelectorAll('.hero, .about-hero, .team-hero, .journal-hero, .resources-hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        heroSections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrollPosition * speed);
            section.style.backgroundPositionY = yPos + 'px';
        });
    });
}); 