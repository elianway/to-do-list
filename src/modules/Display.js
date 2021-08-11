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

  }

  static loadTasks(projectName) {

  }

  static loadProjectContent(projectName) {

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