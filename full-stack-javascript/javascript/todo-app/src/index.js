import './style.css';
import createProject from './project';
import createTodo from './todo';
import { save, load } from './storage';
import { displayProject } from './dom';

let projects = load() || [createProject('Default')];
let activeProject = projects[0];

document.addEventListener('DOMContentLoaded', () => {
  displayProject(activeProject);

  document.getElementById('add-project').addEventListener('click', () => {
    const name = prompt('Project name:');
    if (name) {
      const newProject = createProject(name);
      projects.push(newProject);
      activeProject = newProject;
      save(projects);
      displayProject(activeProject);
    }
  });
});
