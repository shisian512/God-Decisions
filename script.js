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
        newEntry.classList.add('decision-entry');
        newEntry.innerHTML = `
            <label for="decision${decisionCount}">Decision ${decisionCount}:</label>
            <input type="text" id="decision${decisionCount}">
        `;
        decisionEntries.appendChild(newEntry);
    } else {
        alert("Buy it from Godddd in your Dreammm !!!");
    }
});

// Calculate decision probability
calculateBtn.addEventListener('click', () => {
    const decisionNames = Array.from(decisionEntries.getElementsByTagName('input')).map(input => input.value);
    const probabilities = {};
    const decisionCounts = {};

    // Initialize decision counts
    for (const decision of decisionNames) {
        decisionCounts[decision] = 0;
    }

    // Run simulation
    const n = 100000;
    for (let i = 0; i < n; i++) {
        const decision = decisionNames[Math.floor(Math.random() * decisionNames.length)];
        decisionCounts[decision]++;
    }

    // Calculate probabilities
    const total = Object.values(decisionCounts).reduce((sum, count) => sum + count, 0);
    for (const [decision, count] of Object.entries(decisionCounts)) {
        probabilities[decision] = (count / total) * 100;
    }

    // Find decision with the highest probability
    const result = Object.keys(probabilities).reduce((a, b) => probabilities[a] > probabilities[b] ? a : b);

    // Display result
    let resultHTML = '';
    for (const [decision, probability] of Object.entries(probabilities)) {
        resultHTML += `<p>${decision}: ${probability.toFixed(2)}%</p>`;
    }
    resultHTML += `<p>Result: ${result} has a higher probability.</p>`;
    resultDiv.innerHTML = resultHTML;
});
