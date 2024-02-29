class LanguageSwitcher extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.language = 'en'; // Default language is English
    }
  
    connectedCallback() {
      this.loadTemplateAndRender();
      this.loadCSS();
      this.setupSelectListener();
    }
  
    loadTemplateAndRender() {
      fetch('webcomponents/languages/languages.htm')
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const template = doc.querySelector('template');
  
          this.shadowRoot.appendChild(template.content.cloneNode(true));
        })
        .catch(error => {
          console.error('Error loading template:', error);
        });
    }
  
    loadCSS() {
      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', 'webcomponents/languages/languages.css');
      this.shadowRoot.appendChild(linkElem);
    }
  
    setupSelectListener() {
      const select = this.shadowRoot.querySelector('#language-select');
      select.addEventListener('change', () => {
        this.language = select.value;
        this.fetchLanguageData();
      });
    }
  
    fetchLanguageData() {
      fetch(`languages/${this.language}.json`)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Do something with the language data
        })
        .catch(error => {
          console.error('Error loading language data:', error);
        });
    }
  }
  
  customElements.define('language-switcher', LanguageSwitcher);
  