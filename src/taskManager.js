// Funções puras para o gerenciador de tarefas (to-do)

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
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
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
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
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  return tasks.filter((t) => t.id !== id);
}

export function filterTasks(tasks, status = 'all') {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  if (status === 'all') return [...tasks];
  if (status === 'completed') return tasks.filter((t) => t.completed);
  if (status === 'pending') return tasks.filter((t) => !t.completed);
  throw new Error('Unknown status');
}

export function countTasks(tasks) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  return tasks.length;
}

export function countCompleted(tasks) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  return tasks.filter((t) => t.completed).length;
}

export function countPending(tasks) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  return tasks.filter((t) => !t.completed).length;
}

export function updateTaskTitle(tasks, id, newTitle) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
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
};
