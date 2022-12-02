# React People Table - Filterging and Sorting

[DEMOLINK](https://thevovchik.github.io/react_people-table-advanced/)

1. All the filters and sort params saved as URL Search Params, so you could share the link to show exactly what you see.
1. Search params are kept when navigating within the `People` page (when selecting a person or clicking the `People` link).
1. The sidebar with the filters appear only when people are loaded.
1. `NameFilter` update the `query` search param with the text from the input.
    - showed only people with the `name`, `motherName` or `fatherName` that match the query case insensitive;
    - if the input is empty there no `query` in the search params.
1. `CenturyFilter` allow to choose several centuries or all of them.
1. Implemented sorting by `name`, `sex`, `born` and `died` by clicking on arrows in a `th`;
    - the first click on a column sorts people by the selected field ascending (`a -> z` or `0 -> 9`);
    - the second click (when people are already sorted ascending by this field) reverses the order of sorting;
    - the third click (when people are already sorted in reversed order by this field) disables sorting;
    - was added `order=desc` (short for `descending`) if sorted in reversed order;
    - if sorting is disabled there no `sort` and `order` search params;
