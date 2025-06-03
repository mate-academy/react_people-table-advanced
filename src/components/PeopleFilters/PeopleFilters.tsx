import React from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { text } from '../../constants/text';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries') || [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('query', event.target.value);

    setSearchParams(searchParams);
  };

  const getCenturyLink = (century: string) => {
    const updatedCenturies = [...selectedCenturies];
    const otherParams = new URLSearchParams(searchParams);

    if (updatedCenturies.includes(century)) {
      otherParams.delete('centuries');
      updatedCenturies
        .filter(upCentury => upCentury !== String(century))
        .forEach(upCentury => otherParams.append('centuries', upCentury));
    } else {
      otherParams.append('centuries', century);
    }

    return `/people?${otherParams.toString()}`;
  };

  const centuries = [16, 17, 18, 19, 20];

  const searchValue = searchParams.get('query') ?? '';
  const isSex = searchParams.get('sex');

  const getNewParams = (key: string, param?: string) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete(key);

    if (param) {
      updatedParams.set(key, param);
    }

    return `/people?${updatedParams.toString()}`;
  };

  const getLinkWithoutFilters = () => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete('query');
    updatedParams.delete('sex');
    updatedParams.delete('centuries');

    return `people?${updatedParams.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">{text.filters}</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={classNames({
            'is-active': isSex !== 'm' && isSex !== 'f',
          })}
          to={getNewParams('sex')}
        >
          {text.all}
        </NavLink>
        <NavLink
          className={classNames({ 'is-active': isSex === 'm' })}
          to={getNewParams('sex', 'm')}
        >
          {text.male}
        </NavLink>
        <NavLink
          className={classNames({ 'is-active': isSex === 'f' })}
          to={getNewParams('sex', 'f')}
        >
          {text.female}
        </NavLink>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={searchValue}
            onChange={handleChange}
            className="input"
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
            {centuries.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(String(century)),
                })}
                to={getCenturyLink(String(century))}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success is-outlined': selectedCenturies.length === 0,
              })}
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getLinkWithoutFilters()}
        >
          {text.resetAllFilters}
        </Link>
      </div>
    </nav>
  );
};
