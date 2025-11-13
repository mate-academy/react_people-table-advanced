import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue);

    const newParams = new URLSearchParams(searchParams);

    if (newValue.trim()) {
      newParams.set('query', newValue);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <div className="field" data-cy="name-filter">
      <div className="control has-icons-left">
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
};
