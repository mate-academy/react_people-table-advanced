import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Filter: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const history = useHistory();

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.value) {
      searchParams.set('name', e.target.value);
    } else {
      searchParams.delete('name');
    }
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <form className="form">
      <input
        value={name ? name : ''}
        type="text"
        placeholder="filter"
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
