import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleContext } from '../Context';

export const PeoplePage = () => {
  const {
    dataComes,
    loading,
    err,
    setloading,
    setDataComes,
    setPeople,
    setErr,
  } = useContext(PeopleContext);

  useEffect(() => {
    setloading(true);
    getPeople()
      .then((freshPeople) => {
        setPeople(freshPeople);
        if (freshPeople.length > 0) {
          setDataComes('Exist');
        } else {
          setDataComes('Empty');
        }
      })
      .catch((er) => {
        setErr(er);
        setDataComes('NO');
      })
      .finally(() => {
        setloading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(dataComes === 'Exist' && !loading) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {err && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {dataComes === 'Empty' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>There are no people matching the current search criteria</p>
              )}
              {(dataComes === 'Exist' && !loading) && (
                <PeopleTable slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
