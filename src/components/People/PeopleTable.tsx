/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const columnNames = ['name', 'sex', 'born', 'died'];

  const visiblePeople = people.map(person => {
    return {
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    };
  });

  if (sort) {
    visiblePeople.sort((a, b) => {
      const fieldA = a[sort as keyof Person];
      const fieldB = b[sort as keyof Person];
      let result = 0;

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        result = fieldA.localeCompare(fieldB);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        result = fieldA - fieldB;
      }

      return order === 'desc' ? result * -1 : result;
    });
  }

  const getParams = (name: string) => {
    const isSameColumn = name === sort;
    const shouldClear = isSameColumn && order === 'desc';

    return {
      sort: shouldClear ? null : name,
      order: isSameColumn && !shouldClear ? 'desc' : null,
    };
  };

  const getSortClassNames = (name: string) => {
    return {
      'fa-sort': sort !== name,
      'fa-sort-up': sort === name && !order,
      'fa-sort-down': sort === name && order,
    };
  };

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <>
      {people.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columnNames.map(name => (
                <th key={name}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {capitalize(name)}
                    <SearchLink params={getParams(name)}>
                      <span className="icon">
                        <i
                          className={classNames('fas', getSortClassNames(name))}
                        />
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
            {visiblePeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName ?? '-'
                  )}
                </td>

                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName ?? '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
