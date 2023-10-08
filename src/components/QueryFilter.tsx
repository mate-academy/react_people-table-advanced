import { useSearchParams } from 'react-router-dom';
// import { useState } from 'react';

export const QueryFilter = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  // const [query, setQuery] = useState<string>('');

  // eslint-disable-next-line no-console
  console.log(searchParams.get('query'));

  return (
    <div className="panel-block">
      <p className="control has-icons-left">

        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={searchParams.get('query') || ''}
          onChange={(e) => {
            searchParams.set('query', `${e.target.value}`);

            if (searchParams.get('query') === '') {
              searchParams.delete('query');
            }

            setSeachParams(searchParams);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
