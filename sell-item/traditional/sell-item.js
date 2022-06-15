const template = document.createElement('template');
//Aunque quite h3 del estilo, el estilo de index-sell-item no le afecta.
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

        .tachar {
            text-decoration: line-through;
        }
        
        .flex {
            display: flex;
            flex-direction: row;
        }

        #rating {
            width: 10px;
            margin-left: 10px;:
            padding: 0px;
            display:inline;
        }

        #estrella {
            width: 5%;
            margin: 0;
            padding: 0;
            display:inline;
        }

    </style>
    <div class="sell-item">
        <img />
        <div>
            <h3><slot name="name" /></h3>
            <div class="info">
                <p class="text-box"><slot name="specs" /></p>
                <p><edit-word><span id=discount></span></edit-word>% DCTO.   $<span id="price" class="tachar"></span></p>
                <p>$<span id="discounted-price"></span></p>
                </p>
                <div id="estrellitas" class="flex"></div>
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
        this.shadowRoot.querySelector('img').src = this.getAttribute('item');
        this.shadowRoot.querySelector("#discount").innerText =  `${this.getAttribute('discount')}`;
        this.shadowRoot.querySelector("#price").innerText = `${this.getAttribute('price')}`;
        this.shadowRoot.querySelector("#discounted-price").innerText =  `${Math.round(parseInt(this.getAttribute('price')) * (1- parseInt(this.getAttribute('discount'))/100), 2)}`;
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
        
        // Estrellitas
        const rating = this.getAttribute("rating");
        let ratingStars = "";
        for(let i = 0; i < rating; i++) {
            ratingStars += `<img height="20" src="../../assets/estrella.png"></img>`
        }
        const element = this.shadowRoot.querySelector("#estrellitas");
        element.innerHTML = ratingStars;
        
        // Actualizar descuento
        const editword = this.shadowRoot.querySelector("edit-word")
        editword.addEventListener("discountinput", (e) => {
        console.log(e)
            let value = parseInt(e.detail.newValue);
            let discounted = Math.round(parseInt(this.getAttribute('price')) * (1 - value / 100), 2);
            if(isNaN(discounted)) {
                discounted = 0;
            }
            
            this.shadowRoot.querySelector("#discounted-price").innerText =  `${discounted}`;
        })
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
}

class EditWord extends HTMLElement {
    constructor() {
        super();
  
        const shadowRoot = this.attachShadow({mode: 'open'});
        const form = document.createElement('form');
        const input = document.createElement('input');
        const span = document.createElement('span');
  
        const style = document.createElement('style');
        style.textContent = 'span { background-color: #eef; padding: 0 2px }';
  
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(form);
        shadowRoot.appendChild(span);
  
        span.textContent = this.textContent;
        input.value = this.textContent;
  
        form.appendChild(input);
        
        input.oninput = function(e){
            this.dispatchEvent(new CustomEvent("discountinput", {
        composed: true, bubbles: true, detail: { newValue: input.value } }));
        }
        form.style.display = 'none';
        span.style.display = 'inline-block';
        input.style.width = span.clientWidth + 'px';
  
        this.setAttribute('tabindex', '0');
        input.setAttribute('required', 'required');
        this.style.display = 'inline-block';
  
        this.addEventListener('click', () => {
          span.style.display = 'none';
          form.style.display = 'inline-block';
          input.focus();
          input.setSelectionRange(0, input.value.length)
        });
  
        form.addEventListener('submit', e => {
          updateDisplay();
          e.preventDefault();
        });
  
        input.addEventListener('blur', updateDisplay);
  
        function updateDisplay() {
          span.style.display = 'inline-block';
          form.style.display = 'none';
          span.textContent = input.value;
          input.style.width = span.clientWidth + 'px';
        }
    }
}

window.customElements.define('sell-item', SellItem);
window.customElements.define('edit-word', EditWord);
