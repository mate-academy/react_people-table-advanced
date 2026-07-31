This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*, README.md
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/
  components/
    Loader/
      index.tsx
      Loader.scss
      Loader.tsx
    peopleFilters/
      CenturiesFilter.tsx
      PeopleFilters.tsx
      SearchFilter.tsx
      SexFilter.tsx
    HomePage.tsx
    Navbar.tsx
    NotFoundPage.tsx
    PeoplePage.tsx
    PeopleTable.tsx
    PersonLink.tsx
    SearchLink.tsx
  types/
    index.ts
    Person.ts
    SortField.ts
  utils/
    filterPeople.ts
    searchHelper.ts
  api.ts
  App.scss
  App.tsx
  index.tsx
  vite-env.d.ts
README.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/Loader/index.tsx">
export * from './Loader';
</file>

<file path="src/components/Loader/Loader.scss">
.Loader {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  &__content {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    margin: 1em auto;
    border: 0.3em solid #ddd;
    border-left-color: #000;
    animation: load8 1.2s infinite linear;
  }
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</file>

<file path="src/components/Loader/Loader.tsx">
import './Loader.scss';

export const Loader = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);
</file>

<file path="src/components/peopleFilters/CenturiesFilter.tsx">
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const isActiveClass = selectedCenturies.length !== 0;

  const CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isSelected = selectedCenturies.includes(century);

              const newCenturies = isSelected
                ? selectedCenturies.filter(c => c !== century)
                : [...selectedCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': isSelected,
                  })}
                  params={{
                    centuries: newCenturies.length ? newCenturies : null,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': isActiveClass,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
    </>
  );
};
</file>

<file path="src/components/peopleFilters/PeopleFilters.tsx">
import { Link } from 'react-router-dom';
import { CenturiesFilter } from './CenturiesFilter';
import { SexFilter } from './SexFilter';
import { SearchFilter } from './SearchFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <SearchFilter />
      <CenturiesFilter />

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
</file>

<file path="src/components/peopleFilters/SearchFilter.tsx">
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('query') || '';

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    const newSearch = getSearchWith(searchParams, { query: newText || null });

    setSearchParams(newSearch);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={q}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleOnChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
</file>

<file path="src/components/peopleFilters/SexFilter.tsx">
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={cn({ 'is-active': !selectedSex })}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': selectedSex === 'm' })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': selectedSex === 'f' })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
</file>

<file path="src/components/HomePage.tsx">
export const HomePage = () => {
  return <h1 className="title">Home Page</h1>;
};
</file>

<file path="src/components/NotFoundPage.tsx">
export const NotFoundPage = () => {
  return <h1 className="title">Page not found</h1>;
};
</file>

<file path="src/components/PersonLink.tsx">
import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person?.sex === 'f';
  const linkClass = isFemale ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={linkClass}>
      {person.name}
    </Link>
  );
};
</file>

<file path="src/types/index.ts">
export * from './Person';
</file>

<file path="src/types/SortField.ts">
export type SortField = 'name' | 'sex' | 'born' | 'died';
</file>

<file path="src/utils/filterPeople.ts">
import { Person } from '../types';
import { SortField } from '../types/SortField';

export function filterPeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  let filteredPeople = people;

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizeQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const personName = person.name.toLowerCase().includes(normalizeQuery);
      const motherName = person.motherName
        ?.toLowerCase()
        .includes(normalizeQuery);
      const fatherName = person.fatherName
        ?.toLowerCase()
        .includes(normalizeQuery);

      return personName || motherName || fatherName;
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base',
          });
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex, undefined, {
            sensitivity: 'base',
          });
          break;
        case 'born':
          result = a.born - b.born;
          break;
        case 'died':
          result = a.died - b.died;
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  return filteredPeople;
}
</file>

<file path="src/vite-env.d.ts">
/// <reference types="vite/client" />
</file>

<file path="src/components/SearchLink.tsx">
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      // to={{ search: getSearchWith(searchParams, { query: 'sdf' }) }}
      // to={{ search: getSearchWith(searchParams, { query: null }) }}
      // to={{ search: getSearchWith(searchParams, { centuries: ['16', '18'] }) }}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props} // copy all the other props
    >
      {children}
    </Link>
  );
};
</file>

<file path="src/types/Person.ts">
export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
</file>

<file path="src/utils/searchHelper.ts">
export type SearchParams = {
  [key: string]: string | string[] | null;
};

/**
 * This function prepares a correct search string
 * from a given currentParams and paramsToUpdate.
 */
export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams, // it's our custom type
): string {
  // copy currentParams by creating new object from a string
  const newParams = new URLSearchParams(currentParams.toString());

  // Here is the example of paramsToUpdate
  // {
  //   sex: 'm',                ['sex', 'm']
  //   order: null,             ['order', null]
  //   centuries: ['16', '19'], ['centuries', ['16', '19']]
  // }
  //
  // - params with the `null` value are deleted;
  // - string value is set to given param key;
  // - array of strings adds several params with the same key;

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      // we delete the key to remove old values
      newParams.delete(key);

      value.forEach(part => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  // we return a string to use it inside links
  return newParams.toString();
}
</file>

<file path="src/components/Navbar.tsx">
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Options {
  isActive: boolean;
}

export const Navbar = () => {
  const isActiveClass = ({ isActive }: Options) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isActiveClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
</file>

<file path="src/components/PeoplePage.tsx">
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PeopleFilters } from './peopleFilters/PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPeople();

        setPeople(data);
        setIsError(null);
      } catch {
        setIsError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const visiblePeople = useMemo(
    function () {
      return filterPeople(people, searchParams);
    },
    [people, searchParams],
  );

  const renderContent = () => {
    const isNotPeople = people.length === 0;
    const isNotVisiblePeople = visiblePeople.length === 0;

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {isError}
        </p>
      );
    }

    if (isNotPeople) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (isNotVisiblePeople) {
      return <p>There are no people matching the current search criteria</p>;
    }

    return <PeopleTable people={visiblePeople} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? <Loader /> : renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
</file>

<file path="src/api.ts">
import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
</file>

<file path="src/App.scss">
iframe {
  display: none;
}
</file>

<file path="src/components/PeopleTable.tsx">
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { SortField } from '../types/SortField';

import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const selectedSort = searchParams.get('sort');
  const selectedOrder = searchParams.get('order');

  const THEAD_NAMES: SortField[] = ['name', 'sex', 'born', 'died'];
  const FIELD_NAMES: Record<SortField, string> = {
    name: 'Name',
    sex: 'Sex',
    born: 'Born',
    died: 'Died',
  };

  const findPersonByName = (name: string): Person | null => {
    if (!name) {
      return null;
    }

    const foundPerson = people.find(person => person.name === name);

    return foundPerson || null;
  };

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parentPerson = findPersonByName(parentName);

    if (parentPerson) {
      return <PersonLink person={parentPerson} />;
    }

    return parentName;
  };

  const handleTheadFilters = (
    field: SortField,
    currSort: string | null,
    currOrder: string | null,
  ) => {
    if (field !== currSort) {
      return { sort: field, order: null };
    }

    if (currOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: SortField) => {
    if (selectedSort === field && !selectedOrder) {
      return 'fas fa-sort-up';
    }

    if (selectedSort === field && selectedOrder) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {THEAD_NAMES.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {FIELD_NAMES[title]}
                <SearchLink
                  params={handleTheadFilters(
                    title,
                    selectedSort,
                    selectedOrder,
                  )}
                >
                  <span className="icon">
                    <i className={getSortIconClass(title)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.motherName)}</td>
              <td>{renderParentCell(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
</file>

<file path="src/index.tsx">
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <App />
  </Router>,
);
</file>

<file path="src/App.tsx">
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';

import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
</file>

<file path="README.md">
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
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://Grigoriy01.github.io/react_people-table-advanced/) and add it to the PR description.
</file>

</files>
