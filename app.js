const taskArray = loadTasks() || [];

document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const todoInput = document.getElementById("todo-input");
    let text = todoInput.value;

    text = text.trim(); // Remove leading and trailing whitespace

    if (text === "") {
        alert("Please enter a todo item.");
        console.log("Empty input, no todo item added");
        return; // Exit the function if the input is empty
    }

    // Storing
    const taskObject = {
        text: text,
        completed: false,
        id: Date.now() // Unique ID based on timestamp
    };
    taskArray.push(taskObject);
    console.log("Task stored in array:", taskObject);

    render(); // Call render to update the displayed list

    saveTasks(); 
    todoInput.value = ""; // Clear the input field after adding the item
    console.log("Todo item added");
});

function render() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear the existing list
    
    taskArray.forEach((todo) => {
        // Create a new todo item and append it to the list
        const todoItem = document.createElement("li");
        todoItem.appendChild(document.createTextNode(todo.text));

        // Apply the "done" class if the todo item is completed 
        if (todo.completed) {
            todoItem.classList.add("done");
        }
        todoItem.addEventListener("click", function() {
            todo.completed = !todo.completed; // Update the completed status in the array
            console.log("Todo item marked as completed/uncompleted");
            saveTasks();
            render();
        });

        // Add a delete button to each todo item
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();
            const index = taskArray.findIndex(item => item.id === todo.id);
            if (index > -1) {
                taskArray.splice(index, 1); // Remove the item from the array
            }
            console.log("Todo item deleted");
            saveTasks();
            render();
        });

        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

function saveTasks() {
    const tasksJSON = JSON.stringify(taskArray);
    localStorage.setItem("tasks", tasksJSON);
}

function loadTasks() {
    const tasksJSON = localStorage.getItem("tasks");
    try {
        const tasks = JSON.parse(tasksJSON);
        return tasks;
    } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
    }
}

render(); // Initial render to display any existing tasks