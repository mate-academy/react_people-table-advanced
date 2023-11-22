import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SortParams } from '../types/SortParams';

interface FilterValues {
  sex: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
  query: string;
}

function filterPeople(people: Person[], filterParam: FilterValues): Person[] {
  let filteredpeople = people;
  const {
    sex,
    centuries,
    sort,
    order,
    query,
  } = filterParam;

  if (query) {
    const normalyzeQuery = query.trim().toLowerCase();

    filteredpeople = filteredpeople.filter(person => {
      const { name, fatherName, motherName } = person;

      return name.toLowerCase().includes(normalyzeQuery)
      || fatherName?.toLowerCase().includes(normalyzeQuery)
      || motherName?.toLowerCase().includes(normalyzeQuery);
    });
  }

  if (sex) {
    switch (sex) {
      case 'm':
        filteredpeople = filteredpeople.filter(person => person.sex === sex);
        break;

      case 'f':
        filteredpeople = filteredpeople.filter(person => person.sex === sex);
        break;

      default:
        break;
    }
  }

  if (centuries.length) {
    filteredpeople = filteredpeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort) {
    switch (sort) {
      case SortParams.NAME:
        filteredpeople = filteredpeople
          .sort((personA, personB) => personA.name.localeCompare(personB.name));
        break;

      case SortParams.SEX:
        filteredpeople = filteredpeople
          .sort((personA, personB) => personA.sex.localeCompare(personB.sex));
        break;

      case SortParams.BORN:
        filteredpeople = filteredpeople
          .sort((personA, personB) => personA.born - personB.born);
        break;

      case SortParams.DIED:
        filteredpeople = filteredpeople
          .sort((personA, personB) => personA.died - personB.died);
        break;

      default:
        break;
    }
  }

  if (order) {
    filteredpeople.reverse();
  }

  return filteredpeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isload, setIsLoad] = useState(true);
  const [shownError, setShownError] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then((data) => {
        setPeople(data);
        if (!data.length) {
          setShownError('There are no people on the server');
        }
      })
      .catch((error) => {
        setShownError('Something went wrong');
        throw error;
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, []);

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';

  const filteredPeople = filterPeople(
    [...people],
    {
      sex,
      centuries,
      sort,
      order,
      query,
    },
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isload && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isload && <Loader /> }

              {shownError.includes('went wrong') && (
                <p data-cy="peopleLoadingError">
                  {shownError}
                </p>
              )}

              {shownError.includes('no people on the server') && (
                <p data-cy="noPeopleMessage">
                  {shownError}
                </p>
              )}

              {!filteredPeople.length && !isload ? (
                <p>
                  There are no people matching the current search criteria
                </p>
              ) : (
                filteredPeople.length > 0
                && <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
