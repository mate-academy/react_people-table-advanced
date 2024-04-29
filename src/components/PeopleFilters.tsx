import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { usePeopleDispatch, usePeopleState } from '../store/PeopleContext';
import { getExistingCenturies } from '../services/getExistingCenturies';
import { Action } from '../types/Action';

export const PeopleFilters = () => {
  const { people } = usePeopleState();
  const dispatch = usePeopleDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const q = searchParams.get('q') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line
    dispatch: (Action: Action<string>) => void,
  ) => {
    dispatch({ type: 'SET_FILTERED_ERROR', payload: '' });

    const newSearchParams = new URLSearchParams(searchParams);
    const query = e.target.value;

    if (query) {
      newSearchParams.set('q', query);
    } else {
      newSearchParams.delete('q');
    }

    setSearchParams(newSearchParams);
  };

  const handleSexChange = (sex: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (sex) {
      newSearchParams.set('sex', sex);
    } else {
      newSearchParams.delete('sex');
    }

    setSearchParams(newSearchParams);
  };

  const toggleCenturies = (century: number) => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter(c => c !== century.toString())
      : [...centuries, century];

    newCenturies.forEach(c => params.append('centuries', c.toString()));

    setSearchParams(params);
  };

  const handleAllFiltersClear = () => {
    setSearchParams({});
    dispatch({ type: 'SET_FILTERED_ERROR', payload: '' });
  };

  const clearCenturies = () => setSearchParams({ centuries: [] });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          className={cn('button', {
            'is-info': !sex,
          })}
          onClick={() => handleSexChange('')}
        >
          All
        </button>

        <button
          className={cn('button', {
            'is-success': sex === 'm',
          })}
          onClick={() => handleSexChange('m')}
        >
          Male
        </button>

        <button
          className={cn('button', {
            'is-danger': sex === 'f',
          })}
          onClick={() => handleSexChange('f')}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={q}
            onChange={e => handleQueryChange(e, dispatch)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {getExistingCenturies(people).map((century: number) => (
              <button
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                onClick={() => toggleCenturies(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={cn('button', {
                'is-success': !centuries.length,
              })}
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleAllFiltersClear}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
