import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { getPeople } from '../../helpers';
import { Link, useRouteMatch, useHistory, useLocation, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  },[])

  const match = useRouteMatch('/people/:peopleSlug?');
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const activeSlug = searchParams.get('peopleSlug');
  const sortBy = searchParams.get('sortBy');

  const handleSort = event => {
    searchParams.set('sortBy', event.target.innerText);
    history.push(`?${searchParams.toString()}`);

    const sortedPeople = [...people].sort((a, b) => {
      if (typeof a[sortBy] === 'number') {
        return a[sortBy] - b[sortBy];
      } else {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    });
    setPeople(sortedPeople);
  }

  const handleLink = (event, slug) => {
    event.preventDefault();
    searchParams.set('peopleSlug', slug)
    history.push(`?${searchParams.toString()}`);
  };

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applySearch = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push(`?${searchParams.toString()}`);
    }, 500),
    []
  );
  const handleSearch = (event) => {
    setQuery(event.target.value)
    applySearch(event.target.value);
  };

  const visiblePeople = appliedQuery !== 0
    ? people.filter( person => person.name.toLowerCase().includes(appliedQuery.toLowerCase()))
    : people;

  return (
    <>
      <input
        className="input is-large"
        type="text"
        placeholder="Find by name..."
        value={query}
        onChange={(event) => {handleSearch(event)}}
      />
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className={classNames('my-button', {'my-button--active': sortBy === 'name'})}
                onClick={handleSort}
              >
                name
              </button>
            </th>
            <th>
              <button
                type="button"
                className={classNames('my-button', {'my-button--active': sortBy === 'sex'})}
                onClick={handleSort}
              >
                sex
              </button>
            </th>
            <th>
              <button
                type="button"
                className={classNames('my-button', {'my-button--active': sortBy === 'born'})}
                onClick={handleSort}
              >
                born
              </button>
            </th>
            <th>
              <button
                type="button"
                className={classNames('my-button', {'my-button--active': sortBy === 'died'})}
                onClick={handleSort}
              >
                died
              </button>
            </th>
            <th>mother</th>
            <th>father</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <tr
              key={person.slug}
              className={activeSlug === person.slug && 'active-row'
          }
        >
              <td>
                <Link
                  className={person.sex === 'f'
                  ? 'female'
                  : 'male'
                  }
                  onClick={(event) => {handleLink(event, person.slug)}}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{visiblePeople.some(curPerson => curPerson.name === person.motherName)
                    ? <Link
                        className='female'
                        onClick={(event) => {
                          const mother = visiblePeople.find(curPerson => curPerson.name === person.motherName);
                          handleLink(event, mother.slug)
                        }}
                      >
                      {person.motherName}
                      </Link>
                    : person.motherName
                  }
              </td>
              <td>{visiblePeople.some(curPerson => curPerson.name === person.fatherName)
                    ? <Link
                        onClick={(event) => {
                          const father = visiblePeople.find(curPerson => curPerson.name === person.fatherName);
                          handleLink(event, father.slug)
                        }}

                        className='male'
                      >
                      {person.fatherName}
                      </Link>
                    : person.fatherName
                  }
              </td>
          </tr>
        ))}
        </tbody>
    </table>
    </>
  );
};
