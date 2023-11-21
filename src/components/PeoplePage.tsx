import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

interface FilterParams {
  sex: string | null,
  centuries: string[] | null,
  input: string | null,
  sort: keyof Person | null,
  order: string | null,
}

type Prepare = (
  people: Person[],
  filterParams: FilterParams,
) => Person[];

const preparePeople: Prepare = (people, {
  sex,
  centuries,
  input,
  sort,
  order,
}) => {
  return people
    .map((person) => {
      return {
        ...person,
        motherName: person.motherName || '-',
        fatherName: person.fatherName || '-',
        mother: people.find(mother => mother.name === person.motherName),
        father: people.find(father => father.name === person.fatherName),
      };
    })

    .filter(person => {
      const isSexValid = sex === null ? true : person.sex === sex;

      const isCenturyValid = centuries === null || !centuries?.length
        ? true
        : centuries.includes(Math.ceil(person.born / 100).toString());

      const isNameValid = input === null
        ? true
        : person.name.toLowerCase().includes(input.toLowerCase());

      return isSexValid && isCenturyValid && isNameValid;
    })
    .sort((person1, person2) => {
      if (sort) {
        const field1 = person1[sort];
        const field2 = person2[sort];

        if (typeof field1 === 'number' && typeof field2 === 'number') {
          return order === null
            ? field1 - field2
            : field2 - field1;
        }

        if (typeof field1 === 'string' && typeof field2 === 'string') {
          return order === null
            ? field1.localeCompare(field2)
            : field2.localeCompare(field1);
        }
      }

      return 0;
    });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const preparedPeople = useMemo(() => {
    const filterParams: FilterParams = {
      sex: searchParams.get('sex'),
      centuries: searchParams.getAll('centuries'),
      input: searchParams.get('input'),
      sort: searchParams.get('sort') as keyof Person,
      order: searchParams.get('order'),
    };

    return preparePeople(people, filterParams);
  }, [searchParams, people]);

  const isDataEmpty = useMemo(() => {
    return !isError && !isLoading && preparedPeople.length === 0;
  }, [isError, isLoading, preparedPeople]);

  const isDataPrepared = useMemo(() => {
    return !isError && !isLoading && preparedPeople.length > 0;
  }, [isError, isLoading, preparedPeople]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(data => {
        setPeople(preparePeople(
          data,
          {
            sex: null, centuries: null, input: null, sort: null, order: null,
          },
        ));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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

              {isLoading && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isDataEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {isDataPrepared && (
                <PeopleTable people={preparedPeople} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
