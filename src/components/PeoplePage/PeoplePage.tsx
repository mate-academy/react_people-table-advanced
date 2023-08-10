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
import { preparePeople } from '../../utils/preparePeople';

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

  const preparedPeople = useMemo(() => preparePeople(
    people,
    value,
    sex,
    centuries,
    sort,
    order,
  ), [people, value, sex, centuries, sort, order]);

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
    const newValue = !normalizedValue.length
      ? getSearchWith(searchParams, { value: null })
      : getSearchWith(searchParams, { value: normalizedValue });

    setSearchParams(newValue);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && (
              <PeopleFilters
                sex={sex}
                centuries={centuries}
                value={value}
                onAddCentury={onAddCentury}
                onChangeValue={onChangeValue}
              />
            )}
          </div>

          <div className="column">
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
