import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element/lit-element.js?module";

const style = css`
  .container {
    margin: auto;
    width: 30%;
    padding: 10px;
    font-family: sans-serif;
  }

  .titulo {
    display: block;
    margin-bottom: 10px;
    color: #000000;
    font-size: 26px;
    font-weight: normal;
    line-height: 16px;
    display: flex;
    justify-content: center;
  }

  .todoList {
    width: 100%;
    margin: 4px 0 0;
    padding: 0;
  }

  .todoList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
    padding: 0 7px;
    font-size: 16px;
    height: 40px;
    border: 2px solid green;
    border-radius: 30px;
  }

  .todoList li button {
    border: 2px solid black;
    background: red;
    border-radius: 30px;
    cursor: pointer;
    height: 30px;
    width: 30px;
  }

  .newTaskContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px;
  }

  .promt {
    font-size: 18px;
  }

  .buttonTask {
    border: 2px solid black;
    background: green;
    border-radius: 30px;
    cursor: pointer;
    height: 30px;
    width: 30px;
  }

  .inputTask {
    width: 260px;
    height: 20px;
  }
`;

class TodoList extends LitElement {
  static get properties() {
    return {
      titulo: { type: String },
      item1: { type: String },
      item2: { type: String },
      item3: { type: String },
      promt: { type: String },
      tasks: { type: Array },
    };
  }
  static get styles() {
    return [style];
  }

  constructor() {
    super();
    this.tasks = [];
    this.taskId = 4;
  }

  firstUpdated() {
    this.tasks = [
      { label: this.item1, id: 1 },
      { label: this.item2, id: 2 },
      { label: this.item3, id: 3 },
    ];
  }

  addTask() {
    const label = this.renderRoot.querySelector(".inputTask");
    const newElement = { label: label.value, id: this.taskId };
    this.tasks = [...this.tasks, newElement];
    label.value = "";
    this.taskId += 1;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  render() {
    return html`
        <div class="container">
            <span class="titulo">${this.titulo}</span>
            <div>
            <ul class="todoList">
                ${this.tasks.map(
                  (task) =>
                    html`<li>
                      <span>${task.label}</span
                      ><button @click="${() => this.deleteTask(task.id)}">
                        -
                      </button>
                    </li>`
                )}
            </ul>
            </div>
            <div class="newTaskContainer">
                <div>
                    <span class="promt">${this.promt}</span>
                    <input class="inputTask" type="text"></input>
                </div>
                <button class="buttonTask" @click="${this.addTask}">+</button>
            </div>
        </div>
    `;
  }
}

window.customElements.define("lit-todo-list", TodoList);
