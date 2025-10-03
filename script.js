const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDesc = document.getElementById('taskDesc');
const priority = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Modal elements
const editModal = document.getElementById('editModal');
const editTitle = document.getElementById('editTitle');
const editDesc = document.getElementById('editDesc');
const editPriority = document.getElementById('editPriority');
const saveEditBtn = document.getElementById('saveEdit');
const cancelEditBtn = document.getElementById('cancelEdit');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> (${task.priority})<br>
        <small>${task.description}</small>
      </div>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="openEdit(${index})">✏</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update progress bar
function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  progressFill.style.width = percent + '%';
  progressText.innerText = `${percent}% completed (${done}/${total})`;
}

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push({
    title: taskInput.value,
    description: taskDesc.value,
    priority: priority.value,
    completed: false
  });
  taskInput.value = '';
  taskDesc.value = '';
  renderTasks();
});

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Open edit modal
function openEdit(index) {
  editIndex = index;
  const task = tasks[index];
  editTitle.value = task.title;
  editDesc.value = task.description;
  editPriority.value = task.priority;
  editModal.style.display = 'flex';
}

// Save edit
saveEditBtn.addEventListener('click', () => {
  if (editIndex !== null) {
    tasks[editIndex].title = editTitle.value;
    tasks[editIndex].description = editDesc.value;
    tasks[editIndex].priority = editPriority.value;
    renderTasks();
    closeModal();
  }
});

// Cancel edit
cancelEditBtn.addEventListener('click', closeModal);

function closeModal() {
  editModal.style.display = 'none';
  editIndex = null;
}

renderTasks();

