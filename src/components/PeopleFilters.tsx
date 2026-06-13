import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Витягуємо поточні значення з URL для підсвічування активних кнопок/табів
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  // Обробник для текстового поля пошуку
  // Як має бути:
  // Як має бути:
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, { query: value || null }),
      ),
    );
  };

  // Логіка для додавання/видалення століть
  const getCenturySearch = (century: string) => {
    let newCenturies = [...centuries];

    if (newCenturies.includes(century)) {
      newCenturies = newCenturies.filter(c => c !== century);
    } else {
      newCenturies.push(century);
    }

    return getSearchWith(searchParams, {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={!sex ? 'is-active' : ''}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                to={{ search: getCenturySearch(century) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button ${centuries.length === 0 ? 'is-success' : ''} is-outlined`}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        {/* Reset All просто скидає всі параметри пошуку (порожній рядок) */}
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
