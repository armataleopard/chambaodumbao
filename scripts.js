// Анимация появления элементов при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fact, .dog-block, .section-heading');
    
    // Показать элементы при прокрутке
    function showElementsOnScroll() {
        animatedElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    }
    
    // Вызвать один раз для элементов, которые уже видны
    showElementsOnScroll();
    
    // Затем вызывать при прокрутке
    window.addEventListener('scroll', showElementsOnScroll);
    
    // Добавление случайного поворота для собак в галерее
    const dogBlocks = document.querySelectorAll('.dog-block');
    dogBlocks.forEach(function(block) {
        const randomRotation = (Math.random() * 6) - 3; // от -3 до 3 градуса
        block.style.transform = `rotate(${randomRotation}deg)`;
        
        // Делаем собак перетаскиваемыми
        makeDraggable(block);
    });
    
    // Раскрытие Dumbplan при клике на кнопку
    const unfoldBtn = document.getElementById('unfoldBtn');
    const dumbplanContent = document.getElementById('dumbplanContent');
    
    if (unfoldBtn && dumbplanContent) {
        unfoldBtn.addEventListener('click', function() {
            dumbplanContent.classList.toggle('hidden');
            
            if (!dumbplanContent.classList.contains('hidden')) {
                dumbplanContent.classList.add('visible');
                dumbplanContent.scrollIntoView({behavior: 'smooth', block: 'center'});
                unfoldBtn.textContent = 'Ладно, хватит читать';
            } else {
                unfoldBtn.textContent = 'Click here if you can read';
            }
        });
    }
    
    // Собачий лай при клике на собак
    const dogImages = document.querySelectorAll('.dog-block img');
    
    dogImages.forEach(function(img) {
        img.addEventListener('click', function() {
            playRandomBark();
            
            // Дополнительная анимация при клике
            const parentBlock = this.parentElement;
            parentBlock.style.transform = 'scale(1.05) rotate(-5deg)';
            setTimeout(() => {
                parentBlock.style.transform = '';
            }, 500);
        });
    });

    // Случайный звук лая
    function playRandomBark() {
        // Эмулируем звуки лая текстовыми сообщениями
        const barks = ['Гав!', 'Тяф!', 'ВАУ-ВАУ!', 'РРРР!', 'АУУУ!'];
        const randomBark = barks[Math.floor(Math.random() * barks.length)];
        
        // Создаем временный элемент для отображения лая
        const barkElement = document.createElement('div');
        barkElement.className = 'bark-bubble';
        barkElement.textContent = randomBark;
        document.body.appendChild(barkElement);
        
        // Располагаем рядом с курсором
        document.addEventListener('mousemove', positionBark);
        
        function positionBark(e) {
            barkElement.style.left = (e.clientX + 10) + 'px';
            barkElement.style.top = (e.clientY - 20) + 'px';
        }
        
        // Удаляем через некоторое время
        setTimeout(() => {
            document.removeEventListener('mousemove', positionBark);
            document.body.removeChild(barkElement);
        }, 1200);
    }

    // Стили для пузырей с лаем
    const barkStyle = document.createElement('style');
    barkStyle.textContent = `
        .bark-bubble {
            position: fixed;
            background: #ffeb3b;
            color: #000;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 16px;
            z-index: 9999;
            pointer-events: none;
            border: 2px solid #000;
            animation: barkPop 1s forwards;
        }
        
        @keyframes barkPop {
            0% { transform: scale(0); opacity: 0; }
            20% { transform: scale(1.2); opacity: 1; }
            80% { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(barkStyle);
    
    // "Живые" буквы в заголовке
    animateCharacters();
    
    function animateCharacters() {
        const mainTitle = document.querySelector('.site-name');
        if (mainTitle) {
            const text = mainTitle.textContent;
            mainTitle.textContent = '';
            
            for (let i = 0; i < text.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = text[i];
                charSpan.className = 'bouncing-char';
                charSpan.style.animationDelay = `${i * 0.1}s`;
                mainTitle.appendChild(charSpan);
            }
        }
        
        // Стиль для прыгающих букв
        const charStyle = document.createElement('style');
        charStyle.textContent = `
            .bouncing-char {
                display: inline-block;
                animation: charBounce 2s infinite;
            }
            
            @keyframes charBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
        `;
        document.head.appendChild(charStyle);
    }
    
    // Дополнительный хаос при наведении на кнопки
    const allButtons = document.querySelectorAll('.button');
    
    allButtons.forEach(function(button) {
        button.addEventListener('mouseover', function() {
            const randomColor = getRandomColor();
            this.style.backgroundColor = randomColor;
        });
        
        button.addEventListener('mouseout', function() {
            // Вернуть исходный цвет фона
            this.style.backgroundColor = '';
        });
    });
    
    function getRandomColor() {
        const colors = ['#ffeb3b', '#ff9800', '#ff4081', '#7c4dff', '#00e5ff', '#76ff03'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Функция для перетаскивания элементов
    function makeDraggable(element) {
        let isDragging = false;
        let initialX, initialY;
        let xOffset = 0, yOffset = 0;
        
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: false });
        
        function startDrag(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            
            e.preventDefault();
            isDragging = true;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
            
            // Увеличить z-index, чтобы элемент был поверх других
            const oldZIndex = element.style.zIndex;
            element.style.zIndex = '1000';
            
            // Вернуть исходный z-index после перетаскивания
            function endDrag() {
                isDragging = false;
                element.style.zIndex = oldZIndex;
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', endDrag);
                document.removeEventListener('touchend', endDrag);
            }
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === 'touchmove') {
                    xOffset = e.touches[0].clientX - initialX;
                    yOffset = e.touches[0].clientY - initialY;
                } else {
                    xOffset = e.clientX - initialX;
                    yOffset = e.clientY - initialY;
                }
                
                setTranslate(xOffset, yOffset, element);
            }
        }
        
        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${(Math.random() * 6) - 3}deg)`;
        }
    }
    
    // Добавить курсор в виде собаки
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    // CSS для собачьего курсора
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23FFC107" d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256s256-114.84,256-256S397.16,0,256,0z"/><path fill="%23795548" d="M150,150c-16.57,0-30,13.43-30,30s13.43,30,30,30s30-13.43,30-30S166.57,150,150,150z M362,150c-16.57,0-30,13.43-30,30s13.43,30,30,30s30-13.43,30-30S378.57,150,362,150z"/><path fill="%23212121" d="M362,210c-16.57,0-30,13.43-30,30s13.43,30,30,30s30-13.43,30-30S378.57,210,362,210z M150,210c-16.57,0-30,13.43-30,30s13.43,30,30,30s30-13.43,30-30S166.57,210,150,210z"/><path fill="%23FF5722" d="M240,301v30c0,8.28,6.72,15,15,15h2c8.28,0,15-6.72,15-15v-30H240z"/></svg>');
            background-size: contain;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        
        body {
            cursor: none;
        }
        
        a, button, .dog-block, .button {
            cursor: none;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Отслеживание движений мыши для курсора
    document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        // Добавляем небольшую анимацию при движении
        customCursor.style.transform = `translate(-50%, -50%) rotate(${Math.sin(Date.now() / 300) * 10}deg)`;
    });
    
    // Изменение размера курсора при клике
    document.addEventListener('mousedown', function() {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    
    document.addEventListener('mouseup', function() {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Эффект "конфетти" при прокрутке до конца страницы
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            createConfetti();
        }
    });
    
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = getRandomColor();
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 4000);
    }
    
    // CSS для конфетти
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        .confetti-container {
            position: fixed;
            top: -20px;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 9998;
            pointer-events: none;
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #ffeb3b;
            animation: confettiFall 4s linear forwards;
        }
        
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(confettiStyle);
}); 