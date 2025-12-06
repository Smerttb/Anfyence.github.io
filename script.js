// Обратный отсчет до Нового Года
function updateCountdown() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Добавляем эффект мигания в последние 10 секунд каждого часа
    if (minutes === 59 && seconds >= 50) {
        document.getElementById('seconds').style.animation = 'pulse 0.5s infinite';
    } else {
        document.getElementById('seconds').style.animation = '';
    }
}

// Праздничные конфетти
function createConfetti() {
    const confettiCount = 50;
    const container = document.querySelector('.snowflakes');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${['#ff4757', '#ffdd59', '#70a1ff', '#2ecc71'][Math.floor(Math.random() * 4)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: fallConfetti ${Math.random() * 5 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(confetti);
    }
}

// Анимация падения конфетти
const style = document.createElement('style');
style.textContent = `
    @keyframes fallConfetti {
        0% {
            transform: translateY(-100px) rotate(0deg) translateX(0);
        }
        100% {
            transform: translateY(100vh) rotate(360deg) translateX(${Math.random() * 100 - 50}px);
        }
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Случайные новогодние сообщения
const messages = [
    "С Новым Годом! 🎄",
    "Пусть сбываются все мечты! ✨",
    "Удачи в играх! 🎮",
    "AnfyenceClient желает веселья! 🎉",
    "Готовьтесь к празднику! 🎁"
];

function showRandomMessage() {
    const message = messages[Math.floor(Math.random() * messages.length)];
    console.log(`🎅 ${message}`);
}

// Скачивание файла
function setupDownloadButton() {
    const downloadBtn = document.querySelector('.btn-primary.btn-large');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Показываем сообщение
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Скачивание...';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            alert('Скачивание началось! Проверьте папку "Загрузки".');
            
            // Здесь можно добавить реальную ссылку для скачивания
            // window.location.href = 'ссылка_на_файл';
        }, 1500);
    });
}

// Праздничные звуки при наведении
function setupHoverSounds() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Можно добавить звуковой эффект
            console.log('🔔 Праздничный звук!');
        });
    });
}

// Эффект мерцания для элементов
function setupTwinkleEffects() {
    const elements = document.querySelectorAll('.feature-icon, .step-number');
    
    elements.forEach(el => {
        setInterval(() => {
            el.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${el.style.backgroundColor}`;
        }, 1000);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем обратный отсчет
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Создаем конфетти
    createConfetti();
    
    // Показываем случайное сообщение
    showRandomMessage();
    setInterval(showRandomMessage, 30000);
    
    // Настраиваем кнопки
    setupDownloadButton();
    setupHoverSounds();
    setupTwinkleEffects();
    
    // Добавляем эффект параллакса для снежинок
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const snowflakes = document.querySelector('.snowflakes');
        snowflakes.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    // Новогоднее приветствие
    console.log('%c🎄 С Новым Годом от AnfyenceClient! 🎄', 'color: #ff4757; font-size: 18px; font-weight: bold;');
    console.log('%c✨ Пусть этот год принесет много побед и веселья! ✨', 'color: #70a1ff; font-size: 14px;');
});

// Эффект печатания для заголовка (опционально)
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
    
    // Запускаем через 1 секунду после загрузки
    setTimeout(type, 1000);
}

// Добавляем в инициализацию
typeWriterEffect();
