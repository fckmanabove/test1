const display = document.getElementById('result');

function appendSymbol(symbol) {
    if (display.value === 'Ошибка') {
        clearDisplay();
    }
    display.value += symbol;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Ошибка') {
        clearDisplay();
        return;
    }
    display.value = display.value.slice(0, -1);
}

function handleScientific(func) {
    if (display.value === 'Ошибка') clearDisplay();
    try {
        let value = parseFloat(display.value);
        if (isNaN(value)) return;

        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180); // Градусы в радианы
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180); // Градусы в радианы
                break;
            case 'tan':
                // Обработка тангенса 90 градусов
                if (value % 180 === 90) {
                    result = 'Ошибка';
                } else {
                    result = Math.tan(value * Math.PI / 180); // Градусы в радианы
                }
                break;
            case 'sqrt':
                if (value < 0) {
                    result = 'Ошибка';
                } else {
                    result = Math.sqrt(value);
                }
                break;
            case 'log':
                 if (value <= 0) {
                    result = 'Ошибка';
                } else {
                    result = Math.log10(value);
                }
                break;
            case 'ln':
                 if (value <= 0) {
                    result = 'Ошибка';
                } else {
                    result = Math.log(value);
                }
                break;
        }
        display.value = (result === 'Ошибка') ? result : result.toFixed(8);
    } catch (error) {
        display.value = 'Ошибка';
    }
}


function calculate() {
    if (display.value === 'Ошибка') return;
    let expression = display.value;

    try {
        // Заменяем пользовательские символы на стандартные для JavaScript
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/\^/g, '**');

        // Создаем безопасную функцию для вычисления, чтобы избежать прямого eval
        const safeCalc = new Function('return ' + expression);
        
        let result = safeCalc();
        
        // Проверяем на бесконечность (например, деление на 0)
        if (!isFinite(result)) {
            throw new Error("Деление на ноль");
        }
        
        // Округляем, если результат - число с плавающей точкой
        display.value = parseFloat(result.toFixed(10));

    } catch (error) {
        display.value = 'Ошибка';
    }
}

// Обработка нажатия Enter для ручного ввода
display.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
    }
});
