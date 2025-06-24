import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Errors } from '../../errors';
import { TableHead } from '../TableHead';
import { Loader } from '../Loader';
import { TableBody } from '../TableBody/TableBody';
import { getPeople } from '../../api';
import { ErrorsKey } from '../../types/ErrorsKey';
import { PeopleFilters } from '../PeopleFilters';
import { SortConfig } from '../../types/SortConfig';
import { SortFields } from '../../types/SortFields';
import { preparedPeople } from '../../utils/preparedPeople';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorsKey, setErrorsKey] = useState<ErrorsKey | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    columnName: SortFields.name,
    direction: null,
  });
  const [query, setQuery] = useState<string>('');

  const visiblePeople = preparedPeople(people, query, sortConfig);

  const handleSort = (column: SortFields) => {
    setSortConfig(current => {
      if (current.columnName !== column) {
        return { columnName: column, direction: 'asc' };
      }

      if (current.direction === 'asc') {
        return { columnName: column, direction: 'desc' };
      }

      return { columnName: column, direction: null };
    });
  };

  const handleGetPeople = () => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        if (data.length === 0) {
          setErrorsKey('noPeopleMessage');
        }
      })
      .catch(() => {
        setErrorsKey('peopleLoadingError');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorsKey && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters setQuery={setQuery} query={query} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : errorsKey ? (
                <p data-cy={errorsKey}>{Errors[errorsKey]}</p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                            is-hoverable
                            is-narrow
                            is-fullwidth"
                >
                  <TableHead
                    sortField={sortConfig.columnName}
                    sortDirection={sortConfig.direction}
                    onSort={handleSort}
                  />
                  <TableBody people={visiblePeople} />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
