import cn from 'classnames';

import { Person } from './Person/Person';
import { FieldTypes } from '../types/FieldTypes';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useFilter } from '../utils/useFilter';
import { SearchLink } from './SearchLink';

const fieldsWithSortOption = Object.values(FieldTypes).slice(
  0,
  Object.values(FieldTypes).length - 2,
);

interface Props {}

export const PeopleTable: React.FC<Props> = () => {
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
          {fieldsWithSortOption.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <SearchLink params={getSortParams(field.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={cn('fas fa-sort', {
                        'fas fa-down': order === 'desc',
                        'fa-sort-up': sort === field.toLowerCase(),
                        'fas fa-sort': !sort,
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
