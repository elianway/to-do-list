import { toDate, isToday, isThisWeek, subDays } from 'date-fns'

export default class Project {
  constructor(name) {
    this.name = name
    this.tasks = []
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setTasks(tasks) {
    this.tasks = tasks
  }

  getTasks() {
    return this.tasks
  }

  getTask(taskName) {
    return this.tasks.filter((task) => task.getName() === taskName)
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName)
  }

  addTask(task) {
    if (this.tasks.contains(task)) return
    this.tasks.push(task)
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.getName() !== taskName)
  }

  getTasksToday() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted())
      return isToday(toDate(taskDate))
    })
  }

  getTasksThisWeek() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted())
      return isThisWeek(subDays(toDate(taskDate), 1))
    })
  }
}