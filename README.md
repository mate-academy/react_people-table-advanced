# React + Redux list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_redux-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
By requesting [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) and [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), create and display a list of TODO items with an option of removing individual items.

Create and use 3 components:
- `TodoList` (for the whole list),
- `TodoItem` (for a single TODO item),
- `User` (for displaying information about a user).

`TodoList` should display a list of `TodoItem`s. Each `TodoItem` must display the basic info about an item as well as the `User` the item belongs to. You can choose yourself what exact information you want to present and how, but you need to show at least the title of the item, the name of the user and whether the item is completed. Alongside each TODO item there should also be a button that removes the item when clicked.

Initially `TodoList` has to present the user with a button labeled "Load". When the user hits the button, the script starts to download the data; the label of the button has to change to "Loading..." and the button must become disabled. Once the data has been loaded, hide the button altogether and display the TODO items instead.

Additionally, you should provide a capability of sorting the items either by title, user, or the item’s status (whether the item is completed or not).
