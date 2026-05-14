import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { slug } = useParams();
  const sortedPeople = [...people];

  const tableSort = (columnName: string) => {
    if (sort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (sort !== null && order === null) {
      return { sort: columnName, order: 'desc' };
    }

    if (sort !== null && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  if (sort !== null) {
    switch (sort) {
      case 'name':
        if (order === 'desc') {
          sortedPeople.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
        }

        break;
      case 'sex':
        if (order === 'desc') {
          sortedPeople.sort((a, b) => b.sex.localeCompare(a.sex));
        } else {
          sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        }

        break;
      case 'born':
        if (order === 'desc') {
          sortedPeople.sort((a, b) => b.born - a.born);
        } else {
          sortedPeople.sort((a, b) => a.born - b.born);
        }

        break;
      case 'died':
        if (order === 'desc') {
          sortedPeople.sort((a, b) => b.died - a.died);
        } else {
          sortedPeople.sort((a, b) => a.died - b.died);
        }

        break;
    }
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
              <SearchLink params={tableSort('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'name' && order === null,
                      'fa-sort-down': sort === 'name' && order === 'desc',
                      'fa-sort': sort !== 'name',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={tableSort('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'sex' && order === null,
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                      'fa-sort': sort !== 'sex',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={tableSort('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'born' && order === null,
                      'fa-sort-down': sort === 'born' && order === 'desc',
                      'fa-sort': sort !== 'born',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={tableSort('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'died' && order === null,
                      'fa-sort-down': sort === 'died' && order === 'desc',
                      'fa-sort': sort !== 'died',
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
        {sortedPeople.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
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
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
