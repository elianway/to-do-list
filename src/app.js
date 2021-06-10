import {format} from 'date-fns'

//on page load create home project

const toDoFactory = (title, project, dueDate, isComplete) => {  
  const title = this.title;
  const project = this.project;
  const dueDate = format(new Date(), 'YYYY-MM-DD');
  const isComplete = false;

  if (this.dueDate !== undefined) dueDate = this.dueDate;

  return { title, project, dueDate, isComplete };
}

const changeTitle = (item, newTitle) => {
  item.title = newTitle;
}

const completeItem = (item) => {
  item.isComplete = true;
}

const deleteItem = (item, project) => {
  const index = project.indexOf(item);
  if (index > -1) {
    project.splice(index, 1);
  }
  delete item;
}

const createProject = (title) => {
  const title = this.title;
  const contents = [];
  return { title, contents };
}

const deleteProject = (project) => {
  delete project;
}