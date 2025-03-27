/**
 * String Calculator
 * 
 * @param {string} numbers - String of numbers separated by delimiters
 * @returns {number} Sum of the numbers
 * @throws {Error} If negative numbers are present
 */


function add(numbers) {
    if (!numbers) {
        return 0;
    }

    let delimiter = /[,\n]/; // Default delimiters: comma and newline
    let numbersString = numbers;

    // Check for custom delimiter
    if (numbers.startsWith('//')) {
        const delimiterEndIndex = numbers.indexOf('\n');
        const customDelimiter = numbers.substring(2, delimiterEndIndex);
        delimiter = new RegExp(`[${customDelimiter},\n]`); // Include newline in regex
        numbersString = numbers.substring(delimiterEndIndex + 1);
    }

    // Split the numbers string using the delimiter regex
    const numbersArray = numbersString.split(delimiter).map(num => {
        const parsed = parseInt(num, 10);
        return isNaN(parsed) ? 0 : parsed;
    });

    // Check for negative numbers
    const negatives = numbersArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }

    // Sum numbers ignoring those >= 1000
    return numbersArray.reduce((sum, num) => (num < 1000 ? sum + num : sum), 0);
}


// Test cases
function runTests() {
    const tests = [
        { input: "", expected: 0 },
        { input: "1", expected: 1 },
        { input: "1,5", expected: 6 },
        { input: "1\n2,3", expected: 6 },
        { input: "//;\n1;2", expected: 3 },
        { input: "1000,2000,3", expected: 3 }, // Numbers >= 1000 are ignored
        { input: "//|\n1|2|3", expected: 6 },
        { input: "//sep\n2sep3", expected: 5 }
    ];

    const negativeTests = [
        { input: "-1,2", expectedError: "negative numbers not allowed -1" },
        { input: "2,-4,3,-5", expectedError: "negative numbers not allowed -4,-5" }
    ];

    console.log("Running positive tests...");
    tests.forEach((test, index) => {
        try {
            const result = add(test.input);
            if (result === test.expected) {
                console.log(`Test ${index + 1} PASSED: "${test.input}" → ${result}`);
            } else {
                console.error(`Test ${index + 1} FAILED: Expected ${test.expected} but got ${result}`);
            }
        } catch (error) {
            console.error(`Test ${index + 1} FAILED with exception: ${error.message}`);
        }
    });

    console.log("\nRunning negative number tests...");
    negativeTests.forEach((test, index) => {
        try {
            add(test.input);
            console.error(`Test N${index + 1} FAILED: Expected exception but none was thrown`);
        } catch (error) {
            if (error.message === test.expectedError) {
                console.log(`Test N${index + 1} PASSED: Got expected exception "${error.message}"`);
            } else {
                console.error(`Test N${index + 1} FAILED: Expected "${test.expectedError}" but got "${error.message}"`);
            }
        }
    });
}

// Run tests when loaded in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { add };
    runTests();
}