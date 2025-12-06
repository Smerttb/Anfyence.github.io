// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎮 AnfyenceClient 2025 загружен!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%c📱 Telegram: @AnfyenceHack', 'color: #0088cc;');
    console.log('%c🎮 Discord: https://discord.gg/wbJVMgsb', 'color: #5865F2;');
    
    // Инициализация функций
    initCountdown();
    initDownloadButton();
    initModal();
    initSocialButtons();
    initAnimations();
    initConfetti();
});

// Обратный отсчет до Нового 2025 года
function initCountdown() {
    const targetDate = new Date('January 1, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Новый год наступил
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Анимация при смене секунд
        if (seconds % 5 === 0) {
            animateCountdownItem('seconds');
        }
    }
    
    // Обновляем каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Анимация элемента счетчика
function animateCountdownItem(elementId) {
    const element = document.getElementById(elementId);
    element.style.transform = 'scale(1.2)';
    element.style.color = '#10b981';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 300);
}

// Кнопка скачивания
function initDownloadButton() {
    const downloadBtn = document.getElementById('download-main');
    const variantBtns = document.querySelectorAll('.variant-btn');
    
    downloadBtn.addEventListener('click', function() {
        showDownloadModal();
    });
    
    variantBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            showToast(`Подготовка скачивания для ${platform}...`);
        });
    });
}

// Модальное окно скачивания
function initModal() {
    const modal = document.getElementById('downloadModal');
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.modal-cancel');
    const directDownload = document.getElementById('directDownload');
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '0%';
        clearInterval(countdownInterval);
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    directDownload.addEventListener('click', function() {
        startDownload();
        closeModal();
    });
}

// Показать модальное окно скачивания
function showDownloadModal() {
    const modal = document.getElementById('downloadModal');
    const progressFill = document.querySelector('.progress-fill');
    const countdownElement = document.getElementById('countdown');
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Сброс прогресса
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    
    // Анимация прогресса
    setTimeout(() => {
        progressFill.style.transition = 'width 3s linear';
        progressFill.style.width = '100%';
    }, 10);
    
    // Обратный отсчет 3 секунды
    let countdown = 3;
    countdownElement.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            startDownload();
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 1000);
        }
    }, 1000);
}

// Запуск скачивания
function startDownload() {
    showToast('Скачивание началось! Проверьте папку "Загрузки".');
    
    // В реальном проекте здесь будет ссылка на файл
    // window.location.href = 'https://example.com/AnfyenceClient2025.exe';
    
    // Для демо - имитация скачивания
    simulateDownload();
}

// Имитация скачивания (для демо)
function simulateDownload() {
    const downloadEvent = new CustomEvent('downloadStarted', {
        detail: {
            filename: 'AnfyenceClient_v3.0_2025.exe',
            size: '156 MB'
        }
    });
    window.dispatchEvent(downloadEvent);
    
    // Обновляем статистику
    updateDownloadStats();
}

// Обновление статистики скачиваний
function updateDownloadStats() {
    const statsElement = document.querySelector('.download-stats .stat:nth-child(1) span');
    const currentDownloads = parseInt(statsElement.textContent.replace(/\D/g, '')) || 102847;
    const newDownloads = currentDownloads + 1;
    
    // Анимация увеличения числа
    animateNumber(statsElement, currentDownloads, newDownloads, 500);
    
    // Сохраняем в localStorage для демо
    localStorage.setItem('anfyenceDownloads', newDownloads);
}

// Анимация числа
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + ' скачиваний';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Социальные кнопки
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn, .btn-telegram, .btn-discord');
    
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showToast('Функция в разработке');
            }
        });
    });
}

// Анимации элементов
function initAnimations() {
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    document.querySelectorAll('.feature-card, .social-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Параллакс эффект
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Конфетти эффект
function initConfetti() {
    const confettiContainer = document.querySelector('.confetti-effect');
    
    // Создаем конфетти только на десктопе
    if (window.innerWidth > 768) {
        for (let i = 0; i < 50; i++) {
            createConfettiPiece(confettiContainer);
        }
    }
}

function createConfettiPiece(container) {
    const piece = document.createElement('div');
    const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    piece.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${color};
        top: -20px;
        left: ${Math.random() * 100}vw;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: confettiFall ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(piece);
}

// Добавляем стили для анимации конфетти
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100px) rotate(0deg) translateX(0);
        }
        100% {
            transform: translateY(100vh) rotate(360deg) translateX(${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Toast уведомления
function showToast(message, type = 'info') {
    // Проверяем, есть ли уже активный toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: toastSlideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        max-width: 350px;
    `;
    
    document.body.appendChild(toast);
    
    // Кнопка закрытия
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        'info': 'linear-gradient(135deg, #6366f1, #4f46e5)',
        'success': 'linear-gradient(135deg, #10b981, #059669)',
        'warning': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'error': 'linear-gradient(135deg, #ef4444, #dc2626)'
    };
    return colors[type] || colors.info;
}

// Добавляем стили для toast
const toastAnimationStyle = document.createElement('style');
toastAnimationStyle.textContent = `
    @keyframes toastSlideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes toastSlideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        line-height: 1;
    }
`;
document.head.appendChild(toastAnimationStyle);

// Обработка событий
window.addEventListener('downloadStarted', function(e) {
    console.log('Скачивание началось:', e.detail);
    showToast(`Скачивание ${e.detail.filename} (${e.detail.size})`, 'success');
});

// Загрузка статистики из localStorage
window.addEventListener('load', function() {
    const savedDownloads = localStorage.getItem('anfyenceDownloads');
    if (savedDownloads) {
        const statsElement = document.querySelector('.download-stats .stat:nth-child(1) span');
        statsElement.textContent = parseInt(savedDownloads).toLocaleString() + ' скачиваний';
    }
});

// Эффект печатания для заголовка
function initTypewriter() {
    const title = document.querySelector('.hero-main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    // Запускаем через 1 секунду
    setTimeout(type, 1000);
}

// Запускаем эффект печатания
setTimeout(initTypewriter, 500);

// Эффект при наведении на кнопки
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});
