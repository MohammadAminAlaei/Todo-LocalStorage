const input = document.getElementById("input");
const button = document.getElementById("submit");
const edit = document.getElementById('edit');
const main = document.querySelector('main');
const subInput = document.getElementById('subInputText');
const saveInd = document.getElementById("saveIndex");

const handleAdd = (event) => {
    event.preventDefault();

    if (input.value.trim() === '') {
        input.style.border = '1px solid red';
        subInput.innerHTML = 'Please Enter Word';
        subInput.style.color = 'red';
        subInput.classList.add('anime');
        input.classList.add('anime');

    } else {
        subInput.innerHTML = '';
        input.style.border = '1px solid #ccc';
        subInput.classList.remove('anime');
        input.classList.remove('anime');

        let todo = localStorage.getItem("todo");
        if (todo === null) {
            todoArray = [];
        } else {
            todoArray = JSON.parse(todo);
        }

        let numberJob = todoArray.length;

        let myObj = {};
        myObj.text = input.value;
        myObj.checked1 = false;

        todoArray.unshift(myObj);
        input.value = "";
        localStorage.setItem("todo", JSON.stringify(todoArray));
        localStorage.setItem("jobLength", numberJob + 1)

        displayTodo();

    };

};

const displayTodo = () => {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";

    todoArray.forEach((list, index) => {
        if (list.checked1 == true) {
            htmlCode += `
            <div class="row justify-content-align-content-between my-5">
                <div class="col-10 d-flex align-items-center padd">
                    <input type="checkbox" id="checkBox${index}" checked> <label for="checkBox${index}" onclick="checkFunction(${index})" class="w-100 ms-4 p-1 fs-5"> <a class="delete">${list.text}</a> </label>
                </div>
                <div class="col-2 d-flex justify-content-end">
                <button class="icon btn-edite" onclick="editor(${index}, this)"><i class="fas fa-pencil-alt"></i></button>
                <button class="icon btn-delete" onclick="handleDelete(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
            </div>`;
        } else {
            htmlCode += `
            <div class="row justify-content-align-content-between my-5">
                <div class="col-10 d-flex align-items-center padd">
                    <input type="checkbox" id="checkBox${index}"> <label for="checkBox${index}" onclick="checkFunction(${index})" class="w-100 ms-4 p-1 fs-5"> <a>${list.text}</a> </label>
                </div>
                <div class="col-2 d-flex justify-content-end">
                <button class="icon btn-edite" onclick="editor(${index}, this)"><i class="fas fa-pencil-alt"></i></button>
                <button class="icon btn-delete" onclick="handleDelete(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
            </div>`;
        }
    });

    main.innerHTML = htmlCode;
};

const checkFunction = (index) => {
    let todo = localStorage.getItem("todo");
    let arrayTodo = JSON.parse(todo);
    if (arrayTodo[index].checked1 == false) {
        arrayTodo[index].checked1 = true
    } else {
        arrayTodo[index].checked1 = false
    };
    localStorage.setItem('todo', JSON.stringify(arrayTodo));
    displayTodo();
};

const handleDelete = (index) => {
    const question = confirm('Sure?');
    if (question) {
        let todo = localStorage.getItem("todo");
        todoArray = JSON.parse(todo);
        todoArray.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(todoArray));
        displayTodo();
    }
};

const editor = (index, event) => {
    saveInd.value = index;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    input.value = todoArray[index].text;
    button.style.display = "none";
    edit.style.display = "block";
    input.focus();
    event.style.display = 'none';
    event.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.style.backgroundColor = '#fff';
};

edit.addEventListener("click", (event) => {
    event.preventDefault();
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id].text = input.value;
    button.style.display = "block";
    edit.style.display = "none";
    input.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});


button.addEventListener('click', handleAdd);

document.addEventListener('DOMContentLoaded', () => {
    displayTodo();
    console.log(todoArray.length);
});



