// import { PeopleFilters } from '../components/PeopleFilters';
// import { Loader } from '../components/Loader';
// import { PeopleTable } from '../components/PeopleTable';

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
//               <Loader />

//               <p data-cy="peopleLoadingError">Something went wrong</p>

//               <p data-cy="noPeopleMessage">There are no people on the server</p>

//               <p>There are no people matching the current search criteria</p>

//               <PeopleTable />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import { Outlet } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useState } from 'react';

export const PeoplePage = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* <div className="container"> */}
      <h1 className="title">People Page</h1>
      {/* </div> */}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          {/* <div className="column">
            <div className="box table-container"> */}
          <PeopleTable setShowFilters={setShowFilters} />
          <Outlet />
          {/* </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
