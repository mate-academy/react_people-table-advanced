# React + Redux list of TODOs

## Task

By requesting [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) and [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), create and display a list of TODO items with an option of removing individual items.

Create and use five components:

- `TodoList` (for the whole list),
- `TodoListHandler` (Redux container for `TodoList` that manages its props, including callbacks if any),
- `TodoItem` (for a single TODO item),
- `TodoItemHandler` (Redux container for `TodoItem` that manages its props, including callbacks if any),
- `User` (for displaying information about a user).

`TodoList` should display a list of `TodoItem`s (through `TodoItemHandler`); each `TodoItem` must display the basic info about an item as well as the `User` the item belongs to. You can choose yourself what exact information you want to present and how, but you need to show at least the title of the item, the name of the user and whether the item is completed. Alongside each TODO item there should also be a button that removes the item when clicked.

Initially `TodoList` has to present the user with a button labeled "Load". When the user hits the button, the script starts to download the data; the label of the button has to change to "Loading..." and the button must become disabled. Once the data has been loaded, hide the button altogether and display the TODO items instead.

Additionally, you should provide a capability of sorting the items either by title, user, or the item’s status (whether the item is completed or not).

## Workflow

- Fork the repository with task
- Clone forked repository 
    ```bash
    git clone git@github.com:<user_name>>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode 

- Run `npm run start` to start `http-server` on `http://localhost:3000`
    When you run server the command line window will no longer be available for 
    writing commands until you stop server (`ctrl + c`). All other commands you 
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- When you finished `Deploy on gh-pages`

## Deploy on gh-pages

- Build the project
  ```bash
  $ npm run build
  ```
- Commit and push all recent changes
  ```bash
  $ git add .
  $ git commit -m 'commit message'
  $ git push origin master
  ```
- Execute `npm run deploy`. This command will push the `/build` folder to branch
  `gh-pages` in your remote repository. 
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a 
  link to your index.html
- Commit and push all recent changes again.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo 
(`master`).
- Add a link at `PR` to Google Spreadsheets.

## Project structure

- `src/` - directory for css, js, image, fonts files
- `build/` - directory for built pages

You should be writing code in `src/` directory.

### Demo link

Add link here: `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)`
