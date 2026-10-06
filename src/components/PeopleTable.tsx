import { Link, useSearchParams } from 'react-router-dom';
import { useGlobalState } from '../store/GlobalProvider';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleTable = () => {
  const { updatedPeople } = useGlobalState();
  const [searchParams] = useSearchParams();

  const SORT_CRITERIAS = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_CRITERIAS.map(criteria => {
            return (
              <th key={criteria}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {criteria[0].toUpperCase() + criteria.slice(1)}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort:
                          searchParams.get('sort') === criteria &&
                          searchParams.get('order')
                            ? null
                            : criteria,
                        order:
                          searchParams.get('sort') === criteria &&
                          !searchParams.get('order')
                            ? 'desc'
                            : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchParams.get('sort') !== criteria,
                          'fa-sort-up':
                            searchParams.get('sort') === criteria &&
                            !searchParams.get('order'),
                          'fa-sort-down':
                            searchParams.get('sort') === criteria &&
                            searchParams.get('order'),
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {updatedPeople.map(person => {
          return <PersonLink person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
