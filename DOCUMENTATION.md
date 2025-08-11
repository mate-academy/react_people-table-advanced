# React People Table (Advanced) Project Documentation

## 1. General Description

The project is a web application for displaying, filtering, and sorting data about people. Key features:
- Filtering by name, century, and gender
- Sorting by various fields
- Saving filter parameters in URL
- Highlighting selected elements
- Displaying relationships between people

## 2. Technical Stack

- **Frontend**: React + TypeScript
- **Styling**: Bulma CSS Framework
- **Routing**: React Router
- **Bundler**: Vite
- **Testing**: Cypress

## 3. Project Structure

```
src/
├── components/
│   ├── PeoplePage/
│   │   ├── PeopleFilters.tsx
│   │   ├── PeoplePage.tsx
│   │   ├── PeopleTable.tsx
│   │   └── PersonLink.tsx
│   ├── HomePage/
│   ├── NotFoundPage/
│   ├── Loader/
│   ├── Navbar.tsx
│   └── SearchLink.tsx
├── types/
│   ├── index.ts
│   └── Person.ts
├── utils/
│   └── searchHelper.ts
├── api.ts
├── App.tsx
└── index.tsx
```

## 4. Main Components

### 4.1. PeoplePage

Main component for the people table page. [src/components/PeoplePage/PeoplePage.tsx](src/components/PeoplePage/PeoplePage.tsx)

**Functionality:**
- Loading data from API
- Filtering and sorting data
- Managing loading state and errors

**Key Parts:**
```typescript
// Hook for working with URL parameters (lines 20-35)
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return { searchParams, updateParams, setSearchParams };
};

// Data filtering (lines 50-70)
const filteredPeople = people.filter(person => {
  // Name filtering
  const normalisedQuery = searchParams.get('query')?.trim().toLowerCase() || '';
  const matchesQuery = person.name.trim().toLowerCase().includes(normalisedQuery) ||
    person.motherName?.trim().toLowerCase().includes(normalisedQuery) ||
    person.fatherName?.trim().toLowerCase().includes(normalisedQuery);

  // Century filtering
  const centuries = searchParams.getAll('centuries').length === 0
    ? [16, 17, 18, 19, 20]
    : searchParams.getAll('centuries');
  const matchesCentury = centuries.find(century => {
    return Math.ceil(person.born / 100) === +century;
  });

  return matchesQuery && matchesCentury;
});
```

### 4.2. PeopleFilters

Component for data filtering. [src/components/PeoplePage/PeopleFilters.tsx](src/components/PeoplePage/PeopleFilters.tsx)

**Functionality:**
- Name filtering
- Century selection
- Gender filtering
- Resetting filters

**Key Parts:**
```typescript
// Name filter change handler (lines 15-20)
const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  updateParams('query', event.target.value || null);
};

// Century toggling (lines 30-40)
const toggleCentury = c => {
  const params = new URLSearchParams(searchParams);
  const newCenturies = centuries.includes(String(c))
    ? centuries.filter(century => century !== String(c))
    : [...centuries, String(c)];

  params.delete('centuries');
  newCenturies.forEach(century => params.append('centuries', century));
  setSearchParams(params);
};
```

### 4.3. PeopleTable

Component for displaying data table. [src/components/PeoplePage/PeopleTable.tsx](src/components/PeoplePage/PeopleTable.tsx)

**Functionality:**
- Displaying filtered and sorted data
- Highlighting selected person
- Displaying relationships between people

**Key Parts:**
```typescript
// Row highlighting (lines 45-50)
className={classNames({
  'has-background-warning': location.pathname === `/people/${person.slug}`,
  'has-background-grey-lighter': isHovered && isHoveredName === person.name,
})}
```

## 5. URL Parameters

The project uses the following URL parameters to maintain state:

- `query` - text for name search [src/components/PeoplePage/PeopleFilters.tsx:15](src/components/PeoplePage/PeopleFilters.tsx:15)
- `centuries` - selected centuries (multiple possible) [src/components/PeoplePage/PeopleFilters.tsx:30](src/components/PeoplePage/PeopleFilters.tsx:30)
- `sex` - gender filter [src/components/PeoplePage/PeopleFilters.tsx:45](src/components/PeoplePage/PeopleFilters.tsx:45)
- `sort` - sorting field [src/components/PeoplePage/PeopleTable.tsx:60](src/components/PeoplePage/PeopleTable.tsx:60)
- `order` - sorting direction (asc/desc) [src/components/PeoplePage/PeopleTable.tsx:65](src/components/PeoplePage/PeopleTable.tsx:65)

## 6. Filtering

### 6.1. Name Search
- Case-insensitive search [src/components/PeoplePage/PeoplePage.tsx:55](src/components/PeoplePage/PeoplePage.tsx:55)
- Searches in `name`, `motherName`, `fatherName` fields [src/components/PeoplePage/PeoplePage.tsx:55-60](src/components/PeoplePage/PeoplePage.tsx:55-60)
- `query` parameter in URL [src/components/PeoplePage/PeopleFilters.tsx:15](src/components/PeoplePage/PeopleFilters.tsx:15)

### 6.2. Century Filter
- Multiple centuries can be selected [src/components/PeoplePage/PeopleFilters.tsx:30-40](src/components/PeoplePage/PeopleFilters.tsx:30-40)
- Shows all if none selected [src/components/PeoplePage/PeoplePage.tsx:65](src/components/PeoplePage/PeoplePage.tsx:65)
- `centuries` parameter in URL [src/components/PeoplePage/PeopleFilters.tsx:30](src/components/PeoplePage/PeopleFilters.tsx:30)

### 6.3. Gender Filter
- Can select male or female [src/components/PeoplePage/PeopleFilters.tsx:45](src/components/PeoplePage/PeopleFilters.tsx:45)
- Can reset filter [src/components/PeoplePage/PeopleFilters.tsx:50](src/components/PeoplePage/PeopleFilters.tsx:50)
- `sex` parameter in URL [src/components/PeoplePage/PeopleFilters.tsx:45](src/components/PeoplePage/PeopleFilters.tsx:45)

## 7. Sorting

- Sorting by fields: `name`, `sex`, `born`, `died` [src/components/PeoplePage/PeopleTable.tsx:60](src/components/PeoplePage/PeopleTable.tsx:60)
- Three sorting states:
  1. Ascending (first click) [src/components/PeoplePage/PeopleTable.tsx:70](src/components/PeoplePage/PeopleTable.tsx:70)
  2. Descending (second click) [src/components/PeoplePage/PeopleTable.tsx:75](src/components/PeoplePage/PeopleTable.tsx:75)
  3. No sorting (third click) [src/components/PeoplePage/PeopleTable.tsx:80](src/components/PeoplePage/PeopleTable.tsx:80)
- `sort` and `order` parameters in URL [src/components/PeoplePage/PeopleTable.tsx:60-65](src/components/PeoplePage/PeopleTable.tsx:60-65)

## 8. Implementation Details

### 8.1. State Management
- Using React Hooks for state management [src/components/PeoplePage/PeoplePage.tsx:20](src/components/PeoplePage/PeoplePage.tsx:20)
- Saving state in URL parameters [src/components/PeoplePage/PeoplePage.tsx:25](src/components/PeoplePage/PeoplePage.tsx:25)
- Centralized parameter management via `useQueryParams` [src/components/PeoplePage/PeoplePage.tsx:20-35](src/components/PeoplePage/PeoplePage.tsx:20-35)

### 8.2. Error Handling
- Displaying loading state [src/components/Loader/Loader.tsx:10](src/components/Loader/Loader.tsx:10)
- Handling data loading errors [src/components/PeoplePage/PeoplePage.tsx:40](src/components/PeoplePage/PeoplePage.tsx:40)
- Displaying error messages [src/components/PeoplePage/PeoplePage.tsx:45](src/components/PeoplePage/PeoplePage.tsx:45)

### 8.3. Optimization
- Memoization of calculations [src/components/PeoplePage/PeoplePage.tsx:50](src/components/PeoplePage/PeoplePage.tsx:50)
- Rendering optimization [src/components/PeoplePage/PeopleTable.tsx:45](src/components/PeoplePage/PeopleTable.tsx:45)
- Efficient URL parameter handling [src/components/PeoplePage/PeoplePage.tsx:20-35](src/components/PeoplePage/PeoplePage.tsx:20-35)

## 9. Testing

The project includes Cypress tests for checking:
- Navigation correctness [cypress/e2e/navigation.cy.ts](cypress/e2e/navigation.cy.ts)
- Filter functionality [cypress/e2e/filters.cy.ts](cypress/e2e/filters.cy.ts)
- Data sorting [cypress/e2e/sorting.cy.ts](cypress/e2e/sorting.cy.ts)
- Error handling [cypress/e2e/errors.cy.ts](cypress/e2e/errors.cy.ts)
- Data display [cypress/e2e/display.cy.ts](cypress/e2e/display.cy.ts)

## 10. Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

4. Build for production:
```bash
npm run build
```

## 11. Environment Requirements

- Node.js 14+
- npm 6+
- Browser with ES6+ support

## 12. License

MIT License
