
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Read saved tasks
function getTasks() {
    try {
        const tasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        );

        return Array.isArray(tasks) ? tasks : [];
    } catch (error) {
        console.error("Could not read tasks:", error);
        return [];
    }
}

// Save tasks
function saveTasks(tasks) {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error("Could not save tasks:", error);
        alert("Could not save your tasks.");
        return false;
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
            id: Date.now() + Math.random(),
            name: name,
            deadline: deadline
        });

        if (saveTasks(tasks)) {
            window.location.href = "./tasks.html";
        }
    });
}

// PAGE 2: Display and delete tasks
if (taskList) {
    function renderTasks() {
        const tasks = getTasks();

        // Remove the old cards before displaying them again
        taskList.replaceChildren();

        if (tasks.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No tasks yet.";

            message.style.color = "#a1a1aa";
            message.style.textAlign = "center";
            message.style.padding = "24px";

            taskList.appendChild(message);
            return;
        }

        tasks.forEach(function (task, index) {
            // Create task card
            const card = document.createElement("div");
            card.className = "task-card";

            // Ensure the X button can sit in the card's corner
            card.style.position = "relative";
            card.style.paddingRight = "60px";

            // Task name
            const title = document.createElement("h3");
            title.textContent = task.name;

            // Task deadline
            const date = document.createElement("p");
            date.textContent = task.deadline
                ? "Deadline: " + task.deadline
                : "No deadline set";

            // Create X button
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "\u00D7";
            deleteButton.setAttribute(
                "aria-label",
                "Delete task: " + task.name
            );

            // Button appearance
            Object.assign(deleteButton.style, {
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.08)",
                color: "#f87171",
                fontSize: "25px",
                lineHeight: "1",
                cursor: "pointer",
                zIndex: "2",
                transition: "all 0.2s ease"
            });

            // Glow on hover
            deleteButton.addEventListener("mouseenter", function () {
                deleteButton.style.background = "rgba(239,68,68,0.18)";
                deleteButton.style.borderColor = "#f87171";
                deleteButton.style.boxShadow =
                    "0 0 18px rgba(239,68,68,0.3)";
                deleteButton.style.transform = "scale(1.08)";
            });

            deleteButton.addEventListener("mouseleave", function () {
                deleteButton.style.background = "rgba(255,255,255,0.08)";
                deleteButton.style.borderColor =
                    "rgba(255,255,255,0.18)";
                deleteButton.style.boxShadow = "none";
                deleteButton.style.transform = "scale(1)";
            });

            // Delete this task
            deleteButton.addEventListener("click", function () {
                const currentTasks = getTasks();

                // Remove the task at this position
                currentTasks.splice(index, 1);

                if (saveTasks(currentTasks)) {
                    renderTasks();
                }
            });

            // Put everything inside the card
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(deleteButton);

            // Display the card
            taskList.appendChild(card);
        });
    }

    renderTasks();
}
