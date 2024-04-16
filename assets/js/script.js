const targetSaveButton = $('#saveButton')

// Retrieve tasks and nextId from localStorage

let taskList = JSON.parse(localStorage.getItem("tasks")) || []

let nextId = JSON.parse(localStorage.getItem("nextId"));


//======================================================================================
// Todo: create a function to generate a unique task id

function generateTaskId() {
    // check if the tasklist has items if not return 1 (the first item that will have a unique id)
 
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
const today = new Date()
const dueDate = new Date(task.dueDate)
const timeDiff = dueDate.getTime() - today.getTime()
const daysUntilDue = Math.ceil(timeDiff / (1000*3600*24)) // timediff - a day(in miliseconds to keep it accurate)

//color based due date
let textColor = ''
let bgCardColor = ''
if(daysUntilDue < 0){
    textColor = 'text-dark' //bootstrap colors
    bgCardColor = 'bg-danger'
}else if(daysUntilDue <= 2){
    textColor = 'text-dark' // bootstrap colors
    bgCardColor = 'bg-warning'
}

  const taskCardHTML = `
    <div class="task-card card border-light mb-3 " data-task-id="${task.id}">
        <div class="card-header ${bgCardColor} ${textColor}">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
            <p class="card-text"><strong>Description:</strong> ${task.description}</p>
            <button class="btn btn-danger delete-task"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="card-body bg-dark ">
        </div>
    </div>
  `;
 
  return taskCardHTML;
}

//======================================================================================
// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
    // Clear task cards in all lanes
  
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    //Iterate through task list
  
    taskList.forEach(task => {
        const taskCardHTML = createTaskCard(task);
        const $lane = $('.' + task.status + '-cards');
        //append
        $lane.append(taskCardHTML);
    });

    // Make task cards draggable

    $('.task-card').draggable({
        revert: true,
        stack: '.task-card'
    });
  
}

//======================================================================================
// Todo: create a function to handle adding a new task

function handleAddTask(event) {
    //prevent the default behavior
 
    event.preventDefault();

    // retrieve form data (store the inputs)

    const taskTitle = $('#nameInput').val();
    const dueDate = $('#dateInput').val();
    const description = $('#descriptionInput').val();

    // object for task
   
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: dueDate,
        description: description,
        status: 'todo'
    }

    // push newtask 

    taskList.push(newTask)

    // Store updated task list in local storage 

    localStorage.setItem("tasks", JSON.stringify(taskList));


    renderTaskList();

    // Hide the form modal
    $('#formModal').modal('hide')
}

//======================================================================================
// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {
    // Get the id of the task to be deleted
 
    const taskId = $(this).closest('.task-card').data('task-id')

    // Filter the task to be deleted from the taskList
  
    taskList = taskList.filter(task => task.id !== taskId)

 
    localStorage.setItem("tasks", JSON.stringify(taskList));

    
  
    $(this).closest('.task-card').remove();
}

//======================================================================================
// Todo: create a function to handle dropping a task into a new status lane

function handleDrop(event, ui) {
     // Target the dragged object
     const droppedTaskCard = ui.draggable;
    
     // Get the id of the place we drop it into (lane ID)
     const droppableLaneId = $(this).closest('.lane').attr('id');
     
     // id name locations for task card 
     const laneIdToDivId = {
         'todo': '#todo-cards',
         'in-progress': '#in-progress-cards',
         'done': '#done-cards'
     };
 
     // Retrieve the div ID based on the lane ID
     const targetDivId = laneIdToDivId[droppableLaneId];
 
     // append task card to the div
     $(targetDivId).append(droppedTaskCard);
     
     // updatetask status based on the lane ID
     const newStatus = droppableLaneId;
     const taskId = droppedTaskCard.data('task-id');
     const droppedTaskIndex = taskList.findIndex(task => task.id === taskId);
     taskList[droppedTaskIndex].status = newStatus;
     
     // Update local storage with the updated task list
     localStorage.setItem("tasks", JSON.stringify(taskList));
}

//======================================================================================
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

$(document).ready(function () {
    // Event listeners
   
    targetSaveButton.click(handleAddTask)
    // Adds event listener to the delete task button to handle task deletion.
    $(document).on('click', '.delete-task', handleDeleteTask)

    // Make lanes droppable
  
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    // Render the initial task list

    renderTaskList();
});