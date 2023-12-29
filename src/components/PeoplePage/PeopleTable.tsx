import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PeopleItem } from './PeopleItem';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const paramOnDesc = (isDesc: string | null, sortParamLC: string) => {
    return !isDesc ? {
      sort: sortParamLC,
      order: 'desc',
    } : {
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
          {['Name', 'Sex', 'Born', 'Died'].map(sortParam => {
            const sortParamLC = sortParam.toLowerCase();
            const isSelected = searchParams.get('sort') === sortParamLC;
            const isDesc = searchParams.get('order');

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortParam}
                  <SearchLink
                    aria-label={`SortBy${sortParam}`}
                    params={!isSelected ? {
                      sort: sortParamLC,
                      order: null,
                    } : (
                      paramOnDesc(isDesc, sortParamLC)
                    )}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': !isSelected,
                            'fa-sort-up': isSelected && !isDesc,
                            'fa-sort-down': isSelected && isDesc,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleItem person={person} />
        ))}
      </tbody>
    </table>
  );
};
