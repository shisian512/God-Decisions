// Get DOM elements
const decisionEntries = document.getElementById('decision-entries');
const addDecisionBtn = document.getElementById('add-decision-btn');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');

// Add decision entry
addDecisionBtn.addEventListener('click', () => {
    const decisionCount = decisionEntries.childElementCount + 1;
    if (decisionCount <= 4) {
        const newEntry = document.createElement('div');
        newEntry.className = 'decision-entry';
        newEntry.innerHTML = `
            <label for="decision${decisionCount}">Decision ${decisionCount}:</label>
            <input type="text" id="decision${decisionCount}">
        `;
        decisionEntries.appendChild(newEntry);
    } else {
        alert("Buy it from Godddd in your Dreammm !!!");
    }
});

// Calculate probabilities
calculateBtn.addEventListener('click', () => {
    const decisions = [];
    const inputs = decisionEntries.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            decisions.push(input.value.trim());
        }
    });

    if (decisions.length >= 2) {
        const probabilities = calculateProbabilities(decisions);
        printResult(probabilities);
    } else {
        alert('Please enter at least 2 decisions.');
    }
});

// Calculate probabilities
function calculateProbabilities(decisions) {
    const decisionCount = decisions.length;
    const totalCount = 100000;
    const probabilities = {};

    // Initialize probabilities
    decisions.forEach(decision => {
        probabilities[decision] = 0;
    });

    // Perform simulations
    for (let i = 0; i < totalCount; i++) {
        const randomIndex = Math.floor(Math.random() * decisionCount);
        const randomDecision = decisions[randomIndex];
        probabilities[randomDecision]++;
    }

    // Calculate percentages
    Object.keys(probabilities).forEach(decision => {
        probabilities[decision] = ((probabilities[decision] / totalCount) * 100).toFixed(2);
    });

    return probabilities;
}

// Print the result
function printResult(probabilities) {
    resultDiv.innerHTML = '';
    const resultText = document.createElement('p');
    for (const decision in probabilities) {
        const probability = probabilities[decision];
        resultText.innerHTML += `${decision}: ${probability}%<br>`;
    }
    resultDiv.appendChild(resultText);

    // Determine the decision with the highest probability
    const highestProbability = Math.max(...Object.values(probabilities));
    const highestDecision = Object.keys(probabilities).find(decision => probabilities[decision] === highestProbability);

    const finalResultText = document.createElement('p');
    finalResultText.innerHTML = `Result: ${highestDecision} has the highest probability.`;
    resultDiv.appendChild(finalResultText);
}
