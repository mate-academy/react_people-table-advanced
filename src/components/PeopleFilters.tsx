import { useContext, useEffect } from "react";
import { useSearchParams, NavLink, Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { PeopleContext } from "../App";

export const PeopleFilters = ({
  setChosenCentury,
  setChosenSex,
  setFilteringType,
  enteredText,
  setEnteredText,
  setSearchParams,
}) => {
  const searchParamsHelper = (params) => {
    const params = new URLSearchParams();
    params.set(query, value)
  };

  const handleInput = (e) => {
    setEnteredText(e.target.value);
    setFilteringType('by_text');
    const params = new URLSearchParams();

    params.set('query', e.target.value);
    setSearchParams(params);
    console.log(searchParams)
  };

  const handleSex = (sexType) => {
    setChosenSex(sexType);
    setFilteringType('by_sex');
    const params = new URLSearchParams();

    params.set('sex', sexType);
    setSearchParams(params);
  };

  const arrayOfPeople = useContext(PeopleContext);
  const location = useLocation();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          onClick={() => {
            setFilteringType('');
          }}
          href="#/people"

        >
          All
        </a>
        <a
          onClick={() => handleSex('m')}
          href="#/people?sex=m"
        >
          Male
        </a>
        <a
          onClick={() => handleSex('f')}
          href="#/people?sex=f"
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleInput}
            value={enteredText}
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
            <a
              onClick={() => {
                setChosenCentury(16);
                setFilteringType('by_century');
              }}
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              onClick={() => {
                setChosenCentury(17);
                setFilteringType('by_century');
              }}
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              onClick={() => {
                setChosenCentury(18);
                setFilteringType('by_century');
              }}
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              onClick={() => {
                setChosenCentury(19);
                setFilteringType('by_century');
              }}
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              onClick={() => {
                setChosenCentury(20);
                setFilteringType('by_century');
              }}
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              onClick={() => {
                setFilteringType('');
              }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={() => {
            setFilteringType('');
          }}
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
