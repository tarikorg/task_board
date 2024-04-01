const targetSaveButton = $('#saveButton')
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//if tasklist is null , create a new one
if(!taskList){
    taskList = [];
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
// check if the tasklist has items if not  return 1 (aka it will be first item)
 
  if (taskList.length === 0) {
    return 1; 
} else {
    // If tasks exist, use nextId and increment it by 1
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId))
    return id;
}
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    //prevent the default behavior
event.preventDefault();

//retrive form data ( store the inputs)
const taskTitle = $('#nameInput').val();
const dueDate = $('#dateInput').val();
const description = $('#descriptionInput').val();

// create the task out of the inputs we stored
const newTask = {
    id: generateTaskId(),
    title: taskTitle,
    dueDate: dueDate,
    description: description,   
}

// update task list Array


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

targetSaveButton.click(handleAddTask) // when clicked on savebutton trigger handle add task

});
