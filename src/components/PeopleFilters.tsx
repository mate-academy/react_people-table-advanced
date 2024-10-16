// export const PeopleFilters = () => {
//   return (
//     <nav className="panel">
//       <p className="panel-heading">Filters</p>

//       <p className="panel-tabs" data-cy="SexFilter">
//         <a className="is-active" href="#/people">
//           All
//         </a>
//         <a className="" href="#/people?sex=m">
//           Male
//         </a>
//         <a className="" href="#/people?sex=f">
//           Female
//         </a>
//       </p>

//       <div className="panel-block">
//         <p className="control has-icons-left">
//           <input
//             data-cy="NameFilter"
//             type="search"
//             className="input"
//             placeholder="Search"
//           />

//           <span className="icon is-left">
//             <i className="fas fa-search" aria-hidden="true" />
//           </span>
//         </p>
//       </div>

//       <div className="panel-block">
//         <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
//           <div className="level-left">
//             <a
//               data-cy="century"
//               className="button mr-1"
//               href="#/people?centuries=16"
//             >
//               16
//             </a>

//             <a
//               data-cy="century"
//               className="button mr-1 is-info"
//               href="#/people?centuries=17"
//             >
//               17
//             </a>

//             <a
//               data-cy="century"
//               className="button mr-1 is-info"
//               href="#/people?centuries=18"
//             >
//               18
//             </a>

//             <a
//               data-cy="century"
//               className="button mr-1 is-info"
//               href="#/people?centuries=19"
//             >
//               19
//             </a>

//             <a
//               data-cy="century"
//               className="button mr-1"
//               href="#/people?centuries=20"
//             >
//               20
//             </a>
//           </div>

//           <div className="level-right ml-4">
//             <a
//               data-cy="centuryALL"
//               className="button is-success is-outlined"
//               href="#/people"
//             >
//               All
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="panel-block">
//         <a className="button is-link is-outlined is-fullwidth" href="#/people">
//           Reset all filters
//         </a>
//       </div>
//     </nav>
//   );
// };

// import { Link } from 'react-router-dom';
// import { Person } from '../types/Person';
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// interface PeopleFiltersProps {
//   persons: Person[];
//   onFilterChange: (filter: 'all' | 'male' | 'female') => void;
//   onClick: (century: number | "all" | null) => void;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

// }

// export const PeopleFilters: React.FC<PeopleFiltersProps> = ({ onFilterChange, onClick, onChange }) => {

//   const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
//   const [selectedCentury, setSelectedCentury] = useState<number | 'all' | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);

//   useEffect(() => {

//   })

//   const handleSelectedCentury = (century: number) => {
//       setSelectedCenturies(prevSelected => {
//           const isSelected = prevSelected.includes(century);
//           const newSelected = isSelected
//               ? prevSelected.filter(c => c !== century)
//               : [...prevSelected, century];

//           const params = new URLSearchParams(searchParams);
//           params.delete('century');
//           newSelected.forEach(c => params.append('century', c.toString()));
//           return newSelected;
//       });

//       onClick(selectedCenturies.includes(century) ? null : century);
//   };

//   const handleAllClick = () => {
//     setSelectedCentury(null);
//     setFilter('all');

//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.delete('century');
//     newSearchParams.delete('filter');
//     newSearchParams.set('filter', 'all');
//     setSearchParams(newSearchParams);
//     onClick(null);
// };

//   const handleResetFilters = () => {
//     setSelectedCentury(null);
//     setFilter('all');
//     setSearchQuery('');

//     const newSearchParams = new URLSearchParams();
//     newSearchParams.set('filter', 'all');

//     setSearchParams(newSearchParams);
//     onClick(null);
//   }

//   const handleFindPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);

//     const newSearchParams = new URLSearchParams(searchParams);
//     if (value) {
//       newSearchParams.set('search', value);
//     } else {
//       newSearchParams.delete('search');
//     }
//     setSearchParams(newSearchParams);

//     onChange(newSearchParams);

//   };

//     return (
//       <nav className="panel">
//         <p className="panel-heading">Filters</p>

//         <p className="panel-tabs" data-cy="SexFilter">
//           <Link
//             className={filter === 'all' ? 'is-active' : ''}
//             to="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setFilter('all');
//             }}
//           >
//             All
//           </Link>
//           <Link
//             className={filter === 'male' ? 'is-active' : ''}
//             to="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setFilter('male');
//             }}
//           >
//             Male
//           </Link>
//           <Link
//             className={filter === 'female' ? 'is-active' : ''}
//             to="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setFilter('female');
//             }}
//           >
//             Female
//           </Link>
//         </p>

//         <div className="panel-block">
//           <p className="control has-icons-left">
//             <input
//               data-cy="NameFilter"
//               type="search"
//               className="input"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleFindPerson}

//             />
//             <span className="icon is-left">
//               <i className="fas fa-search" aria-hidden="true" />
//             </span>
//           </p>
//         </div>

//         <div className="panel-block">
//           <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
//             <div className="level-left">
//               {[16, 17, 18, 19, 20].map((century) => (
//                 <a
//                 key={century}
//                 data-cy="century"
//                 className={`button mr-1 ${selectedCentury === century ? 'is-info' : ''}`}
//                 href={`/people?centuries=${century}`}
//                 onChange={(e) => {
//                   e.preventDefault();
//                   handleSelectedCentury(century);
//                 }}
//               >
//                 {century}
//               </a>
//               ))}
//             </div>

//             <div className="level-right ml-4">
//               <a
//                 data-cy="centuryALL"
//                 className="button is-success is-outlined"
//                 href="#/people" onClick={handleAllClick}
//               >
//                 All
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="panel-block">
//           <a className="button is-link is-outlined is-fullwidth" href="#/people"
//           onClick={(e) => {
//             e.preventDefault();
//             handleResetFilters();
//           }}>
//             Reset all filters
//           </a>
//         </div>
//       </nav>
//     );
//   };

import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import React, { useState, useEffect } from 'react';

interface PeopleFiltersProps {
  persons: Person[];
  onFilterChange: (filter: 'all' | 'male' | 'female') => void;

  onClick: (century: number | 'all' | null) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  onFilterChange,
  onClick,
  onChange,
}) => {
  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
  const [selectedCentury, setSelectedCentury] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentFilter = searchParams.get('filter') as
      | 'all'
      | 'male'
      | 'female';
    const currentSearch = searchParams.get('search') || '';

    if (currentFilter) {
      setFilter(currentFilter);
    } else {
      setFilter('all');
    }

    setSearchQuery(currentSearch);
  }, [searchParams]);

  // useEffect(() => {
  //   const currentFilter = searchParams.get('filter');
  //   const currentSearch = searchParams.get('search');
  //   const currentCentury = searchParams.getAll('century').map(Number);

  //   if (currentFilter === 'all' || currentFilter === 'male' || currentFilter === 'female') {
  //     setFilter(currentFilter);
  //   }

  //   if (currentSearch) {
  //     setSearchQuery(currentSearch);
  //   }

  //   if (currentCentury.length) {
  //     setSelectedCentury(currentCentury);
  //   }
  // }, []);

  // useEffect(() => {
  //   const newSearchParams = new URLSearchParams();
  //   if (filter !== 'all') {
  //     newSearchParams.set('filter', filter);
  //   }
  //   if (searchQuery) {
  //     newSearchParams.set('search', searchQuery);
  //   }
  //   if (selectedCentury.length) {
  //     selectedCentury.forEach(century => newSearchParams.append('century', century.toString()));
  //   }
  //   setSearchParams(newSearchParams);
  // }, [filter, searchQuery, selectedCentury]);

  const handleSelectedCentury = (century: number) => {
    const isSelected = selectedCentury.includes(century);

    const updatedCenturies = isSelected
      ? selectedCentury.filter(item => item !== century)
      : [...selectedCentury, century];

    setSelectedCentury(updatedCenturies);

    const params = new URLSearchParams(searchParams);

    params.delete('century');
    updatedCenturies.forEach(cent => params.append('century', cent.toString()));

    setSearchParams(params);
    onClick(century);
  };

  const handleAllClick = () => {
    setSelectedCentury([]);
    setFilter('all');

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('century');
    newSearchParams.delete('filter');
    newSearchParams.set('filter', 'all');

    setSearchParams(newSearchParams);
    onClick(null);
  };

  const handleResetFilters = () => {
    setSelectedCentury([]);
    setFilter('all');
    setSearchQuery('');

    const newSearchParams = new URLSearchParams();

    newSearchParams.set('filter', 'all');
    setSearchParams(newSearchParams);
    onClick(null);
  };

  const handleFilterGender = (genderFilter: 'male' | 'female' | 'all') => {
    setFilter(genderFilter);
    onFilterChange(genderFilter);

    const newSearchParams = new URLSearchParams(searchParams);

    if (genderFilter) {
      newSearchParams.set('sex', genderFilter);
    } else {
      newSearchParams.delete('sex');
    }

    setSearchParams(newSearchParams);
  };

  const handleFindPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchQuery(value);
    onChange(e);

    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={filter === 'all' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleFilterGender('all');
          }}
        >
          All
        </Link>
        <Link
          className={filter === 'male' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleFilterGender('male');
          }}
        >
          Male
        </Link>
        <Link
          className={filter === 'female' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleFilterGender('female');
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleFindPerson}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCentury.includes(century) ? 'is-info' : ''}`}
                href={`/people?century=${century}`}
                onClick={e => {
                  e.preventDefault();
                  handleSelectedCentury(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={handleAllClick}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={e => {
            e.preventDefault();
            handleResetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
