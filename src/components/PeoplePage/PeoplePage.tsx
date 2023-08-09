import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const value = searchParams.get('value') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterByValue = (peopleForFilter: Person[]) => {
    const normalizedValue = value.toLowerCase().trim();

    return peopleForFilter.filter(person => (
      person.name.toLowerCase().includes(normalizedValue)
    ));
  };

  const filterBySex = (peopleForFilter: Person[]) => (
    peopleForFilter.filter(person => person.sex === sex)
  );

  const filterByCenturies = (peopleForFilter: Person[]) => (
    peopleForFilter.filter(person => (
      centuries.includes(Math.ceil(person.died / 100).toString())
    ))
  );

  const sortPeople = (a: Person, b: Person): number => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  };

  const sortBy = (sortedPeople: Person[]) => {
    switch (order) {
      case '':
        return sortedPeople.sort(sortPeople);

      case 'desc':
        return sortedPeople.sort(sortPeople).reverse();

      default:
        return sortedPeople;
    }
  };

  const preparedPeople = useMemo(() => {
    let mapedPeople: Person[] = people.map(person => {
      const mother = people.find(findPerson => (
        findPerson.name === person.motherName
      ));

      const father = people.find(findPerson => (
        findPerson.name === person.fatherName
      ));

      return { ...person, mother, father };
    });

    if (value.length !== 0) {
      mapedPeople = filterByValue(mapedPeople);
    }

    if (sex !== '') {
      mapedPeople = filterBySex(mapedPeople);
    }

    if (centuries.length !== 0) {
      mapedPeople = filterByCenturies(mapedPeople);
    }

    if (sort !== '') {
      mapedPeople = sortBy(mapedPeople);
    }

    return mapedPeople;
  }, [people, value, centuries, sex, sort, order]);

  const onAddCentury = (str: string) => {
    const newCenturies = centuries.includes(str)
      ? centuries.filter(century => century !== str)
      : [...centuries, str];

    return { centuries: newCenturies };
  };

  const onSortBy = (sortType: string) => {
    const firstClick = sortType !== sort;
    const secondClick = sortType === sort && order === '';
    const thirdClick = sortType === sort && order === 'desc';

    switch (true) {
      case firstClick:
        return { sort: sortType, order: null };

      case secondClick:
        return { sort: sortType, order: 'desc' };

      case thirdClick:
        return { sort: null, order: null };

      default:
        throw new Error('Wrong parameters');
    }
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.trim();
    const newValue = getSearchWith(searchParams, { value: normalizedValue });

    setSearchParams(newValue);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sex={sex}
              centuries={centuries}
              value={value}
              onAddCentury={onAddCentury}
              onChangeValue={onChangeValue}
            />
          </div>

          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!!error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && preparedPeople.length !== 0 && (
                <PeopleTable
                  people={preparedPeople}
                  sort={sort}
                  order={order}
                  onSortBy={onSortBy}
                />
              )}

              {!isLoading && !error && !preparedPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
