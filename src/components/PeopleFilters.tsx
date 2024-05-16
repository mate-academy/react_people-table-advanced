import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { usePeople } from '../providers/PeopleProvider';
import { ChangeEvent, useEffect, useState } from 'react';

export const PeopleFilters = () => {
  const [, setSearchParams] = useSearchParams();
  const {
    filters: { sex, centuries, q },
  } = usePeople();
  const [value, setValue] = useState(q);

  useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (value) {
        newParams.set('q', value);
      } else {
        newParams.delete('q');
      }

      return newParams;
    });
  }, [value]);

  const handleSexFilter = (sex: string) => () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (sex) {
        newParams.set('sex', sex);
      } else {
        newParams.delete('sex');
      }

      return newParams;
    });
  };

  const handleSearchFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  const handleCenturySelectionFilter = (century: string) => () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      const centuries = newParams.getAll('century');

      newParams.delete('century');

      if (centuries.includes(century)) {
        centuries
          .filter(c => c !== century)
          .forEach(el => newParams.append('century', el));
      } else {
        [...centuries, century].forEach(el => newParams.append('century', el));
      }

      return newParams;
    });
  };

  const handleResetCenturies = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('century');

      return newParams;
    });
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setValue('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sex })}
          onClick={handleSexFilter('')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={handleSexFilter('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={handleSexFilter('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleSearchFilter}
            value={value}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={handleCenturySelectionFilter('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={handleCenturySelectionFilter('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={handleCenturySelectionFilter('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={handleCenturySelectionFilter('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={handleCenturySelectionFilter('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleResetCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
