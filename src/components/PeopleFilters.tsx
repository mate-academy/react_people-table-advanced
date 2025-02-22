import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  handleFilter: () => Person[];
};

export const PeopleFilters: React.FC<Props> = ({ handleFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('century');

  const handleClick = (param: string, name: string | null) => {
    if (param === 'sex') {
      if (!name) {
        params.delete(param);
        setSearchParams(params);
        handleFilter();

        return;
      }

      params.set(param, name);
      setSearchParams(params);

      handleFilter();
    }

    if (param === 'century') {
      const arrCentury = searchParams.getAll('century');

      if (name && arrCentury.includes(name)) {
        const newArray = arrCentury.filter(item => item !== name);

        params.delete(param);
        setSearchParams(params);

        newArray.forEach(e => {
          params.append(param, e);
          setSearchParams(params);
          handleFilter();
        });

        return;
      }

      if (name) {
        params.append(param, name);
        setSearchParams(params);
        handleFilter();
      }
    }
  };

  const handleOnChancge = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    params.set('query', newValue);
    setSearchParams(params);
    handleFilter();

    if (!newValue) {
      params.delete('query');
      setSearchParams(params);
      handleFilter();
    }
  };

  const centuryALL = () => {
    params.delete('century');
    setSearchParams(params);
    handleFilter();
  };

  const getIsActiveButton = (num: string) => century.includes(num);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          onClick={() => handleClick('sex', null)}
          aria-label="Sort by Name"
          className={classNames({
            'custom-active-style': !sex,
            'custom-style': sex,
          })}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => handleClick('sex', 'm')}
          aria-label="Sort by Name"
          className={classNames({
            'custom-active-style': sex === 'm',
            'custom-style': sex !== 'm',
          })}
        >
          Male
        </button>
        <button
          type="button"
          onClick={() => handleClick('sex', 'f')}
          aria-label="Sort by Name"
          className={classNames({
            'custom-active-style': sex === 'f',
            'custom-style': sex !== 'f',
          })}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleOnChancge}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              type="button"
              onClick={() => handleClick('century', '16')}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getIsActiveButton('16'),
              })}
            >
              16
            </button>

            <button
              type="button"
              onClick={() => handleClick('century', '17')}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getIsActiveButton('17'),
              })}
            >
              17
            </button>

            <button
              type="button"
              onClick={() => handleClick('century', '18')}
              data-cy="century"
              // className="button mr-1"
              className={classNames('button mr-1', {
                'is-info': getIsActiveButton('18'),
              })}
            >
              18
            </button>

            <button
              type="button"
              onClick={() => handleClick('century', '19')}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getIsActiveButton('19'),
              })}
            >
              19
            </button>

            <button
              type="button"
              onClick={() => handleClick('century', '20')}
              data-cy="century"
              // className="button mr-1"
              className={classNames('button mr-1', {
                'is-info': getIsActiveButton('20'),
              })}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': century.length,
              })}
              onClick={centuryALL}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
