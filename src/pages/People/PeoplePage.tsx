import { useContext, useEffect } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { PeopleContext } from '../../peopleContext';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';

export const PeoplePage = () => {
  const { loader, warning, setLoader, setPeople, setWarning } =
    useContext(PeopleContext);

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res) {
          setWarning('There are no people on the server');
        } else {
          setWarning('');
        }

        setPeople([...res]);
      })
      .catch(error => {
        setWarning('Something went wrong');
        throw error;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [setLoader, setPeople, setWarning]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loader || (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {loader || warning || (
                <table
                  data-cy="peopleTable"
                  className="
                  table is-striped is-hoverable is-narrow is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Sex</th>
                      <th>Born</th>
                      <th>Died</th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <PeopleList />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
