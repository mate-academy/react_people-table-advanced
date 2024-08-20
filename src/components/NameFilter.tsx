import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    if (newQuery) {
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams.toString());

        newParams.set('query', newQuery.toLowerCase());

        return newParams;
      });
    } else {
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams.toString());

        newParams.delete('query');

        return newParams;
      });
    }
  };

  return (
    <div className="filter">
      <label htmlFor="nameFilter">Name Filter:</label>
      <input
        id="nameFilter"
        type="text"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};
