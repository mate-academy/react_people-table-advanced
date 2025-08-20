import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = { isLoaded: boolean };

export const PeopleFilters: React.FC<Props> = ({ isLoaded }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const [activeLink, setActiveLink] = useState('all');
  const [isAllReseted, setIsAllReseted] = useState<boolean>(true);
  const [input, setInput] = useState<string>('');

  if (!isLoaded) {
    return null;
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    setInput(e.target.value);

    if (e.target.value.length !== 0) {
      params.set('query', e.target.value.trim().toLowerCase());
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleLinkSelection(sex: string) {
    const params = new URLSearchParams(searchParams);

    setActiveLink(sex);

    params.set('sex', sex);
    setSearchParams(params);
  }

  function clearAll() {
    setInput('');
    setSearchParams('');
    setActiveLink('all');
    setIsAllReseted(true);
  }

  async function toggleCenturies(x: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(x)
      ? centuries.filter(y => y !== x)
      : [...centuries, x];

    params.delete('centuries');
    await newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': activeLink === 'all' })}
          onClick={() => handleLinkSelection('all')}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': activeLink === 'male' })}
          onClick={() => handleLinkSelection('male')}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': activeLink === 'female' })}
          onClick={() => handleLinkSelection('female')}
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
            onChange={e => handleQueryChange(e)}
            value={input}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(currentCentury => (
              <SearchLink
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(currentCentury.toString()),
                })}
                params={{
                  century: centuries.includes(currentCentury)
                    ? centuries.filter(curr => curr !== currentCentury)
                    : [...centuries, currentCentury],
                }}
                key={currentCentury}
                onClick={() => {
                  toggleCenturies(currentCentury);
                }}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': isAllReseted === true,
          })}
          onClick={() => clearAll()}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
