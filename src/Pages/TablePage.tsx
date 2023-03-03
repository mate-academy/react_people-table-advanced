import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { filtered } from '../utils/Filter';

export const TablePage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sortType = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getPeopleList = async () => {
    try {
      const result = await getPeople();

      setPeopleList(result);
      setIsloading(false);
    } catch {
      setIsloading(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  const getArrayWithParents = useMemo(() => {
    return [...peopleList].map(person => {
      const motherLink = peopleList
        .find(mother => mother.name === person.motherName);
      const fatherLink = peopleList
        .find(father => father.name === person.fatherName);

      return { ...person, mother: motherLink, father: fatherLink };
    });
  }, [peopleList]);

  const visibile = useMemo(() => (
    filtered(query, sex, sortType, centuries, order, getArrayWithParents)),
  [searchParams, peopleList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {peopleList.length && !visibile.length ? (
                <p>
                  There are no people matching the current search criteria
                </p>
              ) : (
                <>
                  {isError && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {isLoading ? <Loader /> : <PeopleTable list={visibile} /> }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
