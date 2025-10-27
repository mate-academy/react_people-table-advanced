import { Person } from '../types';
import { PersonData } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useFilters } from '../hooks/useFilters';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { sort, order } = useFilters();

  function nextParams(par: string) {
    if (sort !== par && order === '') {
      return { sort: par, order: null };
    }

    if (sort === par && order !== 'desc') {
      return { sort: par, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  function classSwitch(par: string) {
    if (sort !== par) {
      return 'fa-sort';
    }

    if (sort === par && !order) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  }

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
              <SearchLink params={nextParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', classSwitch('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={nextParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', classSwitch('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={nextParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', classSwitch('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={nextParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', classSwitch('died'))} />
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
          <PersonData key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
