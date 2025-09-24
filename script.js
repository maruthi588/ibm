const taskTitle = document.getElementById("taskTitle");
const taskDeadline = document.getElementById("taskDeadline");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <br>
        <small>Deadline: ${task.deadline || "No deadline"}</small>
      </div>
      <div>
        <button class="complete">${task.done ? "Undo" : "Done"}</button>
        <button class="delete">X</button>
      </div>
    `;

    // Mark complete
    li.querySelector(".complete").onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    // Delete
    li.querySelector(".delete").onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });

  updateProgress();
}

// Add task
addTaskBtn.onclick = () => {
  if (taskTitle.value.trim() === "") return;

  const newTask = {
    title: taskTitle.value,
    deadline: taskDeadline.value,
    done: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskTitle.value = "";
  taskDeadline.value = "";
};

// Update progress bar
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percent + "%";
}

// Initial render
renderTasks();
