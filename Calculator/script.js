document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const expressionDisplay = document.getElementById('expression-display');
    const buttons = Array.from(document.querySelectorAll('button'));
    let currentInput = '0';
    let expression = '';
    let operator = null;
    let previousInput = null;
    let shouldResetScreen = false;                                                                                                      

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (value === 'clear') {
                clear();
            } else if (value === 'del') {
                deleteLast();
            } else if (value === '=') {
                evaluate();
            } else {
                handleOperator(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (shouldResetScreen) {
            currentInput = value;
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }
        expression += value;
    }

    function handleOperator(value) {
        if (operator !== null) evaluate();
        previousInput = currentInput;
        operator = value;
        shouldResetScreen = true;
        expression += ' ' + value + ' ';
    }

    function evaluate() {
        if (operator === null || shouldResetScreen) return;

        let result;
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    showError('Cannot divide by zero');
                    return;
                }
                result = a / b;
                break;
            case '%':
                result = a % b;
                break;
            case '√':
                result = Math.sqrt(a);
                break;
            default:
                return ;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = null;
        shouldResetScreen = true;
        expression += ' = ' + currentInput;
    }

    function clear() {
        currentInput = '0';
        expression = '';
        operator = null;
        previousInput = null;
    }

    function deleteLast() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        expression = expression.slice(0, -1);
    }

    function updateDisplay() {
        display.innerText = currentInput;
        expressionDisplay.innerText = expression || '0';
    }

    function showError(message) {
        display.innerText = 'Error';
        setTimeout(() => {
            display.innerText = currentInput;
        }, 2000);
    }
});
