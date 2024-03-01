function removeCustomElements() {
  const customElements = document.querySelectorAll('[id^="alert-"]');
  customElements.forEach(element => {
      element.remove();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('webcomponents/languages/de.json')
      .then(response => response.json())
      .then(data => {
          generateAlerts(data);
          setupLanguageChangeListener(data);
      })
      .catch(error => {
          console.error('Fehler beim Laden der JSON-Daten:', error);
      });
});

function generateAlerts(data) {
  let success = true;
  data.forEach(item => {
      if (!customElements.get(item.id)) {
          class CustomAlert extends HTMLElement {
              constructor() {
                  super();
                  this.attachShadow({ mode: 'open' });
              }

              connectedCallback() {
                  this.loadTemplateAndCreateComponent(item);
              }

              loadTemplateAndCreateComponent(data) {
                  fetch(`webcomponents/templates/alerts.htm`)
                      .then(response => response.text())
                      .then(html => {
                          const tempElement = document.createElement('div');
                          tempElement.innerHTML = html.trim();
                          const template = tempElement.querySelector('#alert-template').content.cloneNode(true);

                          const slot = template.querySelector('#alert-text');
                          slot.textContent = data.text;

                          const img = template.querySelector('#alert-img');
                          img.setAttribute('src', data.image);
                          img.setAttribute('alt', data.description);

                          const alertDiv = template.querySelector('#alert');
                          alertDiv.dataset.alertId = data.id;
                          alertDiv.classList.add(data.style);

                          const linkElem = document.createElement('link');
                          linkElem.setAttribute('rel', 'stylesheet');
                          linkElem.setAttribute('href', 'webcomponents/styles/alerts.css');
                          this.shadowRoot.appendChild(linkElem);
                          this.shadowRoot.appendChild(template);
                      })
                      .catch(error => {
                          console.error('Fehler beim Laden des HTML-Templates:', error);
                          success = false;
                      });
              }
          }
          customElements.define(item.id, CustomAlert);
      } else {
          console.warn(`Benutzerdefiniertes Element '${item.id}' ist bereits definiert.`);
      }
  });
  return success;
}

function setupLanguageChangeListener(data) {
  const languageSelect = document.querySelector('#language-select');
  if (languageSelect) {
      languageSelect.addEventListener('change', () => {
          const selectedLanguage = languageSelect.value;
          console.log('Ausgewählte Sprache:', selectedLanguage);
          updateAlertText(selectedLanguage, data);
      });
  }
}

function updateAlertText(language) {
    console.log('Lade Sprachendaten für Sprache:', language);
    fetch(`webcomponents/languages/${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht erfolgreich');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sprachendaten erfolgreich geladen:', data);
            const alertTextElement = document.getElementById('alert-text');
            if (alertTextElement) {
                console.log('Element mit der ID "alert-text" gefunden:', alertTextElement);
                if (data && data.text) {
                    alertTextElement.textContent = data.text;
                    console.log('Alert-Text erfolgreich aktualisiert:', data.text);
                } else {
                    console.error('Kein Text in den Sprachendaten gefunden.');
                }
            } else {
                console.error('Element mit der ID "alert-text" wurde nicht gefunden.');
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Sprachendaten:', error);
        });
}






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
                  this.setupLanguageChangeListener();
                  this.loadCSS();
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
              this.updateAlertText(selectedLanguage);
          });
      }
  }

  updateAlertText(language) {
      console.log('Lade Sprachendaten für Sprache:', language);
      fetch(`webcomponents/languages/${language}.json`)
          .then(response => response.json())
          .then(data => {
              console.log('Sprachendaten erfolgreich geladen:', data);
              removeCustomElements();
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
