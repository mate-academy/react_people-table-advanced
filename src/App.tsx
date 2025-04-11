import './App.scss';
import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

//

// Mam takie zadanie:1. All the filters and sort params should be saved as URL Search Params, so you could share the link to show exactly what you see.
// 1. Keep search params when navigating within the `People` page (when selecting a person or clicking the `People` link).
// 1. The sidebar with the filters should appear only when people are loaded.
// 1. `NameFilter` should update the `query` search param with the text from the input.
//     - show only people with the `name`, `motherName` or `fatherName` that match the query case insensitive;
//     - if the input is empty there should not be `query` in the search params.
// 1. `CenturyFilter` should allow to choose several centuries or all of them.
//     - add `centuries` search params using `append` method  `getAll` method;
// 1. Implement sorting by `name`, `sex`, `born` and `died` by clicking on arrows in a `th`;
//     - the first click on a column sorts people by the selected field ascending (`a -> z` or `0 -> 9`);
//     - the second click (when people are already sorted ascending by this field) reverses the order of sorting;
//     - the third click (when people are already sorted in reversed order by this field) disables sorting;
//     - use `sort` search param to save sort field;
//     - add `order=desc` (short for `descending`) if sorted in reversed order;
// - if sorting is disabled there should not be `sort` and `order` search params;

// Pnizej przesylam Tobie moj dotychczasowy kod:

// import { useEffect, useState } from 'react';
// import { PeopleTable } from '../PeopleTable';
// import { Loader } from '../Loader';
// import React from 'react';
// import { Person } from '../../types';
// import { PeopleFilters } from '../PeopleFilters';
// // import { useSearchParams } from 'react-router-dom';

// export const PeoplePage = () => {
//   const [people, setPeople] = useState<Person[]>([]);
//   // const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

//   // const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     setIsLoading(true);
//     setIsLoadingError(false);
//     setTimeout(() => {
//       fetch('/api/people.json')
//         .then(resp => {
//           if (!resp.ok) {
//             throw new Error('SomethingWent Wrong');
//           }

//           return resp.json();
//         })
//         .then(data => {
//           setPeople(data);
//           setIsLoadingError(false);
//         })
//         .catch(() => setIsLoadingError(true))
//         .finally(() => setIsLoading(false));
//     }, 1000);
//   }, []);

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
//               {isLoading && <Loader />}

//               {!isLoading && isLoadingError && (
//                 <p data-cy="peopleLoadingError" className="has-text-danger">
//                   Something went wrong
//                 </p>
//               )}

//               {!isLoading && !isLoadingError && people?.length === 0 && (
//                 <p data-cy="noPeopleMessage">
//                   There are no people on the server
//                 </p>
//               )}

//               {/* <p>There are no people matching the current search criteria</p> */}

//               {!isLoading && !isLoadingError && people?.length !== 0 && (
//                 <PeopleTable people={people} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// import { useParams } from 'react-router-dom';
// import { Person } from '../../types';
// import { PersonLink } from '../PersonLink';
// import React from 'react';

// type PeopleProps = {
//   people: Person[] | undefined;
// };

// export const PeopleTable = ({ people }: PeopleProps) => {
//   const { slug } = useParams();

//   const findPersonByName = (name: string | null): Person | undefined => {
//     return people?.find(p => p.name === name);
//   };

//   return (
//     <table
//       data-cy="peopleTable"
//       className="table is-striped is-hoverable is-narrow is-fullwidth"
//     >
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Sex</th>
//           <th>Born</th>
//           <th>Died</th>
//           <th>Mother</th>
//           <th>Father</th>
//         </tr>
//       </thead>
//       {people?.map(person => {
//         const isSelected = person.slug === slug;
//         const mother = findPersonByName(person.motherName);
//         const father = findPersonByName(person.fatherName);

//         return (
//           <tbody key={person.slug}>
//             <tr
//               data-cy="person"
//               className={isSelected ? `has-background-warning` : ''}
//             >
//               <td>
//                 <PersonLink
//                   person={person}
//                   isWoman={person.sex === 'f'}
//                   name={person.name}
//                 />
//               </td>

//               <td>{person.sex}</td>
//               <td>{person.born}</td>
//               <td>{person.died}</td>
//               <td>
//                 {person.motherName ? (
//                   <PersonLink
//                     person={mother}
//                     isWoman={true}
//                     name={person.motherName}
//                   />
//                 ) : (
//                   '-'
//                 )}
//               </td>
//               <td>
//                 {person.fatherName ? (
//                   <PersonLink
//                     person={father}
//                     isWoman={false}
//                     name={person.fatherName}
//                   />
//                 ) : (
//                   '-'
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         );
//       })}
//     </table>
//   );
// };
// import { Link } from 'react-router-dom';
// import { Person } from '../../types';
// import React from 'react';

// type PersonLinkProps = {
//   person: Person | undefined;
//   isWoman: boolean;
//   name: string;
// };

// export const PersonLink = ({ person, isWoman, name }: PersonLinkProps) => {
//   const classLink = isWoman ? `has-text-danger` : '';

//   if (!person) {
//     return <p>{name}</p>;
//   }

//   return (
//     <Link className={classLink} to={`/people/${person.slug}`}>
//       {name}
//     </Link>
//   );
// };
// import { Link, LinkProps, useSearchParams } from 'react-router-dom';
// import { getSearchWith, SearchParams } from '../utils/searchHelper';
// import React from 'react';

// /**
//  * To replace the the standard `Link` we take all it props except for `to`
//  * along with the custom `params` prop that we use for updating the search
//  */
// type Props = Omit<LinkProps, 'to'> & {
//   params: SearchParams;
// };

// /**
//  * SearchLink updates the given `params` in the search keeping the `pathname`
//  * and the other existing search params (see `getSearchWith`)
//  */
// export const SearchLink: React.FC<Props> = ({
//   children, // this is the content between the open and closing tags
//   params, // the params to be updated in the `search`
//   ...props // all usual Link props like `className`, `style` and `id`
// }) => {
//   const [searchParams] = useSearchParams();

//   return (
//     <Link
//       // to={{ search: getSearchWith(searchParams, { query: 'sdf' }) }}
//       // to={{ search: getSearchWith(searchParams, { query: null }) }}
//       // to={{ search: getSearchWith(searchParams, { centuries: ['16', '18'] }) }}
//       to={{
//         search: getSearchWith(searchParams, params),
//       }}
//       {...props} // copy all the other props
//     >
//       {children}
//     </Link>
//   );
// };
// export type SearchParams = {
//   [key: string]: string | string[] | null;
// };

// /**
//  * This function prepares a correct search string
//  * from a given currentParams and paramsToUpdate.
//  */
// export function getSearchWith(
//   currentParams: URLSearchParams,
//   paramsToUpdate: SearchParams, // it's our custom type
// ): string {
//   // copy currentParams by creating new object from a string
//   const newParams = new URLSearchParams(currentParams.toString());

//   // Here is the example of paramsToUpdate
//   // {
//   //   sex: 'm',                ['sex', 'm']
//   //   order: null,             ['order', null]
//   //   centuries: ['16', '19'], ['centuries', ['16', '19']]
//   // }
//   //
//   // - params with the `null` value are deleted;
//   // - string value is set to given param key;
//   // - array of strings adds several params with the same key;

//   Object.entries(paramsToUpdate).forEach(([key, value]) => {
//     if (value === null) {
//       newParams.delete(key);
//     } else if (Array.isArray(value)) {
//       // we delete the key to remove old values
//       newParams.delete(key);

//       value.forEach(part => {
//         newParams.append(key, part);
//       });
//     } else {
//       newParams.set(key, value);
//     }
//   });

//   // we return a string to use it inside links
//   return newParams.toString();
// }
