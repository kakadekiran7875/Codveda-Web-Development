/**
 * TaskFlow Pro - To-Do List Application with LocalStorage Persistence
 * Level 2 Task 2: Build a To-Do List App with JavaScript
 * Codveda Web Development Internship
 */

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'codveda_taskflow_items';

  // State
  let tasks = loadTasks();
  let currentFilter = 'all';
  let currentCategory = 'all';
  let searchQuery = '';
  let editingTaskId = null;

  // DOM Elements
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskCategoryInput = document.getElementById('task-category');
  const taskPriorityInput = document.getElementById('task-priority');
  const taskDueDateInput = document.getElementById('task-due-date');
  const taskListEl = document.getElementById('task-list');
  const emptyStateEl = document.getElementById('empty-state');
  const searchInput = document.getElementById('search-tasks');
  const filterBtns = document.querySelectorAll('.filter-btn:not(#export-tasks-btn):not(#clear-completed-btn)');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  const exportTasksBtn = document.getElementById('export-tasks-btn');
  const catChips = document.querySelectorAll('.cat-chip');

  // Stats Elements
  const totalTasksEl = document.getElementById('stat-total');
  const activeTasksEl = document.getElementById('stat-active');
  const completedTasksEl = document.getElementById('stat-completed');
  const percentTasksEl = document.getElementById('stat-percent');
  const progressFillEl = document.getElementById('progress-fill');

  // Edit Modal Elements
  const editModal = document.getElementById('edit-modal');
  const editForm = document.getElementById('edit-form');
  const editTitleInput = document.getElementById('edit-title');
  const editCategoryInput = document.getElementById('edit-category');
  const editPriorityInput = document.getElementById('edit-priority');
  const editDueDateInput = document.getElementById('edit-due-date');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');

  // Initial Render
  render();

  // 1. ADD TASK
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = taskTitleInput.value.trim();
      if (!title) return;

      const newTask = {
        id: Date.now().toString(),
        title: title,
        category: taskCategoryInput.value || 'General',
        priority: taskPriorityInput.value || 'medium',
        dueDate: taskDueDateInput.value || 'No date',
        completed: false,
        createdAt: new Date().toISOString()
      };

      tasks.unshift(newTask);
      saveTasks();
      taskForm.reset();
      render();
    });
  }

  // 2. TASK LIST DELEGATION (Toggle complete, Delete, Edit)
  if (taskListEl) {
    taskListEl.addEventListener('click', (e) => {
      const target = e.target;
      const taskItem = target.closest('.task-item');
      if (!taskItem) return;
      const taskId = taskItem.getAttribute('data-id');

      // Checkbox click
      if (target.classList.contains('task-checkbox')) {
        toggleTaskCompletion(taskId);
        return;
      }

      // Delete button click
      if (target.closest('.action-btn.delete')) {
        deleteTask(taskId);
        return;
      }

      // Edit button click
      if (target.closest('.action-btn.edit')) {
        openEditModal(taskId);
      }
    });
  }

  function toggleTaskCompletion(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  }

  // 3. EDIT TASK MODAL
  function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editingTaskId = id;
    editTitleInput.value = task.title;
    editCategoryInput.value = task.category;
    editPriorityInput.value = task.priority;
    editDueDateInput.value = task.dueDate !== 'No date' ? task.dueDate : '';

    editModal.classList.add('open');
  }

  function closeEditModal() {
    editingTaskId = null;
    editModal.classList.remove('open');
  }

  if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEditModal);

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!editingTaskId) return;

      const updatedTitle = editTitleInput.value.trim();
      if (!updatedTitle) return;

      tasks = tasks.map(t => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: updatedTitle,
            category: editCategoryInput.value,
            priority: editPriorityInput.value,
            dueDate: editDueDateInput.value || 'No date'
          };
        }
        return t;
      });

      saveTasks();
      closeEditModal();
      render();
    });
  }

  // 4. FILTERING, CATEGORY CHIPS & SEARCH
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-cat');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });
  }

  if (exportTasksBtn) {
    exportTasksBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `taskflow_backup_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      const completedCount = tasks.filter(t => t.completed).length;
      if (completedCount === 0) return;
      if (confirm(`Are you sure you want to remove ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        render();
      }
    });
  }

  // 5. RENDER FUNCTION
  function render() {
    // Filter tasks by status
    let filtered = tasks.filter(t => {
      if (currentFilter === 'active') return !t.completed;
      if (currentFilter === 'completed') return t.completed;
      return true;
    });

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === currentCategory.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery) ||
        t.category.toLowerCase().includes(searchQuery)
      );
    }

    // Render list
    taskListEl.innerHTML = '';
    if (filtered.length === 0) {
      emptyStateEl.style.display = 'block';
    } else {
      emptyStateEl.style.display = 'none';
      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        let badgeClass = 'badge-med';
        if (task.priority === 'high') badgeClass = 'badge-high';
        if (task.priority === 'low') badgeClass = 'badge-low';

        li.innerHTML = `
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
          <div class="task-content">
            <div class="task-text">${escapeHtml(task.title)}</div>
            <div class="task-meta">
              <span class="badge ${badgeClass}">${task.priority}</span>
              <span>📁 ${escapeHtml(task.category)}</span>
              <span>📅 ${escapeHtml(task.dueDate)}</span>
            </div>
          </div>
          <div class="task-actions">
            <button class="action-btn edit" title="Edit task" aria-label="Edit task">✏️</button>
            <button class="action-btn delete" title="Delete task" aria-label="Delete task">🗑️</button>
          </div>
        `;
        taskListEl.appendChild(li);
      });
    }

    // Update Statistics
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (totalTasksEl) totalTasksEl.textContent = total;
    if (activeTasksEl) activeTasksEl.textContent = active;
    if (completedTasksEl) completedTasksEl.textContent = completed;
    if (percentTasksEl) percentTasksEl.textContent = `${percent}%`;
    if (progressFillEl) progressFillEl.style.width = `${percent}%`;
  }

  // 6. LOCAL STORAGE PERSISTENCE
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }
    // Seed initial demo tasks for Codveda Web Development
    return [
      {
        id: '1',
        title: 'Complete Level 1 Static Website & Portfolio',
        category: 'Codveda Internship',
        priority: 'high',
        dueDate: '2026-09-12',
        completed: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Build Persistent JavaScript To-Do App',
        category: 'Codveda Internship',
        priority: 'high',
        dueDate: '2026-09-13',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Architect Full-Stack CRUD Application with Node.js & React',
        category: 'Advanced Web Dev',
        priority: 'medium',
        dueDate: '2026-09-15',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Record LinkedIn Demonstration Video with #CodvedaJourney',
        category: 'Showcase & Social',
        priority: 'low',
        dueDate: '2026-09-18',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
