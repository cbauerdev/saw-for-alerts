class CustomShadowRoot extends HTMLElement {
    constructor() {
        super();

        // Standard-JSON-Dateien
        this.jsonFiles = {
            de: "webcomponents/languages/data1.json",
            en: "webcomponents/languages/data2.json"
        };

        // Erstellen des Shadow DOMs
        this.attachShadow({ mode: 'open' });

        // Standard-HTML im Shadow DOM
        this.shadowRoot.innerHTML = `
        <div style="
        padding: 10px;
        width: 400px;
        height: 200x;
        background-color: #ffffff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    ">
        <div style="
            width: 96%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div style="
                background-color: #fff;
                padding: 5px;
                border-radius: 5px;
            ">
                <select id="language-select" style="
                    border: none;
                    background-color: #fff;
                    padding: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    <option value="de">Deutsch</option>
                    <option value="en">Englisch</option>
                </select>
            </div>
            <div style="
                background-color: #fff;
                padding: 5px;
                border-radius: 5px;
            ">
                <select id="text-select" style="
                    border: none;
                    background-color: white;
                    padding: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                </select>
            </div>
            <button id="change-text-btn" style="
            background-color: white;
            padding: 5px;
            border: 1px solid #dbe4f0;
            border-radius: 7px;
            cursor: pointer;
            transition: border-color 0.3s ease; /* Übergangseffekt für den Rand */
        " onmouseover="this.style.borderColor='silver';" onmouseout="this.style.borderColor='#dbe4f0';">
            Text ändern
        </button>
        </div>
        <div id="text-container" style="
        border-radius: 10px;
            width: 90%;
            height: 50px;
            background-color: #dbe4f0;
            padding: 10px;
            margin-top: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            overflow-y: auto;
            text-align: center;
        ">
            <div id="text" style="margin-bottom: 5px; font-weight: bold;"></div>
            <div id="subtext">Bitte eine Auswahl treffen</div>
        </div>
    </div>
    
        `;
    }

    connectedCallback() {
        // Event-Listener für den Button zum Ändern des Texts hinzufügen
        const changeTextBtn = this.shadowRoot.getElementById('change-text-btn');
        changeTextBtn.addEventListener('click', () => this.changeText());

        // Event-Listener für die Änderung der Dropdown-Optionen hinzufügen
        const languageSelect = this.shadowRoot.getElementById('language-select');
        languageSelect.addEventListener('change', () => this.populateTextOptions(languageSelect.value));

        // Initialisierung der Text-Optionen
        this.populateTextOptions(languageSelect.value);
    }

    populateTextOptions(language) {
        const textSelect = this.shadowRoot.getElementById('text-select');
        textSelect.innerHTML = '';
        if (language === 'de') {
            textSelect.innerHTML += `<option value="1">Willkommen</option>`;
            textSelect.innerHTML += `<option value="2">Auf Wiedersehen</option>`;
        } else if (language === 'en') {
            textSelect.innerHTML += `<option value="1">Welcome</option>`;
            textSelect.innerHTML += `<option value="2">Goodbye</option>`;
        }
    }

    changeText() {
        const languageSelect = this.shadowRoot.getElementById('language-select');
        const textSelect = this.shadowRoot.getElementById('text-select');
        const textContainer = this.shadowRoot.getElementById('text-container');
    
        const language = languageSelect.value;
        const textId = textSelect.value;
    
        // JSON-Datei laden und Text ändern
        fetch(this.jsonFiles[language])
            .then(response => response.json())
            .then(data => {
                const item = data.find(item => item.id === parseInt(textId));
                if (item) {
                    // Text und Subtext setzen
                    const textElement = document.createElement('div');
                    textElement.textContent = item.text;
                    const subtextElement = document.createElement('div');
                    subtextElement.textContent = item.subtext;
    
                    textContainer.innerHTML = ''; // Clear previous content
                    textContainer.appendChild(textElement);
                    textContainer.appendChild(subtextElement);
                } else {
                    console.error('Kein Text mit der ID gefunden:', textId);
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden der JSON-Daten:', error);
            });
    }
    
}

// Custom Element registrieren
customElements.define('custom-shadow-root', CustomShadowRoot);
