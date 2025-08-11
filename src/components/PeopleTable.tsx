import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { UseHooks } from '../Hooks';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Person } from '../types';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people, setVisiblePeople, visiblePeople } = UseHooks();
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  useEffect(() => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const sexParam = searchParams.get('sex');
    const queryParam = searchParams.get('query');
    const centsParams = searchParams.getAll('centuries');

    let sortedPeople = [...people];

    // Сортування
    if (currentSort) {
      const key = currentSort as keyof Person;

      sortedPeople.sort((person1, person2) => {
        const val1 = person1[key];
        const val2 = person2[key];

        if (key === 'born' || key === 'died') {
          return ((val1 ?? 0) as number) - ((val2 ?? 0) as number);
        }

        return String(val1).localeCompare(String(val2));
      });

      if (currentOrder === 'desc') {
        sortedPeople.reverse();
      }
    }

    // Фільтрація
    if (sexParam) {
      sortedPeople = sortedPeople.filter(person => person.sex === sexParam);
    }

    if (queryParam) {
      const lowerQuery = queryParam.toLowerCase(); // Робимо пошук незалежним від регістру

      sortedPeople = people.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          (person.motherName?.toLowerCase().includes(lowerQuery) ?? false) ||
          (person.fatherName?.toLowerCase().includes(lowerQuery) ?? false),
      );
    }

    if (centsParams.length > 0) {
      sortedPeople = sortedPeople.filter(person =>
        centsParams.some(cent => Number(cent) === Math.ceil(person.born / 100)),
      );
    }

    setVisiblePeople(sortedPeople);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const newSortLink = (sortBy: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== sortBy) {
      newParams.delete('sort');
      newParams.set('sort', sortBy);
      newParams.delete('order');
    } else if (!currentOrder) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    return `?${newParams.toString()}`;
  };

  const arrowUpOrDown = (sortBy: string, direction: string) => {
    const params = new URLSearchParams(search);
    const isAscending = params.get('sort') === sortBy && !params.get('order');
    const isDescending =
      params.get('sort') === sortBy && params.get('order') === 'desc';

    return direction === 'up' ? isAscending : isDescending;
  };

  return visiblePeople.length > 0 ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={newSortLink('name')} className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort-up': arrowUpOrDown('name', 'up'),
                    'fa-sort-down': arrowUpOrDown('name', 'down'),
                    'fa-sort': !search.includes('sort=name'),
                  })}
                />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={newSortLink('sex')} className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort-up': arrowUpOrDown('sex', 'up'),
                    'fa-sort-down': arrowUpOrDown('sex', 'down'),
                    'fa-sort': !search.includes('sort=sex'),
                  })}
                />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={newSortLink('born')} className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort-up': arrowUpOrDown('born', 'up'),
                    'fa-sort-down': arrowUpOrDown('born', 'down'),
                    'fa-sort': !search.includes('sort=born'),
                  })}
                />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={newSortLink('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': arrowUpOrDown('died', 'up'),
                      'fa-sort-down': arrowUpOrDown('died', 'down'),
                      'fa-sort': !search.includes('sort=died'),
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person, index) => {
          const mother = people.find(
            curPerson => curPerson.name === person.motherName,
          );
          const father = people.find(
            curPerson => curPerson.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={index}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}${search}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}${search}`}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={`/people/${father.slug}${search}`}
                    className={classNames({
                      'has-text-danger': father.sex === 'f',
                    })}
                  >
                    {father.name}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
