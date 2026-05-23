/* Funções puras para o gerenciador de tarefas (to-do)
   Refactor: centraliza validação de arrays em ensureTasksArray
*/

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
}

function ensureTasksArray(tasks) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
}

export function createTask(title, id = 1) {
  if (!validateTitle(title)) {
    throw new Error('Invalid title');
  }
  return {
    id,
    title: title.trim(),
    completed: false,
  };
}

export function addTask(tasks, title) {
  ensureTasksArray(tasks);
  if (!validateTitle(title)) throw new Error('Invalid title');

  const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
  const newTask = createTask(title, nextId);
  return [...tasks, newTask];
}

export function toggleTask(task) {
  if (!task || typeof task !== 'object') throw new Error('task must be an object');
  return { ...task, completed: !task.completed };
}

export function removeTask(tasks, id) {
  ensureTasksArray(tasks);
  return tasks.filter((t) => t.id !== id);
}

export function filterTasks(tasks, status = 'all') {
  ensureTasksArray(tasks);
  if (status === 'all') return [...tasks];
  if (status === 'completed') return tasks.filter((t) => t.completed);
  if (status === 'pending') return tasks.filter((t) => !t.completed);
  throw new Error('Unknown status');
}

export function countTasks(tasks) {
  ensureTasksArray(tasks);
  return tasks.length;
}

export function countCompleted(tasks) {
  ensureTasksArray(tasks);
  return tasks.filter((t) => t.completed).length;
}

export function countPending(tasks) {
  ensureTasksArray(tasks);
  return tasks.filter((t) => !t.completed).length;
}

export function updateTaskTitle(tasks, id, newTitle) {
  ensureTasksArray(tasks);
  if (!validateTitle(newTitle)) throw new Error('Invalid title');

  return tasks.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t));
}

export default {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  filterTasks,
  countTasks,
  countCompleted,
  countPending,
  updateTaskTitle,
};
