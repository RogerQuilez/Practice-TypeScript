class List {

    public name: string;
    public done: boolean;

    constructor(name: string) {
        this.name = name;
        this.done = false;
    }

}

/* VARIABLES */
const taskList: HTMLUListElement = document.querySelector('#taskList');
const taskLeft: HTMLParagraphElement = document.querySelector('#taskLeft');
const input: HTMLInputElement = document.querySelector('#taskInput');
const arrayLi: Array<List> = [];
const deleteButton: NodeListOf<Element> = document.querySelectorAll('.btn-delete');
const buttonAll: HTMLButtonElement = document.querySelector('#btn-all');
const buttonPending: HTMLButtonElement = document.querySelector('#btn-pending');
const buttonDone: HTMLButtonElement = document.querySelector('#btn-done');
const buttons: any = document.querySelectorAll('.btn-display');

/* EVENTS */
buttonDone.addEventListener('click', printDoneTasks);
buttonAll.addEventListener('click', printAllTasks);

for (let btn of buttons) {
    btn.addEventListener('click', displayTasks);
}

function displayTasks() {

    for (let btn of buttons) btn.removeAttribute('disabled');
    const lists: any = document.querySelectorAll('li');

    if (this.textContent == 'Todas') {
        printAllTasks(lists);
    } else if (this.textContent == 'Pendientes') {
        //TODO printPendientes();
    } else {
        printDoneTasks(lists);
    }

}

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
        saveToLocalStorage();

        let deleteButtons: any = document.querySelectorAll('.btn-delete');
        addDeleteButtonFunction(deleteButtons);

        input.value = '';
        changeTaskText();
    }

})

/* Function to print a new Task */
function printTask(newLi: HTMLElement, newList: List) {

    newLi.innerHTML = `<div>
                            <input type="checkbox" ${newList.done ? 'checked' : ''}>
                            <span>${newList.name}</span>
                        </div>
                        <span class="material-icons btn-delete">delete_outline</span>`;

    newLi.addEventListener('click', () => {
        (newList.done ? newList.done = false : newList.done = true)
        saveToLocalStorage();
    })
}

/* Function to print Tasks done */
function printDoneTasks(lists: any) {
    const currentArrayLi = getLocalStorage();
    for (let li of lists) {
        let textLi = li.firstElementChild.lastElementChild.textContent;

        for (let list of currentArrayLi) {
            if (list.name == textLi && !list.done) {
                console.log(textLi + list.name);
                li.style.display = 'none';
                break;
            }
        }
    }
}

/* Function to print All Tasks */
function printAllTasks(lists: any) {
    for (let li of lists) {
        li.style.display = 'flex';
    }
}


/* Function to change Task Left Test */
function changeTaskText() {
    taskLeft.innerHTML = `Quedan ${arrayLi.length} tareas`;
}

/* Function to Delete Task */
function addDeleteButtonFunction(deleteButtons: Array<HTMLElement>) {
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', () => {
            let liDeleteButton = deleteButton.parentElement.firstElementChild.lastElementChild; //Te text of Task to compare with the object name
            for (let lis of arrayLi) {
                if (liDeleteButton.textContent == lis.name) {
                    const index = arrayLi.indexOf(lis);
                    arrayLi.splice(index, 1);
                }
            }
            deleteButton.parentElement.remove();
            if (arrayLi.length > 0) {
                saveToLocalStorage();
            }
        })
    }
}

/* Function to save array into LocalStorage */
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayLi));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks'));
}




