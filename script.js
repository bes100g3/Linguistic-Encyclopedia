document.getElementById('searchBtn').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';  

    if (!word) {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    resultDiv.style.display = 'block';

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `<h2>${data[0].word}</h2>`;
            data[0].meanings.forEach(meaning => {
                meaning.definitions.forEach(definition => {
                    resultDiv.innerHTML += `<p><strong>Definition:</strong> ${definition.definition}</p>`;
                });
            });
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
});
