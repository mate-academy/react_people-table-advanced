import cn from 'classnames';

import { Person } from './Person/Person';
import { FieldTypes } from '../types/FieldTypes';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useFilter } from '../utils/useFilter';
import { SearchLink } from './SearchLink';
import { SORT_TITLE } from '../utils/Constants';

export const PeopleTable: React.FC = () => {
  const { dataFromServer } = useLocalStorage();
  const { sort, order, getSortParams } = useFilter();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow
                  is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_TITLE.map(field => (
            <th key={field.value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.name}
                <SearchLink params={getSortParams(field.value)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort-down':
                          order === 'desc' && sort === field.value,
                        'fa-sort-up': !order && sort === field.value,
                        'fa-sort': !sort || sort !== field.value,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>{FieldTypes.MOTHER}</th>
          <th>{FieldTypes.FATHER}</th>
        </tr>
      </thead>

      <tbody>
        {dataFromServer.map(person => (
          <Person person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
