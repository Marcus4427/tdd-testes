import { describe, it, expect } from 'vitest';
import { updateTaskTitle } from '../src/taskManager.js';

describe('updateTaskTitle', () => {
  it('atualiza o título sem mutar o array original', () => {
    const tasks = [{ id: 1, title: 'Old', completed: false }];
    const updated = updateTaskTitle(tasks, 1, 'New Title');
    expect(updated[0].title).toBe('New Title');
    expect(tasks[0].title).toBe('Old'); // original não mutado
  });

  it('lança erro quando título inválido', () => {
    expect(() => updateTaskTitle([{ id: 1, title: 'X', completed: false }], 1, 'ab')).toThrow();
  });
});
