'use strict';

let todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
let todoList = document.querySelector('.todo-list');
let todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function () {
            localStorage.removeItem('todoData', JSON.stringify(todoData));
            console.log(todoData.indexOf(item));
            todoData.splice(todoData.indexOf(item), 1);
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function () {
            localStorage.removeItem('todoData', JSON.stringify(todoData));
            item.completed = !item.completed;
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });
    });
    console.log(todoData);
};

todoControl.addEventListener('submit', function (event) {
    localStorage.removeItem('todoData', JSON.stringify(todoData));
    event.preventDefault();
    if (headerInput.value === '') {
        alert('Строка не должна быть пустой!');
        return;
    }
    let newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoData.push(newTodo);
    headerInput.value = '';
    localStorage.setItem('todoData', JSON.stringify(todoData));
    render();
});

function getLocal(){
    todoData = JSON.parse(localStorage.getItem('todoData'));
    todoList.innerHTML = render();
}

getLocal();
render();
