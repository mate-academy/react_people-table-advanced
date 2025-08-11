import { useSearchParams } from 'react-router-dom';
import { PersonInfo } from './PersonInfo';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useValues } from './store/PeopleContext';

const THEAD = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC = () => {
  const { filteredPeople } = useValues();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortParams = (sortField: string) => {
    if (sort !== sortField) {
      return { sort: sortField, order: null };
    } else if (sort === sortField && !order) {
      return { sort: sortField, order: 'desc' };
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
          {THEAD.map(thead => (
            <th key={thead}>
              {thead}
              <SearchLink params={sortParams(thead.toLowerCase())}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== thead.toLowerCase(),
                      'fa-sort-up': sort === thead.toLowerCase() && !order,
                      'fa-sort-down': sort === thead.toLowerCase() && order,
                    })}
                  ></i>
                </span>
              </SearchLink>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
