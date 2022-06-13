const template = document.createElement('template');
template.innerHTML = `
    <style>
        h3 { 
            color: coral;
        }

        .text-box {
            inline-size: 200px;
            overflow-wrap: break-word;
            line-height: 1.5em;
            height: 3em;       /* height is 2x line-height, so two lines will display */
            overflow: hidden;  /* prevents extra lines from being visible */
        }

    </style>
    <div class="sell-item">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p class="text-box"><slot name="specs" /></p>
                <p><slot name="discount" /></p>
                <p><slot name="price" /></p>
                <p><slot name="rating" /></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;

class SellItem extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector("h3"). innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('item')
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleButton = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo){
            info.style.display = 'block'
            toggleButton.innerText = 'Hide Info';
        } else {
            info.style.display = 'none'
            toggleButton.innerText = 'Show Info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener('click', () => this.toggleInfo());
    }
}

window.customElements.define('sell-item', SellItem);