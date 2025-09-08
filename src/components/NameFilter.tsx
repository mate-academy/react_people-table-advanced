import React from 'react';

type NameFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const NameFilter: React.FC<NameFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    // params.set('query', event.target.value);
    // setSearchParams(params);

    // if (event.target.value === '') {
    //   params.delete('query');
    //   setSearchParams(params);
    // }
    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  return (
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
  );
};
