import { useSearchParams } from 'react-router-dom';
// Припускається, що getSearchWith знаходиться в '../utils/searchHelper'
// і працює з URLSearchParams або створює їх
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import React, { useCallback } from 'react'; // Додано useCallback для оптимізації

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesArr = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // getSearchWith має повертати URLSearchParams або SearchParams
    const newSearchParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSearchParams);
  };

  // Ця функція тепер буде генерувати URLSearchParams об'єкт
  const getSexSearchParams = useCallback(
    (newSex: string | null) => {
      const newParams = new URLSearchParams(searchParams); // Копіюємо поточні параметри

      if (newSex) {
        newParams.set('sex', newSex);
      } else {
        newParams.delete('sex');
      }

      return newParams;
    },
    [searchParams],
  );

  const getCenturySearchParams = useCallback(
    (centuryToToggle: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (centuries.includes(centuryToToggle)) {
        const updatedCenturies = centuries.filter(c => c !== centuryToToggle);

        newParams.delete('centuries');
        updatedCenturies.forEach(c => newParams.append('centuries', c));
      } else {
        newParams.append('centuries', centuryToToggle);
      }

      return newParams;
    },
    [searchParams, centuries],
  );

  const getResetAllParams = useCallback(() => {
    const newParams = new URLSearchParams();

    return newParams;
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Фільтри</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={getSexSearchParams(null)} // Передаємо URLSearchParams
        >
          Усі
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={getSexSearchParams('m')} // Передаємо URLSearchParams
        >
          Чоловіки
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={getSexSearchParams('f')} // Передаємо URLSearchParams
        >
          Жінки
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Пошук"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={getCenturySearchParams(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={getCenturySearchParams('')} // Передаємо пустий рядок або null, щоб скинути всі століття
            >
              Усі
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={getResetAllParams()}
        >
          Скинути всі фільтри
        </SearchLink>
      </div>
    </nav>
  );
};
