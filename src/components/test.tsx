// // import { Link, useParams, useSearchParams } from 'react-router-dom';
// // import { Person } from '../types';
// // import { LinkPerson } from './LinkPerson';
// // import cn from 'classnames';
// // import { useEffect, useState } from 'react';

// // /* eslint-disable jsx-a11y/control-has-associated-label */
// // type Props = {
// //   people: Person[];
// // };

// // enum Sort {
// //   name = 'name',
// //   sex = 'sex',
// //   died = 'died',
// //   born = 'born',
// // }

// // type SortOrder = 'asc' | 'desc';

// // export const PeopleTable = ({ people }: Props) => {
// //   const { personSlug } = useParams();
// //   const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
// //   const [sortedPeople, setSortedPeople] = useState<Person[]>(people);
// //   const [searchParams, setSearchParams] = useSearchParams();

// //   useEffect(() => {
// //     const handlerchangeLocation = () => {
// //       setSearchParams(new URLSearchParams(window.location.search));
// //     };

// //     window.addEventListener('popstate', handlerchangeLocation);

// //     return window.removeEventListener('popstate', handlerchangeLocation);
// //   }, []);

// //   Array.from(searchParams.entries()).forEach(([key, value]) => {
// //     console.log(`search params-${key}: ${value}`);
// //   });

// //   const toggleSortOrder = () => {
// //     return setSortOrder(prevState => (prevState === 'asc' ? 'desc' : 'asc'));
// //   };

// //   const sortPeople = (column: Sort): Person[] => {
// //     const sorted = [...people];

// //     sorted.sort((a, b) => {
// //       const columnA = a[column];
// //       const columnB = b[column];

// //       if (typeof columnA === 'string' && typeof columnB === 'string') {
// //         return sortOrder === 'asc'
// //           ? columnA.localeCompare(columnB)
// //           : columnB.localeCompare(columnA);
// //       } else {
// //         return sortOrder === 'asc'
// //           ? Number(columnA) - Number(columnB)
// //           : Number(columnB) - Number(columnA);
// //       }
// //     });

// //     return sorted;
// //   };

// //   const handlerSortBy = (column: Sort) => {
// //     toggleSortOrder();
// //     setSortedPeople(sortPeople(column));

// //     // eslint-disable-next-line max-len, prettier/prettier, no-console
// //     console.log(
// //       'pierwszy',
// //       searchParams.has('sort') && searchParams.get('sort') === column,
// //     );

// //     const newParams = new URLSearchParams(searchParams);

// //     if (searchParams.has('sort') && searchParams.get('sort') === column) {
// //       newParams.set('order', 'desc');

// //       console.log('drugi', newParams.set('order', 'desc'));

// //       setSearchParams(newParams);
// //     } else {
// //       console.log('inside');
// //       newParams.delete('order');
// //     }
// //   };

// //   return (
// //     <table
// //       data-cy="peopleTable"
// //       className="table is-striped is-hoverable is-narrow is-fullwidth"
// //     >
// //       <thead>

// //         <tr>
// //           <th>
// //             <span className="is-flex is-flex-wrap-nowrap">
// //               Name
// //               <Link to={'?sort=name'}>
// //                 <span
// //                   onClick={() => {
// //                     handlerSortBy(Sort.name);
// //                   }}
// //                   className="icon"
// //                 >
// //                   <i className="fas fa-sort" />
// //                 </span>
// //               </Link>
// //             </span>
// //           </th>

// //           <th>
// //             <span className="is-flex is-flex-wrap-nowrap">
// //               Sex
// //               <a href="#/people?sort=sex">
// //                 <span onClick={() => handlerSortBy(Sort.sex)} className="icon">
// //                   <i className="fas fa-sort" />
// //                 </span>
// //               </a>
// //             </span>
// //           </th>

// //           <th>
// //             <span className="is-flex is-flex-wrap-nowrap">
// //               Born
// //               <a href="#/people?sort=born&amp;order=desc">
// //                 <span onClick={() => handlerSortBy(Sort.born)} className="icon">
// //                   <i className="fas fa-sort-up" />
// //                 </span>
// //               </a>
// //             </span>
// //           </th>

// //           <th>
// //             <span className="is-flex is-flex-wrap-nowrap">
// //               Died
// //               <a href="#/people?sort=died">
// //                 <span onClick={() => handlerSortBy(Sort.died)} className="icon">
// //                   <i className="fas fa-sort" />
// //                 </span>
// //               </a>
// //             </span>
// //           </th>

// //           <th>Mother</th>
// //           <th>Father</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {sortedPeople.map(person => {
// //           const { slug, born, died, sex, fatherName, motherName } = person;
// //           const mother = people.find(p => p.name === person.motherName);
// //           const father = people.find(p => p.name === person.fatherName);

// //           return (
// //             <tr
// //               data-cy="person"
// //               key={person.slug}
// //               className={cn({
// //                 'has-background-warning': slug === personSlug,
// //               })}
// //             >
// //               <td>
// //                 <LinkPerson person={person} />
// //               </td>

// //               <td>{sex}</td>
// //               <td>{born}</td>
// //               <td>{died}</td>
// //               <td>
// //                 {mother ? <LinkPerson person={mother} /> : motherName || '-'}
// //               </td>
// //               <td>
// //                 {father ? <LinkPerson person={father} /> : fatherName || '-'}
// //               </td>
// //             </tr>
// //           );
// //         })}
// //       </tbody>
// //     </table>
// //   );
// // };

// // ======================================

// // if (column) {
// //   if (order) {
// //     if (column === prop) {
// //       params.delete('order');
// //       params.delete('sort');
// //     } else {
// //       params.delete('order');
// //       params.set('sort', prop);
// //     }
// //   } else if (column === prop) {
// //     params.set('order', 'desc');
// //   } else {
// //     params.set('sort', prop);
// //   }
// // } else {
// //   params.set('sort', prop);
// // }

// // setSeachParams(params);

// <SearchLink params={getSearchParams(Sort.Name)}>
//   <span className="icon">
//     <i className={getSortLinkClassName(Sort.Name)} />
//   </span>
// </SearchLink>;

// const getSearchParams = (sortingBy: string) => {
//   return {
//     sort: sort === sortingBy && order === 'desc' ? null : sortingBy,
//     order: sort === sortingBy && order === null ? 'desc' : null,
//   };
// };

// const getSortLinkClassName = (sortingBy: string) => {
//   return classNames('fas', {
//     'fa-sort': sort !== sortingBy,
//     'fa-sort-up': sort === sortingBy && !order,
//     'fa-sort-down': sort === sortingBy && order,
//   });
// };
