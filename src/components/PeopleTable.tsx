import classNames from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

const tableHead = ['name', 'sex', 'born', 'died', 'mother', 'father'];
const tableHeadForSort = ['name', 'sex', 'born', 'died'];

interface Props {
  people: Person[],
  slug: string,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = (searchParams.get('query') || '').toLowerCase();

  const visiblePeople = useMemo(() => [...people].sort((a, b) => {
    if (sortBy) {
      const [personA, personB] = order === 'asc'
        ? [a, b]
        : [b, a];

      if (sortBy === 'name' || sortBy === 'sex') {
        return personA[sortBy].localeCompare(personB[sortBy]);
      }

      if (sortBy === 'born' || sortBy === 'died') {
        return personA[sortBy] - personB[sortBy];
      }
    }

    return 0;
  }).filter(person => ((person.name.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query))
        && (!sex || person.sex === sex)
        && (!centuries.length
            || centuries.includes(String(Math.ceil(person.born / 100)))))),
  [people, sortBy, order, sex, centuries, query]);

  if (!visiblePeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHead.map(thName => (
            tableHeadForSort.includes(thName) ? (
              <th key={thName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {thName[0].toUpperCase() + thName.slice(1)}
                  <SearchLink
                    params={{
                      sortBy: thName === sortBy && order === 'desc'
                        ? null
                        : thName,
                      order: thName === sortBy
                        ? (thName === sortBy && order === 'desc'
                          ? null
                          : thName) && 'desc'
                        : 'asc',
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas',
                          {
                            'fa-sort': thName !== sortBy,
                            'fa-sort-down': thName === sortBy
                               && order === 'desc',
                            'fa-sort-up': thName === sortBy
                               && order === 'asc',
                          })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={thName}>{thName[0].toUpperCase() + thName.slice(1)}</th>
            )
          ))}
        </tr>
      </thead>
      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            className={classNames(
              { 'has-background-warning': slug === person.slug },
            )}
            key={person.slug}
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
              ) : person.motherName || '-'}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
