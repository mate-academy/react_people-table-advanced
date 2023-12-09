import { useContext, useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleContext } from '../PeopleContext';

export const PeoplePage = () => {
  const { setPersons } = useContext(PeopleContext);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPersons)
      .finally(() => {
        setLoading(false);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  }, []);

  console.log(errorMessage);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <table
                  data-cy="peopleTable"
                  className="table
                  is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <PeopleTable />
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
