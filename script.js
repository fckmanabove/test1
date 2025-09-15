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
                result = Math.sin(value * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180);
                break;
            case 'tan':
                if (value % 180 === 90) {
                    result = 'Ошибка';
                } else {
                    result = Math.tan(value * Math.PI / 180);
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
        display.value = (result === 'Ошибка') ? result : result.toFixed(8).replace(/\.?0+$/, "");
    } catch (error) {
        display.value = 'Ошибка';
    }
}

function calculate() {
    if (display.value === 'Ошибка') return;
    let expression = display.value;

    try {
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/\^/g, '**');
        const safeCalc = new Function('return ' + expression);
        let result = safeCalc();
        
        if (!isFinite(result)) {
            throw new Error("Деление на ноль");
        }
        
        display.value = parseFloat(result.toFixed(10));
    } catch (error) {
        display.value = 'Ошибка';
    }
}

// НОВЫЙ КОД ДЛЯ ПОДДЕРЖКИ КЛАВИАТУРЫ
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Предотвращаем ввод букв и других символов в поле, если оно в фокусе
    if (document.activeElement === display) {
        event.preventDefault();
    }

    if (key >= '0' && key <= '9') {
        appendSymbol(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^' || key === '(' || key === ')') {
        // Заменяем клавиатурные * и / на символы калькулятора
        if (key === '*') appendSymbol('×');
        else if (key === '/') appendSymbol('÷');
        else appendSymbol(key);
    } else if (key === '.') {
        appendSymbol('.');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
