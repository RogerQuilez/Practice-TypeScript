/* ADDING TASK WITH ENTER ON INPUT */
const taskList = document.querySelector('#taskList');
const taskLeft = document.querySelector('#taskLeft');
const input: HTMLInputElement = document.querySelector('#taskInput');
const arrayLi: Array<HTMLElement> = [];
input.addEventListener('keydown', (e: KeyboardEvent) => {

    if (e.key == 'Enter') {
        let newLi = document.createElement('li');
        newLi.innerHTML = `<div>
                                <input type="checkbox">
                                <span>${input.value}</span>
                            </div>
                            <span class="material-icons btn-delete">delete_outline</span>`;
        taskList.append(newLi);
        arrayLi.push(newLi);
        input.value = '';
        changeTaskText();
    }

})

function changeTaskText () {
    taskLeft.innerHTML = `Quedan ${arrayLi.length} tareas`;
}