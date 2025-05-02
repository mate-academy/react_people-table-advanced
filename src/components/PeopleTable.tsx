import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type PeopleTableProps = {
  people: Person[];
};

enum Sorters {
  name = 'Name',
  sex = 'Sex',
  born = 'Born',
  died = 'Died',
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slugs } = useParams();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const normalizedQuery = query?.toLowerCase();

      filtered = filtered.filter(
        ({ name, motherName, fatherName }) =>
          name.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (gender) {
      filtered = filtered.filter(person => person.sex === gender);
    }

    if (centuries.length > 0 && centuries) {
      filtered = filtered.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(`${personCentury}`);
      });
    }

    return filtered;
  }, [query, people, gender, centuries]);

  const sortedPeople = useMemo(() => {
    const sorted = [...filteredPeople].sort(
      (personA: Person, personB: Person) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return personA[sort].localeCompare(personB[sort]);
          case 'born':
          case 'died':
            return personA[sort] - personB[sort];
          default:
            return 0;
        }
      },
    );

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sort, order]);

  const toggleOrder = (sortName: string) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (order === null) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: sortName, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sorters).map(([key, value]: [string, string]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value}
                <SearchLink params={toggleOrder(key)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== key,
                        'fa-sort-up': sort === key && !order,
                        'fa-sort-down': sort === key && order === 'desc',
                      })}
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
        {sortedPeople.map(person => {
          const { sex, born, died, fatherName, motherName, slug } = person;
          const mother = people.find(p => p.name === motherName);
          const father = people.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slugs?.includes(slug) && slugs,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {!motherName ? (
                <td>-</td>
              ) : (
                <td>{mother ? <PersonLink person={mother} /> : motherName}</td>
              )}
              {!fatherName ? (
                <td>-</td>
              ) : (
                <td>{father ? <PersonLink person={father} /> : fatherName}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
