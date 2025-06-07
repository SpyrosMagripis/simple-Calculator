const display = document.getElementById('display');

function appendSymbol(symbol) {
    display.value += symbol;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        const expression = display.value
            .replace(/\u00D7/g, '*')
            .replace(/\u00F7/g, '/');
        const result = eval(expression);
        display.value = result;
    } catch {
        display.value = 'Error';
    }
}

// Click handlers
const buttons = document.querySelectorAll('.calculator-buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;
        if (action === 'clear') {
            clearDisplay();
        } else if (action === 'equals') {
            calculate();
        } else if (action === 'operator') {
            appendSymbol(` ${value} `);
        } else {
            appendSymbol(value);
        }
    });
});

// Keyboard support
document.addEventListener('keydown', e => {
    if (/\d/.test(e.key) || e.key === '.') {
        appendSymbol(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        appendSymbol(` ${e.key} `);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
