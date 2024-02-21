import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Param } from '../types/Param';

const sortingPeople = (list: Person[], sorter: Param, order?: string) => {
  return list.sort((a: Person, b: Person) => {
    if (order?.length === 0) {
      switch (sorter) {
        case 'name':
        case 'sex':
          return a[sorter].localeCompare(b[sorter]);
        case 'born':
        case 'died':
          return a[sorter] - b[sorter];
        default:
          return 0;
      }
    }

    switch (sorter) {
      case 'name':
      case 'sex':
        return b[sorter].localeCompare(a[sorter]);
      case 'born':
      case 'died':
        return b[sorter] - a[sorter];
      default:
        return 0;
    }
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [peopleError, setPeopleError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(pep => {
        if (pep.length <= 0) {
          setPeopleError(true);
        }

        setPeople(pep);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filterBySex = sex.length !== 0
    ? people.filter(person => person.sex === sex)
    : people;

  const filteredByCentury = century.length > 0 ? filterBySex.filter(person => {
    return century.includes(`${Math.ceil(person.born / 100)}`);
  }) : filterBySex;

  const filteredPeople = filteredByCentury.filter(person => {
    return person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query);
  });

  const finalSort = sortingPeople(filteredPeople, sort, order);

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
              {finalSort.length === 0 && !loader
                ? (
                  <>
                    {error && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}
                    {peopleError ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    ) : (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}
                  </>
                )
                : (
                  <>

                    {loader && <Loader />}

                    {!loader && <PeopleTable people={finalSort} />}

                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
