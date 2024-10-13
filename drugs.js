// Load the Hebrew names and slang terms from the JSON file
async function loadHebrewNames() {
    const response = await fetch('hebrewNames.json');
    return await response.json();
}

// Fetch drug data from the PsychonautWiki API
async function fetchDrugs() {
    try {
        const [drugs, hebrewNames] = await Promise.all([
            fetch('https://api.psychonautwiki.org/v1/substances').then(res => res.json()),
            loadHebrewNames()
        ]);
        displayDrugs(drugs, hebrewNames);
    } catch (error) {
        console.error('Error fetching drug data or Hebrew names:', error);
    }
}

// Display the list of drugs and their corresponding Hebrew names and slang terms
function displayDrugs(drugs, hebrewNames) {
    const drugList = document.getElementById('drug-list');
    drugs.forEach(drug => {
        const listItem = document.createElement('li');
        const drugInfo = hebrewNames[drug.name] 
            ? `${hebrewNames[drug.name].hebrew} (${drug.name}) - כינויי סלנג: ${hebrewNames[drug.name].slang.join(', ')}`
            : drug.name;
        listItem.innerText = drugInfo;
        drugList.appendChild(listItem);
    });
}

// Call fetchDrugs when the page loads
window.onload = fetchDrugs;
