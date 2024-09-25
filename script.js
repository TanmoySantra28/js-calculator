let expression = '';

//update the display with a max length of 13 characters
function updateDisplay() 
{
    const display = document.getElementById('display');
    display.value = expression.slice(0, 13);
}

//append value to the expression
function appendValue(val) 
{
    const operators = ['+', '-', '*', '/'];
    //prevent consecutive operators
    if (operators.includes(val) && operators.includes(expression.slice(-1))) 
    {
        return;
    }
    //prevent multiple dots in the same number
    if (val === '.' && expression.slice(-1) === '.') 
    {
        return;
    }
    //prevent adding a dot if there's already one in the current number
    let lastOperatorIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );
    let lastNumber = expression.slice(lastOperatorIndex + 1);
    if (val === '.' && lastNumber.includes('.')) 
    {
        return;
    }
    if (expression.length < 12) 
    {
        expression += val;
        updateDisplay();
    }
}

//clear the display
function clearDisplay() 
{
    expression = '';
    updateDisplay();
}

//delete the last character
function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

//calculation logic
function calculate() 
{
    try {
        expression = (new Function('return ' + expression))().toString();  // Safer than eval()
        updateDisplay();
    } catch (e) {
        expression = 'Error';
        updateDisplay();
    }
}

//keyboard input
document.addEventListener('keydown', function(event) 
{
    const allowedKeys = '0123456789+-*/.=BackspaceEnter';
    if (allowedKeys.includes(event.key)) {
        if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Backspace') {
            deleteLast();
        } else {
            appendValue(event.key);
        }
    }
});
