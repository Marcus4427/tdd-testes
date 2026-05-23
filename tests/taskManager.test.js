import { describe, it, expect } from 'vitest';
import {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  filterTasks,
  countTasks,
  countCompleted,
  countPending,
} from '../src/taskManager.js';

describe('taskManager - validação de título', () => {
  it('valida títulos válidos (>= 3 chars)', () => {
    expect(validateTitle('Estudar')).toBe(true);
    expect(validateTitle('  abc  ')).toBe(true);
  });

  it('rejeita títulos curtos, vazios ou não-string', () => {
    expect(validateTitle('')).toBe(false);
    expect(validateTitle('  ')).toBe(false);
    expect(validateTitle('ab')).toBe(false);
    expect(validateTitle(null)).toBe(false);
    expect(validateTitle(123)).toBe(false);
  });
});

describe('taskManager - criação e adição', () => {
  it('createTask cria uma tarefa válida', () => {
    const task = createTask('Estudar');
    expect(task).toEqual({ id: 1, title: 'Estudar', completed: false });
  });

  it('addTask adiciona em uma lista vazia e atribui id 1', () => {
    const tasks = [];
    const newTasks = addTask(tasks, 'Comprar leite');
    expect(newTasks).toHaveLength(1);
    expect(newTasks[0]).toMatchObject({ id: 1, title: 'Comprar leite', completed: false });
    // original não deve ser mutado
    expect(tasks).toHaveLength(0);
  });

  it('addTask adiciona e incrementa id quando há tarefas existentes', () => {
    const tasks = [{ id: 1, title: 'Tarefa 1', completed: false }];
    const newTasks = addTask(tasks, 'Tarefa 2');
    expect(newTasks).toHaveLength(2);
    expect(newTasks[1].id).toBe(2);
  });

  it('addTask lança erro quando título inválido', () => {
    expect(() => addTask([], 'ab')).toThrow();
  });
});

describe('taskManager - toggle, remove e filtros', () => {
  it('toggleTask inverte o campo completed sem mutar o original', () => {
    const t = { id: 1, title: 'X', completed: false };
    const toggled = toggleTask(t);
    expect(toggled.completed).toBe(true);
    expect(t.completed).toBe(false);
  });

  it('removeTask remove por id', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true },
    ];
    const remaining = removeTask(tasks, 1);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(2);
  });

  it('filterTasks retorna todas/completas/pendentes', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true },
      { id: 3, title: 'C', completed: false },
    ];
    expect(filterTasks(tasks, 'all')).toHaveLength(3);
    expect(filterTasks(tasks, 'completed')).toEqual([{ id: 2, title: 'B', completed: true }]);
    expect(filterTasks(tasks, 'pending')).toEqual([
      { id: 1, title: 'A', completed: false },
      { id: 3, title: 'C', completed: false },
    ]);
  });
});

describe('taskManager - contadores', () => {
  it('countTasks, countCompleted e countPending retornam números corretos', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true },
      { id: 3, title: 'C', completed: false },
    ];
    expect(countTasks(tasks)).toBe(3);
    expect(countCompleted(tasks)).toBe(1);
    expect(countPending(tasks)).toBe(2);
  });
});
