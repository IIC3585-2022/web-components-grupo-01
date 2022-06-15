import {
    LitElement,
    html,
    css,
  } from "https://unpkg.com/lit-element/lit-element.js?module";

class SellItem extends LitElement {
  static properties = {
    price: {},
    discount: {},
    item: {},
    rating: {},
  };

  static styles = css`
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
  `;
    constructor() {
        super();
        this.isHidden = false;
    }

    toggleInfo() {
        this.isHidden = !this.isHidden;
        this.requestUpdate(); // no funcionó sin requesUpdate
    }

  render() {
    return html`
    <div class="sell-item">
        <img src="${this.item}"/>
        <div>
            <h3><slot name="name" /></h3>
            <div class="info" ?hidden=${this.isHidden}>
                <p class="text-box"><slot name="specs" /></p>
                <p>${this.discount}% DCTO.   $<span class="tachar">${this.price}</span></p>
                <p>$${parseInt(this.price*this.discount/100)}</p>
                </p><img id="estrella" src="./../../assets/estrella.png" /><p id="rating">${this.rating}</p>
            </div>
            <button @click=${this.toggleInfo}>${this.isHidden? 'Show Info': 'Hide Info'}</button>
        </div>
    </div>
    `;
  }
}
customElements.define('sell-item', SellItem);