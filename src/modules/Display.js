import { format } from 'date-fns'
import Storage from './Storage'
import Project from './Project'
import Task from './Task'

export default class Display {
  //LOAD CONTENT

  static loadHomepage() {
    Display.loadProjects()
    Display.loadProjectButtons()
    Display.openProject('Inbox', document.getElementById('button-inbox-projects'))
    document.addEventListener('keydown', Display.handleKeyboardInput)
  }

  static loadProjects() {
    Storage.getTodoList()
    .getProjects()
    .forEach((project) => {
      if (
        project.name !== 'Inbox' &&
        project.name !== 'Today' &&
        project.name !== 'This week'
      ) {
        Display.createProject(project.name)
      }
    })
    Display.initAddProjectButtons()
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
    .getProject(projectName)
    .getTasks()
    .forEach((task) => Display.createTask(task.name, task.dueDate))

    if (projectName !== 'Today' && projectName !== 'This week') {
      Display.initAddTaskButtons()
    }
  }

  static loadProjectContent(projectName) {
    const projectPreview = document.getElementById('project-preview')
    projectPreview.innerHTML = `
        <h1 id="project-name">${projectName}</h1>
        <div class="tasks-list" id="tasks-list"></div>`

    if (projectName !== 'Today' && projectName !== 'This week') {
      projectPreview.innerHTML += `
        <button class="button-add-task" id="button-add-task">
          <i class="fas fa-plus"></i>
          Add Task
        </button>
        <div class="add-task-popup" id="add-task-popup">
          <input
            class="input-add-task-popup"
            id="input-add-task-popup"
            type="text"
          />
          <div class="add-task-popup-buttons">
            <button class="button-add-task-popup" id="button-add-task-popup">
              Add
            </button>
            <button
              class="button-cancel-task-popup"
              id="button-cancel-task-popup"
            >
              Cancel
            </button>
          </div>
        </div>`
    }
    Display.loadTasks(projectName)
  }

  //CREATE CONTENT

  static createProject(name) {

  }

  static createTask(name, dueDate) {

  }

  static clear() {

  }

  static clearProjectPreview() {

  }

  static clearProjects() {

  }

  static clearTasks() {

  }

  static closeAllPopups() {

  }

  static closeAllInputs() {

  }

  static handleKeyboardInput(e) {

  }

  //PROJECT ADD EVENT LISTENERS

  static initAddProjectButtons() {

  }

  static openAddProjectPopup() {

  }

  static closeAddProjectPopup() {

  }

  static addProject() {

  }

  static handleAddProjectPopupInput(e) {

  }

  //PROJECT EVENT LISTENERS

  static initProjectButtons() {

  }

  static openInboxTasks() {

  }

  static openTodayTasks() {

  }

  static openWeekTasks() {

  }

  static handleProjectButton(e) {

  }

  static openProject(projectName, projectButton) {

  }

  static deleteProject(projectName, button) {

  }

  static openNav() {

  }

  //ADD TASK EVENT LISTENERS

  static initAddTaskButtons() {

  }

  static openAddTaskPopup() {

  }

  static closeAddTaskPopup() {

  }

  static addTask() {

  }

  //TASK EVENT LISTENERS

  static initTaskButtons() {

  }

  static handleTaskButton(e) {

  }

  static setTaskCompleted(taskButton) {

  }

  static deleteTask(taskButton) {

  }

  static openRenameInput(taskButton) {

  }

  static closeRenameInput(taskButton) {

  }

  static renameTask(e) {

  }

  static openSetDateInput(taskButton) {

  }

  static closeSetDateInput(taskButton) {

  }

  static setTaskDate() {

  }
}