import classNames from 'classnames';
import React, { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const filterTitle = searchParams.get('title') ?? '';
  const centuries = searchParams.getAll('century');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSexFilter = (sex: string) => () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (sex) {
        newParams.set('sex', sex);
      } else {
        newParams.delete('sex');
      }

      return newParams;
    });
  };

  const handleTitleFilter: ChangeEventHandler<HTMLInputElement> = event => {
    const title = event.target.value;

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.set('title', title);

      return newParams;
    });
  };

  const handleFilterCentury = (century: string) => () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.delete('century');

      if (centuries.includes(century)) {
        centuries
          .filter(cen => cen !== century)
          .forEach(element => newParams.append('century', element));
      } else {
        [...centuries, century].forEach(element =>
          newParams.append('century', element),
        );
      }

      return newParams;
    });
  };

  const handleResetFilters = () => {
    setSearchParams({});
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
            value={filterTitle}
            onChange={handleTitleFilter}
            placeholder="Search"
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
              onClick={handleFilterCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={handleFilterCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={handleFilterCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={handleFilterCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={handleFilterCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button', {
                'is-outlined':
                  sex || filterTitle !== '' || centuries.length > 0,
                'is-success':
                  !sex && filterTitle === '' && centuries.length === 0,
              })}
              onClick={handleResetFilters}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={handleResetFilters}
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
