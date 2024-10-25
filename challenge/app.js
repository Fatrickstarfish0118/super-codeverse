// Challenges array with descriptions and test functions
const challenges = [
    {
        description: "Write a function that reverses a string.",
        test: function(code) {
            try {
                let reverseFunction = new Function(code + '; return reverseString("CodeHero");');
                let result = reverseFunction();
                return result === "oreHedoC";
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that checks if a number is even.",
        test: function(code) {
            try {
                let evenFunction = new Function(code + '; return isEven(4);');
                let result = evenFunction();
                return result === true;
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that calculates the factorial of a number.",
        test: function(code) {
            try {
                let factorialFunction = new Function(code + '; return factorial(5);');
                let result = factorialFunction();
                return result === 120;
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that finds the largest number in an array.",
        test: function(code) {
            try {
                let largestFunction = new Function(code + '; return findLargest([1, 2, 3, 4, 5]);');
                let result = largestFunction();
                return result === 5;
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that counts the vowels in a string.",
        test: function(code) {
            try {
                let countVowelsFunction = new Function(code + '; return countVowels("Code Hero");');
                let result = countVowelsFunction();
                return result === 4;
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that sorts an array of numbers.",
        test: function(code) {
            try {
                let sortArrayFunction = new Function(code + '; return sortArray([5, 3, 8, 1]);');
                let result = sortArrayFunction();
                return JSON.stringify(result) === JSON.stringify([1, 3, 5, 8]);
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that merges two arrays.",
        test: function(code) {
            try {
                let mergeArraysFunction = new Function(code + '; return mergeArrays([1, 2], [3, 4]);');
                let result = mergeArraysFunction();
                return JSON.stringify(result) === JSON.stringify([1, 2, 3, 4]);
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that removes duplicates from an array.",
        test: function(code) {
            try {
                let removeDuplicatesFunction = new Function(code + '; return removeDuplicates([1, 2, 2, 3]);');
                let result = removeDuplicatesFunction();
                return JSON.stringify(result) === JSON.stringify([1, 2, 3]);
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that generates Fibonacci numbers.",
        test: function(code) {
            try {
                let fibonacciFunction = new Function(code + '; return fibonacci(5);');
                let result = fibonacciFunction();
                return result === 5;
            } catch (error) {
                return false;
            }
        }
    },
    {
        description: "Write a function that checks if a string is a palindrome.",
        test: function(code) {
            try {
                let palindromeFunction = new Function(code + '; return isPalindrome("racecar");');
                let result = palindromeFunction();
                return result === true;
            } catch (error) {
                return false;
            }
        }
    }
];

let currentLevel = 0;

document.addEventListener("DOMContentLoaded", function () {
    const levelNumber = document.getElementById('level-number');
    const challengeDescription = document.getElementById('challenge-description');
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultDisplay = document.getElementById('result');
    const homeBtn = document.getElementById('home-btn');

    // Load the first challenge
    loadChallenge();

    // Handle code submission
    submitBtn.addEventListener('click', function () {
        const userCode = codeInput.value;
        const challenge = challenges[currentLevel];
        
        if (challenge.test(userCode)) {
            resultDisplay.textContent = "Success! Moving to the next level...";
            currentLevel++;

            if (currentLevel < challenges.length) {
                loadChallenge();
            } else {
                resultDisplay.textContent = "Congratulations! You've completed all levels!";
                submitBtn.style.display = "none"; // Hide the submit button
                homeBtn.style.display = "block"; // Show the home button
            }
        } else {
            resultDisplay.textContent = "Failure. Try again.";
        }
    });

    // Handle going back home
    homeBtn.addEventListener('click', function () {
        currentLevel = 0;
        resultDisplay.textContent = '';
        loadChallenge();
        submitBtn.style.display = "block"; // Show the submit button
        homeBtn.style.display = "none"; // Hide the home button
    });

    function loadChallenge() {
        levelNumber.textContent = currentLevel + 1; // Display the current level (1-based)
        challengeDescription.textContent = challenges[currentLevel].description;
        codeInput.value = ''; // Clear previous code input
    }
});
