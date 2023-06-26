import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  filterBySex: string | null;
  filterByCenturies: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  filterBySex,
  filterByCenturies,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFilterQuery(value);

    if (!value) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('query', value);
    setSearchParams(searchParams);
  };

  const ceturyIsSelected = (century: string) => {
    return filterByCenturies.includes(century);
  };

  const getCenturyParams = (century: string) => {
    return {
      centuries: filterByCenturies.includes(century)
        ? filterByCenturies.filter(c => c !== century)
        : [...filterByCenturies, century],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': filterBySex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': filterBySex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': filterBySex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={filterQuery}
            onChange={onChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': ceturyIsSelected('16') },
              )}
              params={getCenturyParams('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': ceturyIsSelected('17') },
              )}
              params={getCenturyParams('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': ceturyIsSelected('18') },
              )}
              params={getCenturyParams('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': ceturyIsSelected('19') },
              )}
              params={getCenturyParams('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': ceturyIsSelected('20') },
              )}
              params={getCenturyParams('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': filterByCenturies.length },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
