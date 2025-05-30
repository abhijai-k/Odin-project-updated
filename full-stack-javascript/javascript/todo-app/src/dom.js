import createTodo from './todo';
import { save } from './storage';

export function displayProject(project) {
  const container = document.getElementById('todo-container');
  container.innerHTML = '';

  project.todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.textContent = `${todo.title} - Due: ${todo.dueDate}`;
    container.appendChild(todoDiv);
  });
}
