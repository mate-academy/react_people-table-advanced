import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const NameFilter: FC = memo(
  () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || '';

    const handleChangeQuery = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        if (value === '') {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value);
        }

        setSearchParams(searchParams);
      },
      [],
    );

    return (
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
    );
  },
);
