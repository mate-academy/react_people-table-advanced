import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Errors } from '../../errors';
import { TableHead } from '../TableHead';
import { Loader } from '../Loader';
import { TableBody } from '../TableBody/TableBody';
import { getPeople } from '../../api';
import { ErrorsKey } from '../../types/ErrorsKey';
import { PeopleFilters } from '../PeopleFilters';
import { SortFields } from '../../types/SortFields';
import { preparedPeople } from '../../utils/preparedPeople';
import { SortDirection } from '../../types/SortDirection';
import { Sex } from '../../types/Sex';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorsKey, setErrorsKey] = useState<ErrorsKey | null>(null);
  const [columnName, setColumnName] = useState<SortFields | null>(null);
  const [direction, setDirection] = useState<SortDirection>(null);
  const [query, setQuery] = useState<string>('');
  const [sexFilter, setSexFilter] = useState<Sex | null>(null);
  const [centuryFilter, setCenturyFilter] = useState<number[]>([]);

  const filters = {
    query: query,
    sexFilter: sexFilter,
    centuryFilter: centuryFilter,
  };

  const visiblePeople = preparedPeople(people, filters, columnName, direction);

  const hasPeopleAfterFiltered = visiblePeople.length > 0;

  const handleSort = (column: SortFields) => {
    if (columnName !== column) {
      setColumnName(column);
      setDirection('asc');

      return;
    }

    if (direction === 'asc') {
      setDirection('desc');

      return;
    }

    setDirection(null);
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
              <PeopleFilters
                setQuery={setQuery}
                query={query}
                setSexFilter={setSexFilter}
                sexFilter={sexFilter}
                setCenturyFilter={setCenturyFilter}
                centuryFilter={centuryFilter}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : errorsKey ? (
                <p data-cy={errorsKey}>{Errors[errorsKey]}</p>
              ) : !hasPeopleAfterFiltered ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                            is-hoverable
                            is-narrow
                            is-fullwidth"
                >
                  <TableHead
                    sortField={columnName}
                    sortDirection={direction}
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
