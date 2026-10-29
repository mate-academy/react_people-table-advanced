# People Table

A React and TypeScript app that shows a table of people, with filtering and sorting saved in the URL.

## Live Preview

[slysahex.github.io/react_people-table-advanced](https://slysahex.github.io/react_people-table-advanced/)

## Technologies Used

- React 18 (hooks)
- TypeScript
- React Router 6 (URL search params)
- Bulma, SCSS
- classnames

## Features

- Load people from an API, with a loader and error states
- Search by name, mother's name or father's name (case-insensitive)
- Filter by sex and by one or several centuries
- Sort by name, sex, birth year or death year (ascending, descending, off)
- All filters and sorting are stored in URL search params, so you can share a link to exactly what you see
- Click a parent's name to jump to that person in the table

## Getting Started

```bash
git clone https://github.com/slysahex/react_people-table-advanced.git
cd react_people-table-advanced
npm install
npm start
```
