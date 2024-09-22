// Funzione per calcolare la FC Max usando la formula di Gelish
function calculateFCMax(age) {
    return 207 - (0.7 * age);
}

// Funzione per calcolare la FC di allenamento usando la formula di Karvonen
function calculateFCAllenamento(restingHR, fcMax, intensity) {
    return restingHR + ((fcMax - restingHR) * (intensity / 100));
}

// Calcola per tutte le intensità desiderate (60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%)
function calculateMultipleIntensities(restingHR, fcMax) {
    const intensities = [60, 65, 70, 75, 80, 85, 90, 95];
    let results = intensities.map(intensity => {
        return {
            intensity,
            fc: Math.ceil(calculateFCAllenamento(restingHR, fcMax, intensity)) // Arrotonda per eccesso
        };
    });
    return results;
}

// Funzione principale che raccoglie i dati e calcola la FC di allenamento
function calculateFC() {
    let age = parseInt(document.getElementById('age').value);
    let restingHR = parseInt(document.getElementById('restingHR').value);

    if (isNaN(age) || isNaN(restingHR)) {
        document.getElementById('result').innerHTML = "Inserisci tutti i dati richiesti.";
        return;
    }

    let fcMax = calculateFCMax(age);
    let results = calculateMultipleIntensities(restingHR, fcMax);

    // Visualizza i risultati
    let resultText = `<p>La tua FC Max è: ${fcMax.toFixed(2)} bpm</p>`;
    results.forEach(result => {
        resultText += `<p>FC a ${result.intensity}%: ${result.fc} bpm</p>`;
    });

    document.getElementById('result').innerHTML = resultText;

    // Aggiungi il messaggio simpatico
    document.getElementById('message').innerHTML = "Ora da bravo/a astrosuino/a non ti rimane che allenarti!";
}

// Funzione per attivare la modalità scura/chiara
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
