import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = (searchParams.get('sort') || '') as keyof Person;
  const order = searchParams.get('order') || '';
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = [...filteredPeople].filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = [...filteredPeople].filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length !== 0) {
    filteredPeople = [...filteredPeople].filter(person => {
      const bornCentury = Math.ceil(person.born / 100).toString();
      const diedCentury = Math.ceil(person.died / 100).toString();

      return centuries.includes(bornCentury) || centuries.includes(diedCentury);
    });
  }

  const pickOrderType = (sortType: string) => {
    if (sortType === sort) {
      if (order === 'desc') {
        return null;
      } else if (order === 'asc') {
        return 'desc';
      } else {
        return 'asc';
      }
    } else {
      return 'asc';
    }
  };

  const sortStatus = (sortType) => {
    if (!pickOrderType(sortType)) {
      return null;
    } else {
      return sortType;
    }
  }

  let sortedPeople: Person[] = filteredPeople;

  if (order === 'desc') {
    sortedPeople = [...filteredPeople].sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person2[sort].localeCompare(person1[sort]);
        default:
          return (person2[sort] as number) - (person1[sort] as number);
      }
    });
  } else if (order === 'asc') {
    sortedPeople = [...filteredPeople].sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        default:
          return (person1[sort] as number) - (person2[sort] as number);
      }
    });
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
              <SearchLink
                params={{ sort: sortStatus('name'), order: pickOrderType('name') }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name' || !order,
                      'fa-sort-up': sort === 'name' && order === 'asc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: sortStatus('sex'), order: pickOrderType('sex') }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex' || !order,
                      'fa-sort-up': sort === 'sex' && order === 'asc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{ sort: sortStatus('born'), order: pickOrderType('born') }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born' || !order,
                      'fa-sort-up': sort === 'born' && order === 'asc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{ sort: sortStatus('died'), order: pickOrderType('died') }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died' || !order,
                      'fa-sort-up': sort === 'died' && order === 'asc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <PersonLink person={person} />
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother && <PersonLink person={person.mother} />}

            {!person.mother && person.motherName && (
              <td>{person.motherName}</td>
            )}

            {!person.mother && !person.motherName && <td>-</td>}

            {person.father && <PersonLink person={person.father} />}

            {!person.father && person.fatherName && (
              <td>{person.fatherName}</td>
            )}

            {!person.father && !person.fatherName && <td>-</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
