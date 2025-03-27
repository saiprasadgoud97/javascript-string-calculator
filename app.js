document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const numbersInput = document.getElementById('numbers');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', function() {
        try {
            let input = numbersInput.value.trim();
            
            input = input.replace(/\\n/g, '\n');
            
            const sum = add(input);
            
            resultDiv.textContent = `Result: ${sum}`;
            resultDiv.className = 'result success';
            resultDiv.style.display = 'block';
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
            resultDiv.className = 'result error';
            resultDiv.style.display = 'block';
        }
    });
});