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
            console.log(todoData.indexOf(item));
            todoData.splice(todoData.indexOf(item), 1);
            render();
        });

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });
    });
    console.log(todoData);
};

todoControl.addEventListener('submit', function (event) {
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
    render();  
});

window.addEventListener('unload', function(){
    localStorage.setItem('todoData', JSON.stringify(todoData));
});

function getLocal () {
    if (localStorage.todoData) {
        todoData = JSON.parse(localStorage.getItem('todoData'));
    }
}
getLocal();
render();