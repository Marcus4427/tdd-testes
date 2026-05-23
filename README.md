# TDD - Gerenciador de Tarefas (to-do) - Exercício

Este repositório contém uma implementação minimalista das funções de negócio de um gerenciador de tarefas (apenas em memória) acompanhada de testes unitários usando Vitest.

Arquivos criados:

- `src/taskManager.js` - funções puras para manipular tarefas
- `tests/taskManager.test.js` - testes unitários escritos com Vitest
- `.gitignore` - ignora `node_modules/` e `coverage/`

Como rodar os testes (quando quiser executar):

```bash
# instalar dependências (se ainda não instaladas)
npm install

# rodar todos os testes uma vez
npm test

# rodar em modo watch
npm run test:watch

# gerar coverage
npm run coverage
```
