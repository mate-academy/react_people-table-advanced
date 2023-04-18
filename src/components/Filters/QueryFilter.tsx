import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export type Props = {
  query: string | null,
};

export const QueryFilter: FC<Props> = ({ query }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={query || ''}
        onChange={handleQueryChange}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
