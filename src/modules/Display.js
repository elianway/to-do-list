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
    const userProjects = document.getElementById('projects-list')
    userProjects.innerHTML += `
      <button class="button-project" data-project-button>
        <div class="left-project-panel">
          <i class="fas fa-tasks"></i>
          <span>${name}</span>
        </div>
        <div class="right-project-panel">
          <i class="fas fa-times"></i>
        </div>
      </button>`
    
    Display.initProjectButtons()
  }

  static createTask(name, dueDate) {
    const tasksList = document.getElementById('tasks-list')
    tasksList.innerHTML += `
      <button class="button-task" data-task-button>
        <div class="left-task-panel">
          <i class="fas fa-circle"></i>
          <p class="task-content">${name}</p>
          <input type="text" class="input-task-name" data-input-task-name>
        </div>
        <div class="right-task-panel">
          <p class="due-date" id="due-date">${dueDate}</p>
          <input type="date" class="input-due-date" data-input-due-date>
          <i class="fas fa-times"></i>
        </div>
      </button>`
    
    Display.initTaskButtons()
  }

  static clear() {
    Display.clearProjectPreview()
    Display.clearProjects()
    Display.clearTasks()
  }

  static clearProjectPreview() {
    const projectPreview = document.getElementById('project-preview')
    projectPreview.textContent = ''
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list')
    projectsList.textContent = ''
  }

  static clearTasks() {
    const tasksList = document.getElementById('tasks-list')
    tasksList.textContent = ''
  }

  static closeAllPopups() {
    Display.closeAddProjectPopup()
    if (document.getElementById('button-add-task')) {
      Display.closeAddTaskPopup()
    }
    if (
      document.getElementById('tasks-list') &&
      document.getElementById('tasks-list').innerHTML !== ''
    ) {
      Display.closeAllInputs()
    }
  }

  static closeAllInputs() {
    const taskButtons = document.querySelectorAll('[data-task-button]')

    taskButtons.forEach((button) => {
      Display.closeRenameInput(button)
      Display.closeSetDateInput(button)
    })
  }

  static handleKeyboardInput(e) {
    if (e.key === 'Escape') Display.closeAllPopups()
  }

  //PROJECT ADD EVENT LISTENERS

  static initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopupButton = document.getElementById(
      'button-add-project-popup'
    )
    const cancelProjectPopupButton = document.getElementById(
      'button-cancel-project-popup'
    )
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )

    addProjectButton.addEventListener('click', Display.openAddProjectPopup)
    addProjectPopupButton.addEventListener('click', Display.addProject)
    cancelProjectPopupButton.addEventListener('click', Display.closeAddProjectPopup)
    addProjectPopupInput.addEventListener(
      'keypress',
      Display.handleAddProjectPopupInput()
    )
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup')
    const addProjectButton = document.getElementById('button-add-project')

    Display.closeAllPopups()
    addProjectPopup.classList.add('active')
    addProjectButton.classList.add('active')
  }

  static closeAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup')
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )

    addProjectPopup.classList.remove('active')
    addProjectButton.classList.remove('active')
    addProjectPopupInput.value = ''
  }

  static addProject() {
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )
    const projectName = addProjectPopupInput.value

    if (projectName === '') {
      alert("Project name must have value")
      return
    }

    if (Storage.getTodoList().contains(projectName)) {
      addProjectPopupInput.value = ''
      alert('Project already exists')
      return
    }

    Storage.addProject(new Project(projectName))
    Display.createProject(projectName)
    Display.closeAddProjectPopup()
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') Display.addProject()
  }

  //PROJECT EVENT LISTENERS

  static initProjectButtons() {
    const inboxProjectsButton = document.getElementById('button-inbox-projects')
    const todayProjectsButton = document.getElementById('button-today-projects')
    const weekProjectsButton = document.getElementById('button-week-projects')
    const projectButtons = document.querySelectorAll('[data-project-button]')
    const openNavButton = document.getElementById('button-open-nav')

    inboxProjectsButton.addEventListener('click', Display.openInboxTasks)
    todayProjectsButton.addEventListener('click', Display.openTodayTasks)
    weekProjectsButton.addEventListener('click', Display.openWeekTasks)
    projectButtons.forEach((projectButton) => 
      projectButton.addEventListener('click', Display.handleProjectButton)
    )
    openNavButton.addEventListener('click', Display.openNav)
  }

  static openInboxTasks() {
    Display.openProject('Inbox', this)
  }

  static openTodayTasks() {
    Storage.updateTodayProject()
    Display.openProject('Today', this)
  }

  static openWeekTasks() {
    Storage.updateWeekProject()
    Display.openProject('This week', this)
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent

    if (e.target.classList.contains('fa-times')) {
      Display.deleteProject(projectName, this)
      return
    }

    Display.openProject(projectName, this)
  }

  static openProject(projectName, projectButton) {
    const defaultProjectButtons = document.querySelectorAll(
      '.button-default-project'
    )
    const projectButtons = document.querySelectorAll('.button-project')
    const buttons = [...defaultProjectButtons, ...projectButtons]

    buttons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')
    Display.closeAddProjectPopup()
    Display.loadProjectContent(projectName)
  }

  static deleteProject(projectName, button) {
    if (button.classList.contains('active')) Display.clearProjectPreview()
    Storage.deleteProject(projectName)
    Display.clearProjects()
    Display.loadProjects()
  }

  static openNav() {
    const nav = document.getElementById('nav')

    Display.closeAllPopups()
    nav.classList.toggle('active')
  }

  //ADD TASK EVENT LISTENERS

  static initAddTaskButtons() {
    const addTaskButton = document.getElementById('button-add-task')
    const addTaskPopupButton = document.getElementById('button-add-task-popup')
    const cancelTaskPopupButton = document.getElementById(
      'button-cancel-task-popup'
    )
    const addTaskPopupInput = document.getElementById('input-add-task-popup')

    addTaskButton.addEventListener('click', Display.openAddTaskPopup)
    addTaskPopupButton.addEventListener('click', Display.addTask)
    cancelTaskPopupButton.addEventListener('click', Display.closeAddTaskPopup)
    addTaskPopupInput.addEventListener('keypress', Display.handleAddTaskPopupInput)
  }

  static openAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup')
    const addTaskButton = document.getElementById('button-add-task')

    Display.closeAllPopups()
    addTaskPopup.classList.add('active')
    addTaskButton.classList.add('active')
  }

  static closeAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup')
    const addTaskButton = document.getElementById('button-add-task')
    const addTaskInput = document.getElementById('input-add-task-popup')

    addTaskPopup.classList.remove('active')
    addTaskButton.classList.remove('active')
    addTaskInput.value = ''
  }

  static addTask() {
    const projectName = document.getElementById('project-name').textContent
    const addTaskPopupInput = document.getElementById('input-add-task-popup')
    const taskName = addTaskPopupInput.value
    
    if (taskName === '') {
      alert('Task name must have value')
      return
    }
    if (Storage.getTodoList().getProject(projectName).contains(taskName)) {
      alert('Task names must be different')
      addTaskPopupInput.value = ''
      return
    }

    Storage.addTask(projectName, new Task(taskName))
    Display.createTask(taskName, 'No date')
    Display.closeAddTaskPopup()
  }

  static handleAddTaskPopupInput(e) {
    if (e.key === 'Enter') Display.addTask()
  }

  //TASK EVENT LISTENERS

  static initTaskButtons() {
    const tastButtons = document.querySelectorAll('[data-task-button]')
    const taskNameInputs = document.querySelectorAll('[data-input-task-name]')
    const dueDateInputs = document.querySelectorAll('[data-input-due-date]')

    taskButtons.forEach((taskButton) => 
      taskButton.addEventListener('click', Display.handleTaskButton)
    )
    taskNameInputs.forEach((taskNameInput) =>
      taskNameInput.addEventListener('keypress', Display.renameTask)
    )
    dueDateInputs.forEach((dueDate) =>
      dueDate.addEventListener('change', Display.setTaskDate)
    )
  }

  static handleTaskButton(e) {
    if (e.target.classList.contains('fa-circle')) {
      Display.setTaskCompleted(this)
      return
    }
    if (e.target.classList.contains('fa-times')) {
      Display.deleteTask(this)
      return
    }
    if (e.target.classList.contains('task-content')) {
      Display.openRenameInput(this)
      return
    }
    if (e.target.classList.contains('due-date')) {
      Display.openSetDateInput(this)
    }
  }

  static setTaskCompleted(taskButton) {
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      const parentProjectName = taskName.split('(')[1].split(')')[0]
      Storage.deleteTask(parentProjectName, taskName.split(' ')[0])
      if (projectName === 'Today') {
        Storage.updateTodayProject()
      } else {
        Storage.updateWeekProject()
      }
    } else {
      Storage.deleteTask(projectName, taskName)
    }
    Display.clearTasks()
    Display.loadTasks(projectName)
  }

  static deleteTask(taskButton) {
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      Storage.deleteTask(mainProjectName, taskName)
    }
    Storage.deleteTask(projectName, taskName)
    Display.clearTasks()
    Display.loadTasks(projectName)
  }

  static openRenameInput(taskButton) {
    const taskNamePara = taskButton.children[0].children[1]
    let taskName = taskNamePara.textContent
    const taskNameInput = taskButton.children[0].children[2]
    const projectName = taskButton.parentNode.parentNode.children[0].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      ;[taskName] = taskName.split(' (')
    }

    Display.closeAllPopups()
    taskNamePara.classList.add('active')
    taskNameInput.classList.add('active')
    taskNameInput.value = taskName
  }

  static closeRenameInput(taskButton) {
    const taskName = taskButton.children[0].children[1]
    let taskNameInput = taskButton.children[0].children[2]

    taskName.classList.remove('active')
    taskNameInput.classList.remove('active')
    taskNameInput.value = ''
  }

  static renameTask(e) {
    if (e.key === 'Enter') return

    const projectName = document.getElementById('project-name').textContent
    const taskName = this.previousElementSibling.textContent
    const newTaskName = this.value

    if (newTaskName = '') {
      alert("Task name can't be empty")
      return
    }

    if (Storage.getTodoList().getProject(projectName).contains(newTaskName)) {
      this.value = ''
      alert('Task names must be different')
      return
    }

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' ')[0]
      Storage.renameTask(mainProjectName, mainTaskName, newTaskName)
    }
    Display.clearTasks()
    Display.loadTasks(projectName)
    Display.closeRenameInput(this.parentNode.parentNode)
  }

  static openSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    Display.closeAllPopups()
    dueDate.classList.add('active')
    dueDateInput.classList.add('active')
  }

  static closeSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    dueDate.classList.remove('active')
    dueDateInput.classList.remove('active')
  }

  static setTaskDate() {
    const taskButton = this.parentNode.parentNode
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent
    const newDueDate = format(new Date(this.value), 'dd/MM/yyyy')

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' (')[0]
      Storage.setTaskDate(projectName, taskName, newDueDate)
      Storage.setTaskDate(mainProjectName, mainTaskName, newDueDate)
      if (projectName === 'Today') {
        Storage.updateTodayProject()
      } else {
        Storage.updateWeekProject()
      }
    } else {
      Storage.setTaskDate(projectName, taskName, newDueDate)
    }
    Display.clearTasks()
    Display.loadTasks(projectName)
    Display.closeSetDateInput(taskButton)
  }
}