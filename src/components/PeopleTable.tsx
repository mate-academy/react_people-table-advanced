import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Order } from '../types/Order';
import { Sort } from '../types/Sort';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  sort: Sort;
  order: Order;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { slug } = useParams();

  function getNextSortParams(currentValue: Sort) {
    if (currentValue !== sort) {
      return {
        sort: currentValue,
        order: null,
      };
    }

    if (currentValue === sort && order === null) {
      return {
        sort: currentValue,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  }

  function getSortIcon(currentValue: Sort) {
    if (currentValue !== sort) {
      return 'fas fa-sort';
    }

    if (currentValue === sort && order === null) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort-down';
  }

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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(
            currentPerson => currentPerson.name === person.motherName,
          );

          const father = people.find(
            currentPerson => currentPerson.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  href={`#/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName === null ? (
                  '-'
                ) : mother === undefined ? (
                  person.motherName
                ) : (
                  <a
                    href={`#/people/${mother.slug}`}
                    className={mother.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.motherName}
                  </a>
                )}
              </td>
              <td>
                {person.fatherName === null ? (
                  '-'
                ) : father === undefined ? (
                  person.fatherName
                ) : (
                  <a href={`#/people/${father?.slug}`}>{person.fatherName}</a>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
