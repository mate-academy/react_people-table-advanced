import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { ParentLink } from './ParentLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  filteredPeople: Person[];
  sort: string;
  order: 'asc' | 'desc' | '';
};

export function PeopleTable({ filteredPeople, sort, order }: PeopleTableProps) {
  const { slug } = useParams<{ slug: string }>();

  const getSortParams = (sortField: string) => {
    if (sort !== sortField) {
      return {
        sort: sortField,
        order: 'asc',
      };
    }

    if (order === 'asc') {
      return {
        sort: sortField,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

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
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'name' && order === 'asc',
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
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'sex' && order === 'asc',
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
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'born' && order === 'asc',
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
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'died' && order === 'asc',
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
        {filteredPeople.map(person => (
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
            <ParentLink parent={person.mother} parentName={person.motherName} />
            <ParentLink parent={person.father} parentName={person.fatherName} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
