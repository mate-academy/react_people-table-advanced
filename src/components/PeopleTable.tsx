import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonInfo } from './PersonInfo';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';
import { getParent } from '../utils/getParent';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [seatchParams] = useSearchParams();
  const sortField = seatchParams.get('sort') || '';
  const sortOrder = seatchParams.get('order') || '';

  const updateSortField = (newSortField: SortField) => {
    const newSearchParams = {
      sort: '',
      order: '',
    };

    if (newSortField !== sortField) {
      newSearchParams.sort = newSortField;
    }

    if (newSortField === sortField && sortOrder !== SortOrder.Desc) {
      newSearchParams.sort = sortField;
      newSearchParams.order = SortOrder.Desc;
    }

    return {
      sort: newSearchParams.sort || null,
      order: newSearchParams.order || null,
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
              <SearchLink params={updateSortField(SortField.Name)}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sortField !== SortField.Name,
                    'fa-sort-up':
                      sortField === SortField.Name
                      && sortOrder !== SortOrder.Desc,
                    'fa-sort-down':
                      sortField === SortField.Name
                      && sortOrder === SortOrder.Desc,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={updateSortField(SortField.Sex)}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sortField !== SortField.Sex,
                    'fa-sort-up': sortField === SortField.Sex
                      && sortOrder !== SortOrder.Desc,
                    'fa-sort-down':
                      sortField === SortField.Sex
                      && sortOrder === SortOrder.Desc,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={updateSortField(SortField.Born)}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sortField !== SortField.Born,
                    'fa-sort-up': sortField === SortField.Born
                      && sortOrder !== SortOrder.Desc,
                    'fa-sort-down':
                      sortField === SortField.Born
                      && sortOrder === SortOrder.Desc,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={updateSortField(SortField.Died)}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sortField !== SortField.Died,
                    'fa-sort-up': sortField === SortField.Died
                      && sortOrder !== SortOrder.Desc,
                    'fa-sort-down':
                      sortField === SortField.Died
                      && sortOrder === SortOrder.Desc,
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
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            mother={getParent(people, person.motherName)}
            father={getParent(people, person.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
