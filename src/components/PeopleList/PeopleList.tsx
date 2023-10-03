import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { ColumsNames, SearchParameters } from '../../variables';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParameters.Sort) || '';
  const order = searchParams.get(SearchParameters.Order) || '';

  function getSearchColumsParams(value: string): SearchParams {
    const firstClick = sort !== value;
    const secondClick = sort === value && !order;

    if (firstClick) {
      return {
        [SearchParameters.Sort]: value,
        [SearchParameters.Order]: null,
      };
    }

    if (secondClick) {
      return { [SearchParameters.Order]: 'desc' };
    }

    return {
      [SearchParameters.Sort]: null,
      [SearchParameters.Order]: null,
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(ColumsNames).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getSearchColumsParams(value)}>
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sort !== value,
                      'fa-sort-up': sort === value && !order,
                      'fa-sort-down': sort === value && order,
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
          <PersonInfo
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
