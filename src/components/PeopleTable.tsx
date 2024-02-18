import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  personSlug?: string;
  persons: Person[];
  filteredPersons: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  personSlug,
  filteredPersons,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const controlClasses = (value: string) => {
    return classNames('fas', {
      'fa-sort': sort !== value,
      'fa-sort-up': sort === value && order !== 'desc',
      'fa-sort-down': sort === value && order === 'desc',
    });
  };

  const stateManagement = (sorting: string) => {
    const newSearchParams = {
      sort: '',
      order: '',
    };

    if (sorting !== sort) {
      newSearchParams.sort = sorting;
    }

    if (sorting === sort && order !== 'desc') {
      newSearchParams.sort = sort;
      newSearchParams.order = 'desc';
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
      {persons.length === 0 ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ) : (
        <>
          {filteredPersons.length === 0 ? (
            <p>There are no people matching the current search criteria</p>
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <SearchLink params={stateManagement('name')}>
                        <span className="icon">
                          <i className={controlClasses('name')} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <SearchLink params={stateManagement('sex')}>
                        <span className="icon">
                          <i className={controlClasses('sex')} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <SearchLink params={stateManagement('born')}>
                        <span className="icon">
                          <i className={controlClasses('born')} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <SearchLink params={stateManagement('died')}>
                        <span className="icon">
                          <i className={controlClasses('died')} />
                        </span>
                      </SearchLink>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>
                {persons.map((person: Person) => (
                  <PersonLink
                    key={person.id}
                    person={person}
                    persons={persons}
                    personSlug={personSlug}
                  />
                ))}
              </tbody>
            </>
          )}
        </>
      )}
    </table>
  );
};
