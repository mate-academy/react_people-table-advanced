/* eslint-disable jsx-a11y/control-has-associated-label */
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (column: string) => {
    const isActive = sort === column;
    const isDesc = isActive && order === 'desc';

    if (!isActive) {
      return { sort: column, order: null };
    }

    if (!isDesc) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (column: string) =>
    sort === column
      ? `fas fa-sort-${order === 'desc' ? 'down' : 'up'}`
      : 'fas fa-sort';

  const comparePeople = (person1: Person, person2: Person) => {
    let result = 0;

    switch (sort) {
      case 'name':
        result = person1.name.localeCompare(person2.name);
        break;

      case 'sex':
        result = person1.sex.localeCompare(person2.sex);
        break;

      case 'born':
        result = person1.born - person2.born;
        break;

      case 'died':
        result = person1.died - person2.died;
        break;

      default:
        return 0;
    }

    return order === 'desc' ? -result : result;
  };

  const sortedPeople = [...people].sort(comparePeople);

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getIconClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getIconClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getIconClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getIconClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(
            personItem => personItem.name === person.motherName,
          );

          const father = people.find(
            personItem => personItem.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
