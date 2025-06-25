import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const centuriesList = ['1600s', '1700s', '1800s', '1900s'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const toggleCentury = (century: string) => {
    const updated = new URLSearchParams(searchParams);
    const current = updated.getAll('centuries');

    if (current.includes(century)) {
      updated.delete('centuries');
      current
        .filter(c => c !== century)
        .forEach(c => updated.append('centuries', c));
    } else {
      updated.append('centuries', century);
    }

    setSearchParams(updated);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

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
        <div className="buttons are-small" data-cy="CenturyFilter">
          {centuriesList.map(century => (
            <button
              key={century}
              className={classNames('button', {
                'is-info': selectedCenturies.includes(century),
              })}
              onClick={() => toggleCentury(century)}
              type="button"
              data-cy="century"
            >
              {century}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
