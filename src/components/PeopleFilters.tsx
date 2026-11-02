
import { useSearchParams } from 'react-router-dom';

const centuryOptions = ['15', '16', '17', '18', '19', '20', '21'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.delete('query');
      newParams.append('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleCenturyClick = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');

    newCenturies.forEach(item => {
      newParams.append('centuries', item);
    });

    setSearchParams(newParams);
  };

  return (
    <>
      <div className="field">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <div className="field">
        {centuryOptions.map(century => (
          <label
            key={century}
            className="checkbox mr-4"
          >
            <input
              type="checkbox"
              checked={centuries.includes(century)}
              onChange={() => handleCenturyClick(century)}
            />

            {' '}
            {century}th
          </label>
        ))}
      </div>
    </>
  );
};
