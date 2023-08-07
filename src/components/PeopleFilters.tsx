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
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries === '16',
              })}
              onClick={() => centuriesClickHandler(Centuries.sixteen)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries === '17',
              })}
              onClick={() => centuriesClickHandler(Centuries.seventeen)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries === '18',
              })}
              onClick={() => centuriesClickHandler(Centuries.eighteen)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries === '19',
              })}
              onClick={() => centuriesClickHandler(Centuries.nineteen)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries === '20',
              })}
              onClick={() => centuriesClickHandler(Centuries.twenty)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-outlined', {
                'is-success': centuries === ''
                || (centuries !== '16'
                && centuries !== '17'
                && centuries !== '18'
                && centuries !== '19'
                && centuries !== '20'),
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
