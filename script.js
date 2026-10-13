
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Read saved tasks
function getTasks() {
    try {
        const tasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        );

        return Array.isArray(tasks) ? tasks : [];
    } catch {
        return [];
    }
}

// PAGE 1: Add a task
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document
            .getElementById("task-name")
            .value
            .trim();

        const deadline = document
            .getElementById("task-deadline")
            .value;

        if (!name) return;

        const tasks = getTasks();

        tasks.push({
            id: Date.now(),
            name: name,
            deadline: deadline
        });

        // Save all tasks in the browser
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Go to the task list page
        window.location.href = "tasks.html";
    });
}

// PAGE 2: Display saved tasks
if (taskList) {
    const tasks = getTasks();

    if (tasks.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No tasks yet.";
        taskList.appendChild(message);
    }

    tasks.forEach(function (task) {
        const card = document.createElement("div");
        card.className = "task-card";

        const title = document.createElement("h3");
        title.textContent = task.name;

        const date = document.createElement("p");
        date.textContent = task.deadline
            ? "Deadline: " + task.deadline
            : "No deadline set";

        card.appendChild(title);
        card.appendChild(date);

        taskList.appendChild(card);
    });
}