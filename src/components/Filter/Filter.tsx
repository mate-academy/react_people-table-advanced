import React from 'react';
import { useHistory } from 'react-router-dom';

const Filter: React.FC<{ searchParams: URLSearchParams }> = ({
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
      <input
        value={query ? query : ''}
        type="text"
        placeholder="filter"
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
