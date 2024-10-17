// import { useEffect, useState } from 'react';
// import { getPeople } from '../api';
// import { Person } from '../types/Person';
// import { PeopleFilters } from './PeopleFilters';
// import { PeopleTable } from './PeopleTable';

// export const PeoplePage: React.FC = () => {
//   const [people, setPeople] = useState<Person[]>([]);
//   const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
//   const [sortDirection, setSortDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortSexDirection, setSortSexDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortBornDirection, setSortBornDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortDiedDirection, setSortDiedDirection] = useState<null | 'asc' | 'desc'>(null);

//   useEffect(() => {
//     const fetchPeople = async () => {
//       const data = await getPeople();
//       setPeople(data);
//       setSortedPeople(data);
//     };

//     fetchPeople();
//   }, []);

//   const handleSortName = () => {
//     if (sortDirection === null) {
//       const sortedAsc = [...sortedPeople].sort((a, b) => a.name.localeCompare(b.name));
//       setSortedPeople(sortedAsc);
//       setSortDirection('asc');
//     } else if (sortDirection === 'asc') {
//       const sortedDesc = [...sortedPeople].sort((a, b) => b.name.localeCompare(a.name));
//       setSortedPeople(sortedDesc);
//       setSortDirection('desc');
//     } else {
//       setSortedPeople(people);
//       setSortDirection(null);
//     }
//   };

//   const handleSortBorn = () => {
//     const sortedBorn = [...sortedPeople];

//     if (sortBornDirection === null) {
//       sortedBorn.sort((a, b) => a.born - b.born);
//       setSortedPeople(sortedBorn);
//       setSortBornDirection('asc');
//     } else if (sortBornDirection === 'asc') {
//       sortedBorn.sort((a, b) => b.born - a.born);
//       setSortedPeople(sortedBorn);
//       setSortBornDirection('desc');
//     } else {
//       setSortedPeople(people);
//       setSortBornDirection(null);
//     }
//   };

//   const handleSortDied = () => {
//     const sortedDied = [...sortedPeople];

//     if (sortDiedDirection === null) {
//       sortedDied.sort((a, b) => a.died - b.died);
//       setSortedPeople(sortedDied);
//       setSortDiedDirection('asc');
//     } else if (sortDiedDirection === 'asc') {
//       sortedDied.sort((a, b) => b.died - a.died);
//       setSortedPeople(sortedDied);
//       setSortDiedDirection('desc');
//     } else {
//       setSortedPeople(people);
//       setSortDiedDirection(null);
//     }
//   };

//   const handleSortSex = () => {
//     const sortedSex = [...sortedPeople];

//     if (sortSexDirection === 'asc') {
//       sortedSex.sort((a, b) => (a.sex === 'm' && b.sex === 'f' ? -1 : 1));
//       setSortedPeople(sortedSex);
//       setSortSexDirection('desc');
//     } else if (sortSexDirection === 'desc') {
//       setSortedPeople(people);
//       setSortSexDirection(null);
//     } else {
//       sortedSex.sort((a, b) => (a.sex === 'f' && b.sex === 'm' ? -1 : 1));
//       setSortedPeople(sortedSex);
//       setSortSexDirection('asc');
//     }
//   };

//   const handleFilterChange = (filter: 'all' | 'male' | 'female') => {
//     if (filter === 'all') {

//       setSortedPeople(people);
//     } else {
//       const gender = filter === 'male' ? 'm' : 'f';
//       const filtered = people.filter(person => person.sex === gender);
//       console.log('filtered', filtered);

//       setSortedPeople(filtered);
//     }
//   };

//   return (
//     <>
//       <h1 className="title">People Page</h1>
//       <div className="block">
//         <PeopleTable
//           persons={sortedPeople}
//           handleSortName={handleSortName}
//           handleSortSex={handleSortSex}
//           handleSortBorn={handleSortBorn}
//           handleSortDied={handleSortDied}
//         />
//       </div>
//       <div className='block'>
//         <PeopleFilters persons={people} onFilterChange={handleFilterChange} />
//       </div>
//     </>
//   );
// };

// import { ReactElement, useEffect, useState } from 'react';
// import { getPeople } from '../api';
// import { Person } from '../types/Person';
// import { PeopleFilters } from './PeopleFilters';
// import { PeopleTable } from './PeopleTable';
// import { Loader } from '../components/Loader';
// import { useSearchParams } from 'react-router-dom';

// export const PeoplePage: React.FC = () => {
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [people, setPeople] = useState<Person[]>([]);
//   const [filteredAndSortedPeople, setFilteredAndSortedPeople] = useState<Person[]>([]);
//   const [sortDirection, setSortDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortSexDirection, setSortSexDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortBornDirection, setSortBornDirection] = useState<null | 'asc' | 'desc'>(null);
//   const [sortDiedDirection, setSortDiedDirection] = useState<null | 'asc' | 'desc'>(null);

//   const [searchParams, setSearchParams] = useSearchParams();
//   const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
//   const [selectedCentury, setSelectedCentury] = useState<number | 'all' | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   useEffect(() => {
//     const fetchPeople = async () => {
//       setLoader(true);
//       try {
//         const data = await getPeople();

//         setPeople(data);
//         setFilteredAndSortedPeople(data);
//       } catch (error) {
//         setError('Failed to fetch data')
//       } finally {
//         setLoader(false);
//       }
//     };

//     fetchPeople();
//   }, []);

//   const updateFilteredAndSortedPeople = () => {
//     let updatedPeople = [...people];

//     const getCentury = (year: number) => Math.floor((year - 1) /100) + 1;

//     if (selectedCentury !== null) {
//       updatedPeople = updatedPeople.filter(person => getCentury(person.born) === selectedCentury)
//     }
//     if (filter === 'male') {
//       updatedPeople = updatedPeople.filter(person => person.sex === 'm');
//     } else if (filter === 'female') {
//       updatedPeople = updatedPeople.filter(person => person.sex === 'f');
//     }

//     if (searchQuery) {
//       updatedPeople = updatedPeople.filter(person =>
//         person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         person.motherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         person.fatherName?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     }

//     if (sortDirection === 'asc') {
//       updatedPeople.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortDirection === 'desc') {
//       updatedPeople.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     if (sortSexDirection === 'asc') {
//       updatedPeople.sort((a, b) => a.sex === 'm' && b.sex === 'f' ? -1 : 1);
//     } else if (sortSexDirection === 'desc') {
//       updatedPeople.sort((a, b) => a.sex === 'f' && b.sex === 'm' ? -1 : 1);
//     }

//     if (sortBornDirection === 'asc') {
//       updatedPeople.sort((a, b) => a.born - b.born);
//     } else if (sortBornDirection === 'desc') {
//       updatedPeople.sort((a, b) => b.born - a.born);
//     }

//     if (sortDiedDirection === 'asc') {
//       updatedPeople.sort((a, b) => a.died - b.died);
//     } else if (sortDiedDirection === 'desc') {
//       updatedPeople.sort((a, b) => b.died - a.died);
//     }

//     setFilteredAndSortedPeople(updatedPeople);
//   };

//   const handleSortName = () => {
//     setSortDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
//   };

//   const handleSortBorn = () => {
//     setSortBornDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
//   };

//   const handleSortDied = () => {
//     setSortDiedDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
//   };

//   const handleSortSex = () => {
//     setSortSexDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
//   };

//   useEffect(() => {
//     updateFilteredAndSortedPeople();
//   }, [people, filter, sortDirection, sortSexDirection, sortBornDirection, sortDiedDirection, selectedCentury, searchQuery]);

//   return (
//     <>
//       <h1 className="title">People Page</h1>
//       <div className="block">
//         <PeopleTable
//           persons={filteredAndSortedPeople}
//           handleSortName={handleSortName}
//           handleSortSex={handleSortSex}
//           handleSortBorn={handleSortBorn}
//           handleSortDied={handleSortDied}
//         />
//       </div>
//       <div className='block'>
//         {loader ? (
//           <Loader />
//         ) : (
//           <PeopleFilters
//             persons={people}
//             onFilterChange={setFilter}
//             onChange={setSearchQuery}
//             onClick={setSelectedCentury}
//           />
//         )}
//       </div>
//     </>
//   );
// };

/* eslint-disable */


// import React, { useEffect, useState } from 'react';
// import { getPeople } from '../api';
// import { Person } from '../types/Person';
// import { PeopleFilters } from './PeopleFilters';
// import { PeopleTable } from './PeopleTable';
// import { Loader } from '../components/Loader';
// import { useSearchParams } from 'react-router-dom';
// import { useMemo } from 'react';

// export const PeoplePage: React.FC = () => {
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [people, setPeople] = useState<Person[]>([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
//   const [selectedCentury, setSelectedCentury] = useState<number | 'all' | null>(
//     null,
//   );
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [sortField, setSortField] = useState<string | null>(null);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

//   useEffect(() => {
//     const fetchPeople = async () => {
//       setLoader(true);
//       try {
//         const data = await getPeople();

//         setPeople(data);
//         console.log('data', data);
//       } catch (er) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoader(false);
//       }
//     };

//     fetchPeople();
//   }, []);

//   useEffect(() => {
//     const filterParam = searchParams.get('filter');
//     const searchParam = searchParams.get('search');
//     const sortParam = searchParams.get('sort');
//     const orderParam = searchParams.get('order');

//     if (filterParam) {
//       setFilter(filterParam as 'all' | 'male' | 'female');
//     }

//     if (searchParam) {
//       setSearchQuery(searchParam);
//     }

//     if (sortParam) {
//       setSortField(sortParam as 'male' | 'female' | 'born' | 'died');
//     }

//     if (orderParam) {
//       setSortOrder(orderParam as 'asc' | 'desc' | null);
//     }
//   }, [searchParams]);

//   const filteredAndSortedPeople = useMemo(() => {
//     let updatedPeople = [...people];
//     const getCentury = (year: number) => Math.floor((year - 1) / 100) + 1;


//     if (selectedCentury !== null) {
//       updatedPeople = updatedPeople.filter(
//         person => getCentury(person.born) === selectedCentury,
//       );
//     }


//     if (filter === 'male') {
//       updatedPeople = updatedPeople.filter(person => person.sex === 'm');
//     } else if (filter === 'female') {
//       updatedPeople = updatedPeople.filter(person => person.sex === 'f');
//     }


//     if (searchQuery) {
//       updatedPeople = updatedPeople.filter(
//         person =>
//           person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           person.motherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           person.fatherName?.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//     }


//     if (sortField) {
//       updatedPeople.sort((a, b) => {
//         let comparison = 0;

//         if (sortField === 'name') {
//           comparison = a.name.localeCompare(b.name);
//         } else if (sortField === 'sex') {
//           comparison = a.sex.localeCompare(b.sex);
//         } else if (sortField === 'born') {
//           comparison = a.born - b.born;
//         } else if (sortField === 'died') {
//           comparison = a.died - b.died;
//         }

//         return sortOrder === 'asc' ? comparison : -comparison;
//       });
//     }

//     return updatedPeople;
//   }, [people, filter, selectedCentury, searchQuery, sortField, sortOrder]);

//   const handleFilterGender = (filterGender: 'all' | 'male' | 'female') => {
//     setFilter(prevFilter => {
//       const newFilter = prevFilter === filterGender ? 'all' : filterGender;
//       const newSearchParams = new URLSearchParams(searchParams);

//       if (newFilter !== 'all') {
//         newSearchParams.set('filter', newFilter);
//       }

//       if (newFilter === 'all') {
//         newSearchParams.delete('filter');
//       }

//       setSearchParams(newSearchParams);

//       return newFilter;
//     });
//   };

//   const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value;

//     setSearchQuery(query);

//     const params = new URLSearchParams(searchParams.toString());

//     if (query) {
//       params.set('search', query);
//     } else {
//       params.delete('search');
//     }

//     setSearchParams(params);
//   };

//   const handleSort = (field: 'name' | 'sex' | 'born' | 'died') => {
//     setSortField(prevField => {
//       const newOrder =
//         prevField === field && sortOrder === 'asc'
//           ? 'desc'
//           : prevField === field && sortOrder === 'desc'
//             ? null
//             : 'asc';

//       setSortOrder(newOrder);

//       setSearchParams(prev => {
//         const newParams = new URLSearchParams(prev.toString());

//         if (newOrder) {
//           newParams.set('sort', field);
//           newParams.set('order', newOrder);
//         } else {
//           newParams.delete('sort');
//           newParams.delete('order');
//         }

//         return newParams;
//       });

//       return newOrder === null ? null : field;
//     });
//   };

//   return (
//     <>
//       <h1 className="title">People Page</h1>
//       <div className="block">
//         <PeopleTable
//           persons={filteredAndSortedPeople}
//           handleSortName={() => handleSort('name')}
//           handleSortSex={() => handleSort('sex')}
//           handleSortBorn={() => handleSort('born')}
//           handleSortDied={() => handleSort('died')}
//         />
//       </div>
//       <div className="block">
//         {loader && !error ? (
//           <Loader />
//         ) : (
//           <PeopleFilters
//             persons={people}
//             onFilterChange={handleFilterGender}
//             onChange={handleSearchQuery}
//             onClick={setSelectedCentury}
//           />
//         )}
//       </div>
//     </>
//   );
// };


import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useCallback } from 'react';

export const PeoplePage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') as 'all' | 'male' | 'female' || 'all';
  // const selectedCentury = searchParams.get('century') as number | 'all' | 'null';
  const [selectedCentury, setSelectedCentury] = useState<number[]>([]);
  const searchQuery = searchParams.get('search') || '';
  const sortField = searchParams.get('sort') as 'name' | 'sex' | 'born' | 'died';
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | null ;

  useEffect(() => {
    const fetchPeople = async () => {
      setLoader(true);
      try {
        const data = await getPeople();

        setPeople(data);
        console.log('data', data);
      } catch (er) {
        setError('Something went wrong')
      } finally {
        setLoader(false);
      }
    };

    fetchPeople();
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let updatedPeople = [...people];

    const getCentury = (year: number) => Math.floor((year - 1) / 100) + 1;
    if (selectedCentury.length > 0) {
      updatedPeople = updatedPeople.filter(
        person => selectedCentury.includes(getCentury(person.born)),
      );
    }
    if (filter === 'male') {
      updatedPeople = updatedPeople.filter(person => person.sex === 'm');
    } else if (filter === 'female') {
      updatedPeople = updatedPeople.filter(person => person.sex === 'f');
    }

    if (searchQuery) {
      updatedPeople = updatedPeople.filter(
        person =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortField) {
      updatedPeople.sort((a, b) => {
        let comparison = 0;

        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'sex') {
          comparison = a.sex.localeCompare(b.sex);
        } else if (sortField === 'born') {
          comparison = a.born - b.born;
        } else if (sortField === 'died') {
          comparison = a.died - b.died;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return updatedPeople;
  }, [people, filter, selectedCentury, searchQuery, sortField, sortOrder]);

  const handleFilterGender = (filterGender: 'all' | 'male' | 'female') => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('filter', filterGender !== 'all' ? filterGender : '');
      setSearchParams(newSearchParams);
  };

  const handleSelectedCentury = (century: number | 'all' | null) => {
    if (century === 'all' || century === null) {
      setSelectedCentury([]);
      const params = new URLSearchParams(searchParams);
      params.delete('century');
      setSearchParams(params);
      return;
    }

    const isSelected = selectedCentury.includes(century);
    const updatedCenturies = isSelected
      ? selectedCentury.filter(item => item !== century)
      : [...selectedCentury, century];

    setSelectedCentury(updatedCenturies);

    const params = new URLSearchParams(searchParams);

    params.delete('century');
    updatedCenturies.forEach(cent => params.append('century', cent.toString()));

    setSearchParams(params);
  };


  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {people.length > 0 ? (
          <PeopleTable
          persons={filteredAndSortedPeople}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        ) : <p>There are no people matching the current search criteria</p>}
      </div>
      <div className="block">
        {loader && !error ? (
          <Loader />
        ) : error ? (
          <p data-cy="peopleLoadingError">Something went wrong</p>


        ) : people.length > 0 ? (
          <PeopleFilters
            persons={people}
            onFilterChange={handleFilterGender}
            onChange={handleSearchQuery}
            onClick={handleSelectedCentury}
          />
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </div>
    </>
  );
};
