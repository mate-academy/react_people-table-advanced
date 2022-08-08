# React + Redux list of TODOs

> This tasks will help you understand how to use the main concepts of the Redux.

Remplement the [Dynamic list of TODOs](https://github.com/mate-academy/react_dynamic-list-of-todos#react-dynamic-list-of-todos)
using the Redux. It should look and work idetically so use the same markup.

- learn and remove all the demo code (if you don't need it);
- create `store/loading.ts` to control the `loading` value (just a `boolean` not an object);
- create `store/currentTodo.ts` to control a selected todo;
- use `combineReducers` in the `store/index.ts` with `loading` and `currentTodo` parts;
- all the selectors must be added to the `store/index.ts` because they get the `RootState` not a part of it;

## (*) Optional tasks
- add the `loadTodo` thunk to the `store/index.ts` and use it in the `App`;

## Instructions
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_redux-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
