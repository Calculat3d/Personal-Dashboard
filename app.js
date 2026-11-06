document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const todoItem = document.createElement("li");
    const todoInput = document.getElementById("todo-input");
    let text = todoInput.value;
    const todoList = document.getElementById("todo-list"); 

    text = text.trim(); // Remove leading and trailing whitespace

    if (text === "") {
        alert("Please enter a todo item.");
        console.log("Empty input, no todo item added");
        return; // Exit the function if the input is empty
    }

    todoItem.appendChild(document.createTextNode(text));

    // Add an event listener to toggle the "done" class when the todo item is clicked
    todoItem.addEventListener("click", function() {
        todoItem.classList.toggle("done");
        console.log("Todo item marked as completed/uncompleted");
    });

    // Add a delete button to each todo item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        todoList.removeChild(todoItem);
        console.log("Todo item deleted");
    });

    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    todoInput.value = ""; // Clear the input field after adding the item

    console.log("Todo item added");
});