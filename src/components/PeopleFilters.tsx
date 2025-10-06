import React from 'react';
import { Sex } from '../pages/PeoplePage';
import classNames from 'classnames';

export enum Century {
  Sixteenth = 16,
  Seventeenth = 17,
  Eighteenth = 18,
  Nineteenth = 19,
  Twentieth = 20,
}

type Props = {
  selectedCenturies: number[];
  setSelectedCenturies: React.Dispatch<React.SetStateAction<number[]>>;
  sortBySex: Sex;
  setSortBySex: React.Dispatch<React.SetStateAction<Sex>>;
  sortByQuery: string;
  setSortByQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const PeopleFilters: React.FC<Props> = ({
  selectedCenturies,
  setSelectedCenturies,
  sortBySex,
  setSortBySex,
  sortByQuery,
  setSortByQuery,
}) => {
  const handleCenturyContainerClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;

    if (target.matches('[data-cy="century"]')) {
      const century = Number(target.textContent);

      setSelectedCenturies(prev =>
        prev.includes(century)
          ? prev.filter(c => c !== century)
          : [...prev, century],
      );
    }
  };

  const getCenturyClass = (century: number) =>
    classNames('button mr-1', {
      'is-info': selectedCenturies.includes(century),
    });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sortBySex === 'all' })}
          onClick={() => setSortBySex('all')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sortBySex === 'm' })}
          onClick={() => setSortBySex('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sortBySex === 'f' })}
          onClick={() => setSortBySex('f')}
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
            value={sortByQuery}
            onChange={e => setSortByQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left" onClick={handleCenturyContainerClick}>
            {Object.values(Century)
              .filter(value => typeof value === 'number')
              .map(c => (
                <a
                  key={c}
                  data-cy="century"
                  className={getCenturyClass(Number(c))}
                >
                  {c}
                </a>
              ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() =>
                setSelectedCenturies(Object.values(Century).map(Number))
              }
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSelectedCenturies([]);
            setSortBySex('all');
            setSortByQuery('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
