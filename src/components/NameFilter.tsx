import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <div className="field">
      <label className="label" htmlFor="name">
        Name
      </label>

      <div className="control">
        <input
          id="name"
          data-cy="nameFilter"
          className="input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
