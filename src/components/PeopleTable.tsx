import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SORT_FIELDS, SortField } from '../utils/preparePeople';

type Props = {
  people: Person[];
};

const COLUMN_TITLES: Record<SortField, string> = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

const renderParent = (name: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  return name || '-';
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  // 1st click - ascending, 2nd click - descending, 3rd click - no sorting
  const getSortParams = (field: SortField): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!isReversed) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_FIELDS.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {COLUMN_TITLES[field]}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && !isReversed,
                        'fa-sort-down': sort === field && isReversed,
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
        {people.map(person => (
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
            <td>{renderParent(person.motherName, person.mother)}</td>
            <td>{renderParent(person.fatherName, person.father)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
