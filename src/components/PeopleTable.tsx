/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function getSortParams(field: string) {
    if (sort !== field) {
      return { sort: field, order: null };
    } else if (order === null) {
      return { sort: field, order: 'desc' };
    } else {
      return { sort: null, order: null };
    }
  }

  function getSortIcon(field: string) {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (sort === field && order === null) {
      return 'fa-sort-up';
    }

    if (sort === field && order === 'desc') {
      return 'fa-sort-down';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('died'))} />
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
          const motherObj = people.find(p => p.name === person.motherName);
          const fatherObj = people.find(p => p.name === person.fatherName);

          const mother = person.motherName
            ? { name: person.motherName, sex: 'f', slug: motherObj?.slug }
            : null;
          const father = person.fatherName
            ? { name: person.fatherName, sex: 'm', slug: fatherObj?.slug }
            : null;

          return (
            <>
              <tr
                data-cy="person"
                key={person.slug}
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
                  <PersonLink person={mother as Person} />
                </td>
                <td>
                  <PersonLink person={father as Person} />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
