class List {

    public name: string;
    public done: boolean;

    constructor(name: string) {
        this.name = name;
        this.done = false;
    }

}

/* VARIABLES */
const taskList = document.querySelector('#taskList');
const taskLeft = document.querySelector('#taskLeft');
const input: HTMLInputElement = document.querySelector('#taskInput');
const arrayLi: Array<List> = [];
const deleteButton: any = document.querySelectorAll('.btn-delete');
const buttonAll: any = document.querySelector('#btn-all');
const buttonPending: any = document.querySelector('#btn-pending');
const buttonDone: any = document.querySelector('#btn-done');
const buttons: any = document.querySelectorAll('.btn-display');

/* EVENTS */
buttonDone.addEventListener('click', printDoneTasks);
buttonAll.addEventListener('click', printAllTasks);

for (let btn of buttons) {
    btn.addEventListener('click', displayTasks);
}

function displayTasks() {

    for (let btn of buttons) btn.removeAttribute('disabled');

    this.disabled = true;
    document.querySelector('ul').remove();
    let ul;

    if (this.textContent == 'Todas') {
        ul = printAllTasks();
    } else if (this.textContent == 'Pendientes') {
        //TODO printPendientes();
    } else {
        ul = printDoneTasks();
    }

    
    const main: any = document.querySelector('main');
    const taskInfo: any = document.querySelector('.info');
    main.insertBefore(ul, taskInfo);
    
    let deleteButtons: any = document.querySelectorAll('.btn-delete');
    addDeleteButtonFunction(deleteButtons);
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
    })
}

/* Function to print Tasks done */
function printDoneTasks() {
    const ul: HTMLElement = document.createElement('ul');
    for (let list of arrayLi) {
        const newLi: HTMLElement = document.createElement('li');
        if (list.done) {
            newLi.innerHTML = `<div>
                                    <input type="checkbox" checked>
                                    <span>${list.name}</span>
                                </div>
                                <span class="material-icons btn-delete">delete_outline</span>`;
                            }
        ul.append(newLi);
    }

    return ul;
}

/* Function to print All Tasks */
function printAllTasks() {
    const ul: HTMLElement = document.createElement('ul');
    for (let list of arrayLi) {
        const newLi: HTMLElement = document.createElement('li');
        newLi.innerHTML = `<div>
                                <input type="checkbox" ${list.done ? 'checked' : ''}>
                                <span>${list.name}</span>
                            </div>
                                <span class="material-icons btn-delete">delete_outline</span>`;

        ul.append(newLi);
    }

    return ul;
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




