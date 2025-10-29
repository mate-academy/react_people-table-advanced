import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

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

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loaded => {
        if (isCancelled) {
          return;
        }

        const byName = new Map<string, Person>();

        loaded.forEach(p => byName.set(p.name, { ...p }));

        const withParents = loaded.map(p => {
          const person = byName.get(p.name)!;

          const mother = p.motherName ? byName.get(p.motherName) : undefined;
          const father = p.fatherName ? byName.get(p.fatherName) : undefined;

          return {
            ...person,
            mother,
            father,
          } as Person;
        });

        setPeople(withParents);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setHasError(true);
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const selectedSlug = useMemo(() => slug, [slug]);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable people={people} selectedSlug={selectedSlug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
