/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { Sex } from '../types/Sex';
import { Centuries } from '../types/Centuries';

type Props = {
  sex: Sex,
  sexClickHandler: (sex: Sex) => void;
  query: string,
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  centuries: Centuries;
  centuriesClickHandler: (centuries: Centuries) => void;
  deleteFilters: () => void;
};

export const PeopleFilters:React.FC<Props> = ({
  sex,
  sexClickHandler,
  query,
  inputHandler,
  centuries,
  centuriesClickHandler,
  deleteFilters,
}) => {
  const centuriesArray = [Centuries.sixteen, Centuries.seventeen, Centuries.eighteen, Centuries.nineteen,
    Centuries.twenty];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': sex === '',
          })}
          onClick={() => sexClickHandler(Sex.all)}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={() => sexClickHandler(Sex.male)}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={() => sexClickHandler(Sex.female)}
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
            value={query}
            onChange={inputHandler}
          />
          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              // onClick={deleteQuery}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(century => (
              <a
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries === century,
                })}
                onClick={() => centuriesClickHandler(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-outlined', {
                'is-success': centuries === Centuries.none,
              })}
              onClick={() => centuriesClickHandler(Centuries.none)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={deleteFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
