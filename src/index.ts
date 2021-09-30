class List {

    public name: string;
    public done: boolean;

    constructor(name: string) {
        this.name = name;
        this.done = false;
    }
}

const taskList = document.querySelector('#taskList');
const taskLeft = document.querySelector('#taskLeft');
const input: HTMLInputElement = document.querySelector('#taskInput');
const arrayLi: Array<List> = [];
const deleteButton: any = document.querySelectorAll('.btn-delete');

/* ADDING TASK WITH ENTER ON INPUT */
input.addEventListener('keydown', (e: KeyboardEvent) => {

    if (e.key == 'Enter') {

        if (!input.value) {
            return;
        }

        let newLi = document.createElement('li');
        let newList = new List(input.value);

        printTask(newLi, newList);

        taskList.append(newLi);
        arrayLi.push(newList);

        let deleteButtons: any = document.querySelectorAll('.btn-delete');
        console.log(deleteButtons);
        addDeleteButtonFunction(deleteButtons);
        
        input.value = '';
        changeTaskText();
    }

})

function printTask(newLi: HTMLElement, newList: List) {
    newLi.innerHTML = `<div>
                            <input type="checkbox">
                            <span>${newList.name}</span>
                            </div>
                            <span class="material-icons btn-delete">delete_outline</span>`;
}

function changeTaskText() {
    taskLeft.innerHTML = `Quedan ${arrayLi.length} tareas`;
}

/* Adding deleting function */
function addDeleteButtonFunction(deleteButtons: Array<HTMLElement>) {
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', () => {
            deleteButton.parentElement.remove();
        })
    }
}
