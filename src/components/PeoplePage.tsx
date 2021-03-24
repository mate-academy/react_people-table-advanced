import React, { useCallback, useState, MouseEvent } from 'react';
import { useHistory, useLocation } from 'react-router';
import debounce from 'lodash/debounce';
import { PeopleTable } from './PeopleTable';
import { NewPerson } from './NewPerson';

export const PeoplePage = () => {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({
        search: searchParams.toString(),
      });
    }, 1000),
    [],
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  const handleSortChange = (event: MouseEvent) => {
    const { textContent } = event.target as HTMLElement;

    if (textContent !== null) {
      switch (textContent) {
        case 'Mother':
        case 'Father':
          searchParams.delete('sortBy');
          searchParams.delete('sortOrder');
          break;
        default:
          searchParams.set('sortBy', textContent.toLocaleLowerCase());
          searchParams.set('sortOrder', 'asc');

          if (textContent.toLocaleLowerCase() === sortBy && sortOrder === 'asc') {
            searchParams.set('sortOrder', 'desc');
          } else {
            searchParams.set('sortOrder', 'asc');
          }

          break;
      }
    }

    // if (textContent === 'Mother' || textContent === 'Father') {
    //   searchParams.delete('sortBy');
    //   searchParams.delete('sortOrder');
    // } else if (textContent !== null) {
    //   searchParams.set('sortBy', textContent.toLowerCase());
    //   searchParams.set('sortOrder', 'asc');

    //   if (textContent.toLowerCase() === sortBy && sortOrder === 'asc') {
    //     searchParams.set('sortOrder', 'desc');
    //   } else {
    //     searchParams.set('sortOrder', 'asc');
    //   }
    // }

    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <h2>People page</h2>
      <div className="table_settings">
        <input
          type="text"
          className="input is-rounded"
          placeholder="Search..."
          value={query}
          onChange={({ target }) => handleQueryChange(target.value)}
        />
        <NewPerson />
      </div>
      <PeopleTable
        query={appliedQuery}
        handleSortChange={handleSortChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </>
  );
};
