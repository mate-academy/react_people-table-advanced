import { useContext } from 'react';
import { PeopleListContext } from '../store/PeopleContext';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchParamsContext } from '../store/searchHelper';
import { makeSort } from '../utils/filter';

export const PeopleTable = () => {
  const { peopleList } = useContext(PeopleListContext);
  const { slug } = useParams();
  const { searchParams, getSearchWith } = useContext(SearchParamsContext);
  const filters = ['name', 'sex', 'born', 'died'];

  const visibleList = makeSort(peopleList, searchParams);

  const getMother = (personsMother: string | null): Person | null => {
    if (!personsMother) {
      return null;
    } else {
      return (
        peopleList.find(person => person.name === personsMother) ||
        ({
          name: personsMother,
        } as Person)
      );
    }
  };

  const getFather = (personsFather: string | null): Person | null => {
    if (!personsFather) {
      return null;
    } else {
      return (
        peopleList.find(person => person.name === personsFather) ||
        ({
          name: personsFather,
        } as Person)
      );
    }
  };

  const getParams = (filter: string) => {
    const currentSort = searchParams.get("sort");
    const isDesc = searchParams.has("order");

    let params: { sort: string | null; order: string | null } = {
      sort: filter,
      order: null,
    };

    if (currentSort === filter) {
      if (!isDesc) {
        params = { sort: filter, order: "desc" };
      } else {
        params = { sort: null, order: null };
      }
    } else {
      params = { sort: filter, order: null };
    }

    return params;
  }

  const getSlug = (person: Person) =>
    `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`;

  return (
    <>
      {visibleList.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {filters.map(filter => (
                <th key={filter}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {filter[0].toUpperCase() + filter.slice(1)}
                    <Link
                      to={{
                        search: getSearchWith(getParams(filter), searchParams),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': searchParams.get('sort') !== filter,
                            'fa-sort-down': (searchParams.get('sort') === filter) && searchParams.has('order'),
                            'fa-sort-up':
                              !searchParams.has('order') &&
                              (searchParams.get('sort') === filter),
                          })}
                        />
                      </span>
                    </Link>
                  </span>
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visibleList.map(person => (
              <tr
                data-cy="person"
                key={`${person.name}-${person.born}`}
                className={classNames({
                  'has-background-warning': slug === getSlug(person),
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink person={getMother(person.motherName)} />
                </td>
                <td>
                  <PersonLink person={getFather(person.fatherName)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
