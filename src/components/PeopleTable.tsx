import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  loading: boolean;
  isError: boolean;
};

const tableHeads = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people, loading, isError }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  const setParams = (sortStr: string) => ({
    sort: sortBy === sortStr && orderBy === 'desc' ? null : sortStr,
    order: sortBy === sortStr && !orderBy ? 'desc' : null,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!loading && !isError && !!people.length && (
        <thead>
          <tr>
            {tableHeads.map(tHead => (
              <th key={tHead}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {tHead}
                  <SearchLink
                    params={setParams(tHead.toLowerCase())}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas fa-sort', {
                          'fa-sort': sortBy === '',
                          'fa-sort-up': sortBy === tHead.toLowerCase()
                            && !orderBy,
                          'fa-sort-down': sortBy === tHead.toLowerCase()
                            && orderBy,
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
      )}
      <tbody>
        {people.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
