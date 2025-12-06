// Обратный отсчет до Нового 2025 Года
function updateCountdown() {
    const now = new Date();
    const newYear = new Date('January 1, 2025 00:00:00');
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Специальные эффекты
    if (days === 0) {
        document.querySelector('.christmas-countdown').style.animation = 'pulse 1s infinite';
    }
}

// Модальное окно для скачивания
function setupDownloadModal() {
    const downloadBtn = document.getElementById('download-btn');
    const modal = document.getElementById('downloadModal');
    const closeBtn = document.querySelector('.close-modal');
    const directDownload = document.getElementById('direct-download');
    const progressBar = document.querySelector('.progress-bar');

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Анимация прогресса
        progressBar.style.animation = 'progress 3s linear forwards';

        // Запуск скачивания через 3 секунды
        setTimeout(() => {
            // Здесь будет реальная ссылка для скачивания
            // window.location.href = 'ссылка_на_клиент';
            
            // Временное сообщение
            alert('Скачивание началось! Проверьте папку "Загрузки".');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 3000);
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        progressBar.style.animation = 'none';
    });

    directDownload.addEventListener('click', (e) => {
        e.preventDefault();
        // Прямая ссылка для скачивания
        window.location.href = 'https://example.com/AnfyenceClient2025.exe';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            progressBar.style.animation = 'none';
        }
    });
}

// Социальные счетчики (анимация)
function animateSocialCounters() {
    const counters = document.querySelectorAll('.social-stats span');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, target);
            }
        };
        
        updateCounter();
    });
}

// Эффект параллакса для 2025 элементов
function setup2025Effects() {
    const yearElements = document.querySelectorAll('.year-2025, .year-badge');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        yearElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Новогодние уведомления
function showNewYearNotifications() {
    const messages = [
        "🎉 AnfyenceClient 2025 готов к празднику!",
        "✨ Новые функции ждут вас!",
        "🎮 Улучшенный геймплей в 2025",
        "🎁 Эксклюзивные скины для подписчиков",
        "⚡ Оптимизация производительности +200%"
    ];
    
    let index = 0;
    
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            console.log(`📢 ${messages[index]}`);
            showToast(messages[index]);
            index = (index + 1) % messages.length;
        }
    }, 30000);
}

// Toast-уведомления
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-bell"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 255, 136, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: bold;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Добавляем CSS для toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

// Проверка года
function checkYear() {
    const now = new Date();
    if (now.getFullYear() >= 2025) {
        document.querySelector('.year-2025').textContent = '2025 ✓';
        document.querySelector('.year-2025').style.color = '#00ff88';
    }
}

// Telegram/Discord статистика
function updateSocialStats() {
    // Можно добавить реальную статистику через API
    const stats = {
        telegram: 5000,
        discord: 3000,
        downloads: 102847
    };
    
    // Обновляем числа на странице
    document.querySelectorAll('.social-stats span').forEach(span => {
        if (span.textContent.includes('участников')) {
            const platform = span.closest('.social-card').classList.contains('telegram-card') ? 'telegram' : 'discord';
            span.innerHTML = `<i class="fas fa-users"></i> ${stats[platform].toLocaleString()}+ участников`;
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎄 AnfyenceClient 2025 запущен! 🎄', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%c📱 Telegram: https://t.me/AnfyenceHack', 'color: #0088cc; font-size: 14px;');
    console.log('%c🎮 Discord: https://discord.gg/wbJVMgsb', 'color: #5865F2; font-size: 14px;');
    
    // Основные функции
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    setupDownloadModal();
    animateSocialCounters();
    setup2025Effects();
    checkYear();
    updateSocialStats();
    
    // Запускаем уведомления через 5 секунд
    setTimeout(showNewYearNotifications, 5000);
    
    // Эффект печатания для заголовка
    typeWriterEffect();
    
    // Анимация для новогодних элементов
    createSnowflakes();
    
    // Добавляем эффект при наведении на социальные кнопки
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) rotate(5deg)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
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
    
    setTimeout(type, 1000);
}

function createSnowflakes() {
    const container = document.querySelector('.snowflakes');
    
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: white;
            border-radius: 50%;
            top: -20px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: fall ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            filter: blur(${Math.random() * 2}px);
        `;
        container.appendChild(snowflake);
    }
}

// Добавляем анимацию падения
const snowStyle = document.createElement('style');
snowStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100px) rotate(0deg) translateX(0);
        }
        100% {
            transform: translateY(100vh) rotate(360deg) translateX(${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(snowStyle);
