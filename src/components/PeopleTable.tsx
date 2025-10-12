import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const headLines = ['Name', 'Sex', 'Born', 'Died'];
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentSort = params.get('sort') || null;
  const currentOrder = params.get('order') || null;

  function getSortParams(sortParam: string): SearchParams {
    const newSortParam = sortParam.toLocaleLowerCase();

    if (currentSort !== newSortParam) {
      return { sort: newSortParam, order: null };
    } else if (currentSort === newSortParam && currentOrder !== 'desc') {
      return { sort: newSortParam, order: 'desc' };
    } else {
      return { sort: null, order: null };
    }
  }

  function getIconClass(param: string) {
    if (params.get('order') === 'desc' && params.get('sort') === param) {
      return 'fa-sort-down';
    } else if (params.has('sort') && params.get('sort') === param) {
      return 'fa-sort-up';
    } else {
      return 'fa-sort';
    }
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headLines.map(line => (
            <th key={line}>
              <span className="is-flex is-flex-wrap-nowrap">
                {line}
                <SearchLink params={getSortParams(line)}>
                  <span className="icon">
                    <i
                      className={`fas ${getIconClass(line.toLocaleLowerCase())}`}
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
          <PersonInfo person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
