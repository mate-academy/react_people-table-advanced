import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortField } from '../utils/options';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getIconClassName = (field: SortField) => {
    return classNames('fas', {
      'fa-sort': sort !== field,
      'fa-sort-up': !order && sort === field,
      'fa-sort-down': order && sort === field,
    });
  };

  const handleSort = (field: SortField) => {
    if (sort === field && !order) {
      return { sort: field, order: 'desc' };
    }

    if (sort === field && order) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortField).map(([key, field]) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={handleSort(field)}
                >
                  <span className="icon">
                    <i className={`fas ${getIconClassName(field)}`} />
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
        {people.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <PersonLink person={person} />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother
              ? <PersonLink person={person.mother} />
              : (<td>{person.motherName || '-'}</td>)}

            {person.father
              ? <PersonLink person={person.father} />
              : (<td>{person.fatherName || '-'}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
