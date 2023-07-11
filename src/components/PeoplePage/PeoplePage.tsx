import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { findParent } from '../../helpers/findParents';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsRequestSent(false);

    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map((
          person,
          _,
          people,
        ) => {
          const mother = findParent(people, person, 'mother');
          const father = findParent(people, person, 'father');

          return {
            ...person,
            mother,
            father,
          };
        });

        setVisiblePeople(peopleWithParents);
        setIsRequestSent(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const areTherePeopleOnSever = isRequestSent && !visiblePeople?.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">

              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {areTherePeopleOnSever && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {visiblePeople && (
                <PeopleTable
                  visiblePeople={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
// import { Loader } from '../Loader';
// import { PeopleTable } from '../PeopleTable/PeopleTable';

// export const PeoplePage = () => {
//   return (
//     <>
//       <h1 className="title">People Page</h1>

//       <div className="block">
//         <div className="columns is-desktop is-flex-direction-row-reverse">
//           <div className="column is-7-tablet is-narrow-desktop">
//             <PeopleFilters />
//           </div>

//           <div className="column">
//             <div className="box table-container">
//               {/* <Loader />

//               <p data-cy="peopleLoadingError">Something went wrong</p>

//               <p data-cy="noPeopleMessage">
//                 There are no people on the server
//               </p>

//               <p>There are no people matching the current search criteria</p> */}

//               <PeopleTable />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
