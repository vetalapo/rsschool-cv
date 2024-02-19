let taskInput = document.getElementById("new-task-text");
let addButton = document.getElementsByClassName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");

  //input (checkbox)
  let checkBox = document.createElement("input");//checkbox
  //label
  let label = document.createElement("label");//label
  //input (text)
  let editInput = document.createElement("input");//text
  //button.edit
  let editButton = document.createElement("button");//edit button

  //button.delete
  let deleteButton = document.createElement("button");//delete button
  let deleteButtonImg = document.createElement("img");//delete button image

  listItem.classList.add("task-item");

  label.innerText = taskString;
  label.className = "task-label";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.classList.add("task-checkbox");
  editInput.type = "text";
  editInput.className = "task-text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "button button-edit";

  deleteButton.className = "button button-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("image-delete");
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

let addTask = function() {
  console.log("Add Task...");
  
  //Create a new list item with the text from the #new-task-text:
  if (!taskInput.value) {
    return;
  }

  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
let editTask = function() {
  console.log("Edit Task...");
  console.log("Change \"edit\" to \"save\"");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".task-text");
  let label = listItem.querySelector(".task-label");
  let editBtn = listItem.querySelector(".button-edit");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  } else {
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
let deleteTask = function() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
let taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

let ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  let checkBox=taskListItem.querySelector(".task-checkbox");
  let editButton=taskListItem.querySelector(".button-edit");
  let deleteButton=taskListItem.querySelector(".button-delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
