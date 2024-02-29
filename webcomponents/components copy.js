// Funktion zum Entfernen der benutzerdefinierten Elemente
function removeCustomElements() {
  const customElements = document.querySelectorAll('[id^="alert-"]');
  customElements.forEach(element => {
      element.remove();
  });
}

// Laden der JSON für die Standardsprache "de"
fetch('webcomponents/languages/de.json')
  .then(response => response.json())
  .then(data => {
      console.log('Standard-Sprachdaten geladen:', data); // Logge die geladenen Sprachdaten
      // Aufruf der Methode zum Generieren der Alerts
      generateAlerts(data);

      // Setzen des Event Listeners für die Sprachänderung und Übergeben der Daten
      setupLanguageChangeListener(data);

  })
  .catch(error => {
      console.error('Fehler beim Laden der JSON-Daten:', error);
  });

// Generieren der Alerts basierend auf den Daten in der JSON
function generateAlerts(data) {
  data.forEach(item => {
      if (!customElements.get(item.id)) { // Überprüfen Sie, ob das benutzerdefinierte Element bereits definiert wurde
          console.log(`Erzeuge benutzerdefiniertes Element '${item.id}'`);
          class CustomAlert extends HTMLElement {
              constructor() {
                  super();
                  this.attachShadow({ mode: 'open' });
              }

              connectedCallback() {
                  this.loadTemplateAndCreateComponent(item);
              }

              loadTemplateAndCreateComponent(data) {
                  console.log('Lade HTML-Template für:', item.id);
                  fetch(`webcomponents/templates/alerts.htm`)
                      .then(response => response.text())
                      .then(html => {
                          const tempElement = document.createElement('div');
                          tempElement.innerHTML = html.trim();
                          const template = tempElement.querySelector('#alert-template').content.cloneNode(true);
                          const img = template.querySelector('#alert-img');
                          const text = template.querySelector('#alert-text');
                          const alertDiv = template.querySelector('#alert');
                          img.setAttribute('src', data.image);
                          img.setAttribute('alt', data.description);
                          text.textContent = data.text;
                          alertDiv.dataset.alertId = data.id;
                          alertDiv.classList.add(data.style);
                          const linkElem = document.createElement('link');
                          linkElem.setAttribute('rel', 'stylesheet');
                          linkElem.setAttribute('href', 'webcomponents/styles/alerts.css');
                          this.shadowRoot.appendChild(linkElem);
                          this.shadowRoot.appendChild(template);
                          console.log(`Benutzerdefiniertes Element '${item.id}' erfolgreich erstellt.`);
                      })
                      .catch(error => {
                          console.error('Fehler beim Laden des HTML-Templates:', error);
                      });
              }
          }
          customElements.define(item.id, CustomAlert);
      } else {
          console.warn(`Benutzerdefiniertes Element '${item.id}' ist bereits definiert.`);
      }
  });
}

// Hinzufügen des Event Listeners für die Sprachänderung
function setupLanguageChangeListener(data) {
  const languageSelect = document.querySelector('#language-select');
  if (languageSelect) {
      languageSelect.addEventListener('change', () => {
          const selectedLanguage = languageSelect.value;
          console.log('Ausgewählte Sprache:', selectedLanguage);
          updateAlertText(selectedLanguage, data); // Aufruf der Methode zur Aktualisierung der Alerts
      });
  }
}

// Aktualisieren der Alerts basierend auf der ausgewählten Sprache
function updateAlertText(language, data) {
  console.log('Lade Sprachendaten für Sprache:', language);
  fetch(`webcomponents/languages/${language}.json`)
      .then(response => response.json())
      .then(newData => {
          console.log('Sprachendaten erfolgreich geladen:', newData);
          removeCustomElements(); // Entfernen der vorherigen Alerts
          generateAlerts(newData); // Generieren der neuen Alerts
      })
      .catch(error => {
          console.error('Fehler beim Laden der Sprachendaten:', error);
      });
}

// Komponente für die Sprachauswahl
class MultiLanguageComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.loadTemplateAndRender();
  }

  loadTemplateAndRender() {
      fetch('webcomponents/templates/languages.htm')
          .then(response => response.text())
          .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const template = doc.querySelector('#language-switcher-template');

              if (template) {
                  const templateContent = template.content.cloneNode(true);
                  this.shadowRoot.appendChild(templateContent);
                  this.setupLanguageChangeListener(); // Hinzufügen des Event Listeners für die Sprachauswahl
                  this.loadCSS(); // Laden des CSS-Stils
              } else {
                  console.error('Template nicht gefunden');
              }
          })
          .catch(error => {
              console.error('Fehler beim Laden des Templates:', error);
          });
  }

  setupLanguageChangeListener() {
      const languageSelect = this.shadowRoot.querySelector('#language-select');
      if (languageSelect) {
          languageSelect.addEventListener('change', () => {
              const selectedLanguage = languageSelect.value;
              console.log('Ausgewählte Sprache:', selectedLanguage);
              this.updateAlertText(selectedLanguage); // Aktualisierung der Alerts bei Sprachänderung
          });
      }
  }

  updateAlertText(language) {
      console.log('Lade Sprachendaten für Sprache:', language);
      fetch(`webcomponents/languages/${language}.json`)
          .then(response => response.json())
          .then(data => {
              console.log('Sprachendaten erfolgreich geladen:', data);
              generateAlerts(data); // Generieren der neuen Alerts basierend auf den Sprachendaten
              removeCustomElements(); // Entfernen der vorherigen Alerts
          })
          .catch(error => {
              console.error('Fehler beim Laden der Sprachendaten:', error);
          });
  }


  loadCSS() {
      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', 'webcomponents/styles/languages.css');
      this.shadowRoot.appendChild(linkElem);
  }
}

customElements.define('multi-language-component', MultiLanguageComponent);
