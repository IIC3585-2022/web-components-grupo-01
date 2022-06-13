const template = document.createElement("template");

template.innerHTML = `
  <style>
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
      justify-content: center 
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
    
  </style>

  <div class="container">
    <span class="titulo">TODO</span>
    <div>
      <ul class="todoList"></ul>
    </div>
    <div class="newTaskContainer">
        <div>
            <span class="promt">Promt</span>
            <input class="inputTask" type="text"></input>
        </div>
        <button class="buttonTask">+</button>
    </div>
  </div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));

    this.taskId = 4;

    this.$titulo = this._sR.querySelector(".titulo");
    this.$promt = this._sR.querySelector(".promt");
    this.$todoList = this._sR.querySelector(".todoList");
    this.$taskInput = this._sR.querySelector(".inputTask");
    this.$taskButton = this._sR.querySelector(".buttonTask");

    this.tasks = [
      { label: this.item1, id: 1 },
      { label: this.item2, id: 2 },
      { label: this.item3, id: 3 },
    ];

    this.$taskButton.addEventListener("click", this.addTask.bind(this));
  }

  addTask(event) {
    const newElement = { label: this.$taskInput.value, id: this.taskId };
    this.tasks = [...this.tasks, newElement];
    this.taskId += 1;
    this.$taskInput.value = "";
    this.render();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.render();
  }

  static get observedAttributes() {
    return ["titulo", "item1", "item2", "item3", "promt"];
  }

  get titulo() {
    return this.getAttribute("titulo");
  }

  set titulo(value) {
    this.setAttribute("titulo", value);
  }

  get promt() {
    return this.getAttribute("promt");
  }

  set promt(value) {
    this.setAttribute("promt", value);
  }

  get item1() {
    return this.getAttribute("item1");
  }

  set item1(value) {
    this.setAttribute("item1", value);
  }

  get item2() {
    return this.getAttribute("item2");
  }

  set item2(value) {
    this.setAttribute("item2", value);
  }

  get item3() {
    return this.getAttribute("item3");
  }

  set item3(value) {
    this.setAttribute("item3", value);
  }

  get tasks() {
    return JSON.parse(this.getAttribute("tasks"));
  }

  set tasks(value) {
    this.setAttribute("tasks", JSON.stringify(value));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$titulo.innerHTML = this.titulo;
    this.$promt.innerHTML = this.promt;

    this.$todoList.innerHTML = "";

    this.tasks.forEach((task) => {
      let $deleteTaskButton = document.createElement("button");
      let $label = document.createElement("span");
      let $htmlTask = document.createElement("li");

      $deleteTaskButton.innerHTML = "-";
      $deleteTaskButton.addEventListener("click", () =>
        this.deleteTask(task.id)
      );
      $label.innerHTML = `${task.label}`;
      $htmlTask.appendChild($label);
      $htmlTask.appendChild($deleteTaskButton);
      this.$todoList.appendChild($htmlTask);
    });
  }
}

window.customElements.define("todo-list", TodoList);
