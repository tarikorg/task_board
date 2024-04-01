const targetSaveButton = $('#saveButton')
// Retrieve tasks and nextId from localStorage

//taskList will getItem because we want it to display whenever we refresh the page
// taslist not has been setItem yet, do it in addEvent
let taskList = JSON.parse(localStorage.getItem("tasks"));


let nextId = JSON.parse(localStorage.getItem("nextId"));
//======================================================================================
//if tasklist is null , create a new one
if (!taskList) {
    taskList = [];
}
//======================================================================================
// Todo: create a function to generate a unique task id
function generateTaskId() {
    // check if the tasklist has items if not  return 1 (aka it will be first item)

    if (taskList.length === 0) {
        return 1;
    } else {
        // If tasks exist, use nextId and increment it by 1
        const id = nextId++;
        // to ensure that the increment the value persist UPDATE  next id
        localStorage.setItem("nextId", JSON.stringify(nextId))
        return id;
    }
}



//======================================================================================
// Todo: create a function to create a task card
function createTaskCard(task) {

  // Create HTML markup for task card
  const taskCardHTML = `
  <div class="task-card card border-light mb-3">
      <div class="card-header bg-white">
          <h5 class="card-title">${task.title}</h5>
      </div>
      <div class="card-body bg-light">
          <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
          <p class="card-text"><strong>Description:</strong> ${task.description}</p>
      </div>
  </div>
`;

return taskCardHTML;

}



//======================================================================================
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

//make cards . loop through task lists and make one for each
taskList.forEach(task => {
    const taskCardHTML = createTaskCard(task); // call createTaskCard
     // Add task card to the todo container
     $('#todo-cards').append(taskCardHTML);
});

// Make task cards draggable
$('.task-card').draggable({
    revert: true, // revert the card to its original position if its not dropped in a droppable
    stack: '.task-card' // Maintain the stack order of the cards
});

}




//======================================================================================
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
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

    // update task list
    taskList.push(newTask)

    // Store updated task list in local storage 
    localStorage.setItem("tasks", JSON.stringify(taskList));

}






//======================================================================================
// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}









//======================================================================================
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}







//======================================================================================
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

renderTaskList();

    targetSaveButton.click(handleAddTask) // when clicked on savebutton trigger handle add task

});
