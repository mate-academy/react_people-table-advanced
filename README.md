# React People Table (Advanced) - Filterging and Sorting

> Here is [the working example](https://mate-academy.github.io/react_people-table-advanced/)

> Sorting and filtering tests are not implemented yet

Using code from the [React People Table](https://github.com/mate-academy/react_people-table-basics#react-people-table)
implement the ability to filter and sort people in the table.

1. All the filters and sort params should be saved as URL Search Params, so you could share the link to show exactly what you see.
1. Keep search params when navigating within the `People` page (when selecting a person or clicking the `People` link).
1. The sidebar with the filters should appear only when people are loaded.
1. `NameFilter` should update the `query` search param with the text from the input.
    - show only people with the `name`, `motherName` or `fatherName` that match the query case insensitive;
    - if the input is empty there should not be `query` in the search params.
1. `CenturyFilter` should allow to choose several centuries or all of them.
    - add `centuries` search params using `append` method  `getAll` method;
1. Implement sorting by `name`, `sex`, `born` and `died` by clicking on arrows in a `th`;
    - the first click on a column sorts people by the selected field ascending (`a -> z` or `0 -> 9`);
    - the second click (when people are already sorted ascending by this field) reverses the order of sorting;
    - the third click (when people are already sorted in reversed order by this field) disables sorting;
    - use `sort` search param to save sort field;
    - add `order=desc` (short for `descending`) if sorted in reversed order;
    - if sorting is disabled there should not be `sort` and `order` search params;

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_people-table-advanced/) and add it to the PR description.
