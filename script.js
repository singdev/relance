loadAllForm();

function loadAllForm() {
    fetch("https://app.bloquercovid19.com/bat/relance").then(response => {
        if (response.status == 200) {
            return response.json();
        }
    }).then(data => {
        const result = data.relance;
        console.log(result);
        const container = document.querySelector('.relance-list');
        result.forEach(relance => {
            console.log(relance);
            displayRelance(relance.date, JSON.parse(relance.json), container, relance.doc, relance._id);
        })
    }).catch(error => {
    });
}

function displayRelance(date, form, container, doc, id) {
    console.log(form);
    const template = `
        <div class="relance">
            <h1>${form["entreprise-nom"]}</h1>
            <p>${dateToString(date)}</p>
        </div>
    `;
    console.log("display");
    const element = new DOMParser().parseFromString(template, 'text/html');
    element.querySelector('div').addEventListener('click', () => {
        showResponse(date, form, doc, id);
    })
    container.appendChild(element.querySelector('div'));
}

function showResponse(date, form, doc, id) {
    window.location = '#form';
    const container = document.querySelector('.response-container');
    freeContainer(container);
    for (let key in form) {
        const question = key;
        const response = form[key];
        displayForm(question, response, container);
    }

    if (doc != null) {
        addDownloadFileButton(id, container);
    }
}

function addDownloadFileButton(id, container) {
    const a = document.createElement('a');
    a.href = "https://app.bloquercovid19.com/bat/relance/doc/" + id;
    a.innerText = "Télécharger le fichier joint";
    container.appendChild(a);
}

function dateToString(date) {
    const d = new Date(date.toString());
    return (d.getDate() < 10 ? '0' : '') + d.getDate() + "/" + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1) + "/" + d.getFullYear();
}

function displayForm(question, response, container) {
    const template = `
    <div class="relance-form">
        <p class="question">${question}</h1>
        <p class="response">${response}</p>
    </div>
    `;
    const element = new DOMParser().parseFromString(template, 'text/html');
    container.appendChild(element.querySelector('div'));
}

function freeContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
