/* eslint-disable no-console */

import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { PeopleContext } from '../store/PeopleContext';
import { PersonSexType } from '../types/PersonSexType';

export const PeopleFilters = () => {
  const { people, setFilteredPeople } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const [searchName, setSearchName] = useState('');

  const navigate = useNavigate();

  const getCenturiesParams = (century: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (century === 'all' && newParams.getAll('centuries')) {
      newParams.delete('centuries');
    } else {
      const currentCenturies = newParams.getAll('centuries');

      newParams.delete('centuries');

      const updatedCenturies = currentCenturies.includes(century)
        ? currentCenturies.filter(c => c !== century)
        : [...currentCenturies, century];

      updatedCenturies.forEach(c => newParams.append('centuries', c));
    }

    if (slug) {
      return `/people/${slug}?${newParams.toString()}`;
    }

    return `/people?${newParams.toString()}`;
  };

  const showSelectedCentury = (filter: string): boolean => {
    const centuries = searchParams.getAll('centuries');

    if (filter === 'all') {
      return centuries.length === 0;
    }

    return centuries.includes(filter);
  };

  const getSexParams = (sex?: PersonSexType) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sex) {
      newParams.set('sex', sex);
    } else {
      newParams.delete('sex');
    }

    if (slug) {
      return `/people/${slug}?${newParams.toString()}`;
    }

    return `/people?${newParams.toString()}`;
  };

  const showSexFilterSelected = (sex?: PersonSexType) => {
    const sexParam = searchParams.get('sex');

    if (sex) {
      return sexParam === sex;
    }

    return sexParam === null;
  };

  const getResetedFiltersUrl = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('centuries');
    newParams.delete('sex');
    // newParams.delete('query');

    if (slug) {
      return `/people/${slug}?${newParams.toString()}`;
    }

    return `/people?${newParams.toString()}`;
  };

  const onHandleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setSearchName(newValue);

    const newParams = new URLSearchParams(searchParams.toString());

    if (newValue) {
      newParams.set('query', newValue);
    } else {
      newParams.delete('query');
    }

    navigate(
      slug
        ? `/people/${slug}?${newParams.toString()}`
        : `/people?${newParams.toString()}`,
      { replace: true },
    );
  };

  useEffect(() => {
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query') || '';

    const filtered = people.filter(person => {
      const century = Math.floor(person.born / 100) + 1;

      const matchCentury =
        centuries.length === 0 || centuries.includes(century.toString());

      const matchSex =
        !sex ||
        (sex === 'male' && person.sex === 'm') ||
        (sex === 'female' && person.sex === 'f');

      const matchQuery =
        person.name.includes(query) ||
        person.fatherName?.includes(query) ||
        person.motherName?.includes(query);

      return matchCentury && matchSex && matchQuery;
    });

    setFilteredPeople(filtered);
  }, [people, searchParams, setFilteredPeople]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': showSexFilterSelected(),
          })}
          to={getSexParams()}
        >
          All
        </Link>
        <Link
          className={cn({
            'is-active': showSexFilterSelected('male'),
          })}
          to={getSexParams('male')}
        >
          Male
        </Link>
        <Link
          className={cn({
            'is-active': showSexFilterSelected('female'),
          })}
          to={getSexParams('female')}
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
            value={searchName}
            onChange={onHandleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': showSelectedCentury('16'),
              })}
              to={getCenturiesParams('16')}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': showSelectedCentury('17'),
              })}
              to={getCenturiesParams('17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': showSelectedCentury('18'),
              })}
              to={getCenturiesParams('18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': showSelectedCentury('19'),
              })}
              to={getCenturiesParams('19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': showSelectedCentury('20'),
              })}
              to={getCenturiesParams('20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-success': showSelectedCentury('all'),
              })}
              to={getCenturiesParams('all')}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getResetedFiltersUrl()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
