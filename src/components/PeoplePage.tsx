import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [ErrorType, setErrorType] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder,setSortOrder]= useState<'asc'|'desc'|null>(null)
  const [genderFilter, setGenderFilter] = useState<'m'|'f' | null>(null)
  const [centuries, setCenturies] = useState<number[]>([]);
const[input, setInput]=useState<string>('')

const sortedPeople = useMemo(() => {
  let filtered = [...peoples];


  if (genderFilter === 'm') {
    filtered = filtered.filter((person) => person.sex === 'm');
  } else if (genderFilter === 'f') {
    filtered = filtered.filter((person) => person.sex === 'f');
  }

  if (input.length > 0) {
    filtered = filtered.filter((person)=> person.name.toLowerCase().includes(input.toLowerCase()))
    }
  // 🔸 (пізніше додаси фільтр по століттях і пошуку сюди)
  if (centuries.length > 0) {

    filtered = filtered.filter((person) => {
      const century = Math.ceil(person.born / 100);
      return centuries.includes(century)
    })
}
  // 🔸 сортування
  if (sortBy && sortOrder) {
    filtered.sort((a, b) => {
      let result = 0;

      if (sortBy === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (sortBy === 'sex') {
        result = a.sex.localeCompare(b.sex);
      } else if (sortBy === 'born') {
        result = a.born - b.born;
      } else if (sortBy === 'died') {
        result = a.died - b.died;
      }

      return sortOrder === 'asc' ? result : -result;
    });
  }

  return filtered;
}, [peoples, sortBy, sortOrder, genderFilter,input,centuries]);


  useEffect(() => {
    setErrorType(false);
    setIsloading(true);
    getPeople()
      .then(data => {
        const cleaned = data.map(person => ({
          ...person,
          name: person.name.trim(),
          motherName: person.motherName?.trim(),
          fatherName: person.fatherName?.trim(),
        }));

        setPeoples(cleaned);
      })
      .catch(() => {
        setErrorType(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                {!isLoading && <PeopleFilters genderFilter={genderFilter} setCenturies={setCenturies}
                centuries={centuries}  setInput={setInput} input={input} setGenderFilter={setGenderFilter} />}
              </div>

              <div className="column">
                <div className="box table-container">
                  {isLoading && <Loader />}

                  {ErrorType && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {peoples.length === 0 && !isLoading && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {input.length > 0 && sortedPeople.length ===0  && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {!isLoading && sortedPeople.length>0 && <PeopleTable sortBy ={sortBy} peoples={peoples} sortOrder={sortOrder} setSortBy={setSortBy} sortPeople={ sortedPeople} setSortOrder={setSortOrder} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
