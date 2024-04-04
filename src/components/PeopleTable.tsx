import { useParams, useLocation } from 'react-router-dom';

import classNames from 'classnames';

import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { peopleSlug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const getSortLinkProps = (sortKey: string | null) => {
    const isActiveSort = searchParams.get('sort') === sortKey;
    const order = isActiveSort ? searchParams.get('order') : null;

    const iconClassName = classNames('fas', {
      'fa-sort': !isActiveSort,
      'fa-sort-up': isActiveSort && order !== 'desc',
      'fa-sort-down': isActiveSort && order === 'desc',
    });

    return {
      children: (
        <span className="icon">
          <i className={iconClassName} />
        </span>
      ),
      params: {
        sort: isActiveSort && order === 'desc' ? null : sortKey,
        order: isActiveSort && order !== 'desc' ? 'desc' : null,
      },
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
              <SearchLink {...getSortLinkProps('name')} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink {...getSortLinkProps('sex')} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink {...getSortLinkProps('born')} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink {...getSortLinkProps('died')} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === peopleSlug,
            })}
          >
            <PersonLink person={person} />
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <PersonLink name={person.motherName} people={people} />
            <PersonLink name={person.fatherName} people={people} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
