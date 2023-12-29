import classNames from 'classnames';
import { useEffect } from 'react';
import { getPeople } from '../../api';
import { usePeoplePageContext }
  from '../../pages/PeoplePage/PeoplePageContext/PeoplePageContext';
import { Person } from '../Person';
import { PeopleLoadingError } from '../PeopleLoadingError';
import { NoPeopleOnServer } from '../NoPeopleOnServer';
import { Loader } from '../Loader';
import { SearchLink } from '../SearchLink';
import { SortBy } from '../../types/FiltersType';

export const PeopleTable: React.FC = () => {
  const {
    people,
    loading,
    setLoading,
    setError,
    setPeople,
    error,
  } = usePeoplePageContext();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [setError, setLoading, setPeople]);

  const succesfulPeopleRender = !loading && !error && people.length > 0;
  const appiSendNoPeople = !people.length && !loading;

  const { sort, order } = usePeoplePageContext();

  const getSortParams = (field: string) => {
    if (field === sort && !order) {
      return { sort: field, order: 'desc' };
    }

    if (field === sort && order) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}
        {error && <PeopleLoadingError />}
        {appiSendNoPeople && <NoPeopleOnServer />}
        {succesfulPeopleRender && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={getSortParams(SortBy.name)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== SortBy.name,
                            'fa-sort-up': sort === SortBy.name && !order,
                            'fa-sort-down': sort === SortBy.name && order,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={getSortParams(SortBy.sex)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== SortBy.sex,
                            'fa-sort-up': sort === SortBy.sex && !order,
                            'fa-sort-down': sort === SortBy.sex && order,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={getSortParams(SortBy.born)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== SortBy.born,
                            'fa-sort-up': sort === SortBy.born && !order,
                            'fa-sort-down': sort === SortBy.born && order,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={getSortParams(SortBy.died)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== SortBy.died,
                            'fa-sort-up': sort === SortBy.died && !order,
                            'fa-sort-down': sort === SortBy.died && order,
                          })}
                        />
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
                <Person
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
