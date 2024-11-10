import classNames from "classnames";
import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  sex: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({ sex, centuries }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const defaultNameValue = searchParam.get('name') || '';

  const sexActive = ({ isActive, type }: { isActive: string; type: string }) =>
    classNames({
      'is-active': isActive === type,
    });

  const allClass = classNames({
    'is-outlined': centuries.length > 0, // Add 'is-outlined' if any centuries are selected
  });

  const centuryButtonClass = (value: string) =>
    classNames('button mr-1', {
      'is-info': centuries.includes(value), // Add 'is-info' if century is selected
    });

  const handleSexInput = (type: string) => {
    const params = new URLSearchParams(searchParam);

    if (type) {
      params.set('sex', type);
    } else {
      // Remove the 'sex' parameter if 'All' is selected
      params.delete('sex');
    }

    setSearchParam(params);
  };

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParam);

    params.set('name', event.target.value.trim().toLowerCase());

    if (!event.target.value.trim().length) params.delete('name');
    setSearchParam(params);
  };

  const addCenturies = (value: string) => {
    const params = new URLSearchParams(searchParam);

    const newCenturies = centuries.includes(value)
      ? centuries.filter(el => el !== value)
      : [...centuries, value];

    params.delete('centuries');
    newCenturies.forEach(el => params.append('centuries', el));
    setSearchParam(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParam);
    params.delete('centuries');

    setSearchParam(params);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParam);
    params.delete('centuries');
    params.delete('name');
    params.delete('sex');

    setSearchParam(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a onClick={() => handleSexInput('')} className={sexActive({ isActive: sex, type: '' })}>
          All
        </a>
        <a onClick={() => handleSexInput('m')} className={sexActive({ isActive: sex, type: 'm' })}>
          Male
        </a>
        <a onClick={() => handleSexInput('f')} className={sexActive({ isActive: sex, type: 'f' })}>
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleNameFilter}
            defaultValue={defaultNameValue}
            data-cy="NameFilter"
            type="search"
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
            {['16', '17', '18', '19', '20'].map((century) => (
              <a
                key={century}
                onClick={() => addCenturies(century)}
                data-cy="century"
                className={centuryButtonClass(century)} // Use the variable for the class logic
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              onClick={clearCenturies}
              data-cy="centuryALL"
              className={classNames('button is-success', allClass)} // Dynamically add 'is-outlined' based on `centuries`
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a onClick={reset} className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
