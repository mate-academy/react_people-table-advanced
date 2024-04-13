import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { SortField } from '../../types/SortField';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  people: Person[];
  resultPeopleArray: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, resultPeopleArray }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || SortField.Default;
  const order = searchParams.get('order') || '';

  const copy = [...resultPeopleArray];

  const [sorted, setSorted] = useState(copy);

  const sortPeople = useCallback(
    (
      peopleParam: Person[],
      sortParam: SortField | string,
      orderParam: string,
    ): Person[] => {
      const copyPeople = [...peopleParam];

      if (!sortParam) {
        return resultPeopleArray;
      }

      return copyPeople.sort((person1, person2) => {
        switch (sortParam) {
          case SortField.Name:
            if (orderParam) {
              return person2.name.localeCompare(person1.name);
            }

            return person1.name.localeCompare(person2.name);

          case SortField.Sex:
            if (orderParam) {
              return person2.sex.localeCompare(person1.sex);
            }

            return person1.sex.localeCompare(person2.sex);

          case SortField.Born:
            if (orderParam) {
              return person2.born - person1.born;
            }

            return person1.born - person2.born;

          case SortField.Died:
            if (orderParam) {
              return person2.died - person1.died;
            }

            return person1.died - person2.died;

          default:
            return 0;
        }
      });
    },
    [resultPeopleArray],
  );

  const handleSort = (currentSortField: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== currentSortField) {
      params.set('sort', currentSortField);
      params.delete('order');
      setSearchParams(params);
      const currentSortedPeople = sortPeople(resultPeopleArray, sort, order);

      setSorted(currentSortedPeople);

      return;
    }

    if (sort === currentSortField && !params.get('order')) {
      params.set('order', 'desc');
      setSearchParams(params);
      const currentSortedPeople = sortPeople(resultPeopleArray, sort, order);

      setSorted(currentSortedPeople);

      return;
    }

    if (sort === currentSortField && params.get('order')) {
      params.delete('sort');
      params.delete('order');
      setSearchParams(params);
      const currentSortedPeople = sortPeople(resultPeopleArray, sort, order);

      setSorted(currentSortedPeople);

      return;
    }
  };

  useEffect(() => {
    const currentSortedPeople = sortPeople(resultPeopleArray, sort, order);

    setSorted(currentSortedPeople);
  }, [sortPeople, resultPeopleArray, sort, order, sorted]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a>
                <span
                  className="icon"
                  onClick={() => handleSort(SortField.Name)}
                >
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== SortField.Name,
                      'fa-sort-up': sort === SortField.Name && !order,
                      'fa-sort-down': sort === SortField.Name && order !== '',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a>
                <span
                  className="icon"
                  onClick={() => handleSort(SortField.Sex)}
                >
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== SortField.Sex,
                      'fa-sort-up': sort === SortField.Sex && !order,
                      'fa-sort-down': sort === SortField.Sex && order !== '',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a>
                <span
                  className="icon"
                  onClick={() => handleSort(SortField.Born)}
                >
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== SortField.Born,
                      'fa-sort-up': sort === SortField.Born && !order,
                      'fa-sort-down': sort === SortField.Born && order !== '',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a>
                <span
                  className="icon"
                  onClick={() => handleSort(SortField.Died)}
                >
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== SortField.Died,
                      'fa-sort-up': sort === SortField.Died && !order,
                      'fa-sort-down': sort === SortField.Died && order !== '',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sorted.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {people.find(human => human.name === person.motherName) ? (
              <td>
                <Link
                  to={`/people/${people.find(human => human.name === person.motherName)?.slug}?${searchParams}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              </td>
            ) : (
              <td>{person.motherName ? person.motherName : '-'}</td>
            )}

            {people.find(human => human.name === person.fatherName) ? (
              <td>
                <Link
                  to={`/people/${people.find(human => human.name === person.fatherName)?.slug}?${searchParams}`}
                >
                  {person.fatherName}
                </Link>
              </td>
            ) : (
              <td>{person.fatherName ? person.fatherName : '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
