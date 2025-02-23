async function search() {
    let input = document.getElementById("search").value.trim();
    let definitionBox = document.getElementById("definition");

    // ✅ Clear definition if input is empty
    if (!input) {
        definitionBox.innerHTML = "";
        return;
    }

    try {
        console.log("Searching for:", input);

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        
        if (!response.ok) {
            throw new Error("Word not found.");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.length > 0 && data[0].meanings.length > 0) {
            const definition = data[0].meanings[0].definitions[0].definition;
            definitionBox.innerHTML = definition;
        } else {
            definitionBox.innerHTML = "Definition not found.";
        }
    } catch (error) {
        console.error("Error:", error.message);
        definitionBox.innerHTML = "Error: " + error.message;
    }
}
