import React from 'react';
import { useHistory } from 'react-router-dom';

export const Search: React.FC<{ searchParams: URLSearchParams }> = ({
  searchParams,
}) => {
  const query = searchParams.get('query') || '';
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set('query', e.target.value);
    } else {
      searchParams.delete('query');
    }

    history.push(`?${searchParams.toString()}`);
  };

  return (
    <form className="form">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query ? query : ''}
        type="text"
        onChange={onChange}
      />
    </form>
  );
};
