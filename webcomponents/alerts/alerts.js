//Warnmeldung wie definiert von alert-danger

class AlertDanger extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const loadTemplateAndCreateComponent = () => {
      fetch('webcomponents/alerts/alerts.htm')
        .then(response => response.text())
        .then(html => {
          const tempElement = document.createElement('div');
          tempElement.innerHTML = html.trim();

          const template = tempElement.querySelector('#alert-template').content.cloneNode(true);

          const img = template.querySelector('#alert-img');
          const text = template.querySelector('#alert-text');
          const alertDiv = template.querySelector('#alert');

          fetch('webcomponents/languages/de.json')
            .then(response => response.json())
            .then(data => {
              const alertData = data.find(item => item.id === 'alert-danger');
              if (alertData) {
                img.setAttribute('src', alertData.image);
                img.setAttribute('alt', alertData.description);
                text.textContent = alertData.text;

                img.classList.add('alert-danger-img');
                alertDiv.classList.add('alert-danger');

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', 'webcomponents/alerts/alerts.css');
                this.shadowRoot.appendChild(linkElem);

                this.shadowRoot.appendChild(template);
              }
            })
            .catch(error => {
              console.error('Error loading JSON data:', error);
            });
        })
        .catch(error => {
          console.error('Error loading HTML template:', error);
        });
    };

    loadTemplateAndCreateComponent();
  }
}

customElements.define('alert-danger', AlertDanger);


//Erfolgsmeldung wie definiert von alert-success

class AlertSuccess extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const loadTemplateAndCreateComponent = () => {
      fetch('webcomponents/alerts/alerts.htm')
        .then(response => response.text())
        .then(html => {
          const tempElement = document.createElement('div');
          tempElement.innerHTML = html.trim();

          const template = tempElement.querySelector('#alert-template').content.cloneNode(true);

          const img = template.querySelector('#alert-img');
          const text = template.querySelector('#alert-text');
          const alertDiv = template.querySelector('#alert');

          fetch('webcomponents/languages/de.json')
            .then(response => response.json())
            .then(data => {
              const alertData = data.find(item => item.id === 'alert-success');
              if (alertData) {
                img.setAttribute('src', alertData.image);
                img.setAttribute('alt', alertData.description);
                text.textContent = alertData.text;

                img.classList.add('alert-success-img');
                alertDiv.classList.add('alert-success');

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', 'webcomponents/alerts/alerts.css');
                this.shadowRoot.appendChild(linkElem);

                this.shadowRoot.appendChild(template);
              }
            })
            .catch(error => {
              console.error('Error loading JSON data:', error);
            });
        })
        .catch(error => {
          console.error('Error loading HTML template:', error);
        });
    };

    loadTemplateAndCreateComponent();
  }
}

customElements.define('alert-success', AlertSuccess);

