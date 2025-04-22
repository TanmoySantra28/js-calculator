// Initialize an empty string to store the current expression
let expression = '';

// Function to update the calculator display
function updateDisplay() {
    // Get the display input element
    const display = document.getElementById('display');
    // Update the display value, limiting the length to 13 characters
    display.value = expression.slice(0, 13);
}

// Function to append a value to the current expression
function appendValue(val) {
    // Define the allowed operators
    const operators = ['+', '-', '*', '/'];

    // Prevent consecutive operators (e.g., "+*")
    if (operators.includes(val) && operators.includes(expression.slice(-1))) {
        return;
    }

    // Prevent multiple consecutive dots (e.g., "...")
    if (val === '.' && expression.slice(-1) === '.') {
        return;
    }

    // Prevent adding multiple dots within the same number
    let lastOperatorIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );
    let lastNumber = expression.slice(lastOperatorIndex + 1);
    if (val === '.' && lastNumber.includes('.')) {
        return;
    }

    // Append the value if the expression is within the max length
    if (expression.length < 12) {
        expression += val;
        updateDisplay();
    }
}

// Function to clear the display and reset the expression
function clearDisplay() {
    // Reset the expression to an empty string
    expression = '';
    // Update the display
    updateDisplay();
}

// Function to delete the last character from the expression
function deleteLast() {
    // Remove the last character from the expression string
    expression = expression.slice(0, -1);
    // Update the display
    updateDisplay();
}

// Function to evaluate the expression and display the result
function calculate() {
    try {
        // Use the Function constructor to evaluate the expression safely
        expression = (new Function('return ' + expression))().toString();
        // Update the display with the result
        updateDisplay();
    } catch (e) {
        // Display "Error" if the expression is invalid
        expression = 'Error';
        updateDisplay();
    }
}

// Add an event listener for keyboard inputs
document.addEventListener('keydown', function(event) {
    // Define the allowed keys for input
    const allowedKeys = '0123456789+-*/.=BackspaceEnter';

    // Check if the pressed key is allowed
    if (allowedKeys.includes(event.key)) {
        // Calculate the result if "Enter" or "=" is pressed
        if (event.key === 'Enter' || event.key === '=') {
            calculate();
        }
        // Delete the last character if "Backspace" is pressed
        else if (event.key === 'Backspace') {
            deleteLast();
        }
        // Append the key value to the expression otherwise
        else {
            appendValue(event.key);
        }
    }
});
