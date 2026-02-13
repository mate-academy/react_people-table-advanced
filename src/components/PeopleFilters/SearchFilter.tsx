import { SearchParamKey } from '../../types/searchParams';
import { SearchParams } from '../../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams;
  onSearchParamsChange: (params: SearchParams) => void;
}

const SearchFilter = ({ searchParams, onSearchParamsChange }: Props) => {
  const nameQuery = searchParams.get(SearchParamKey.Name) ?? '';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = event.target.value.trim();

    onSearchParamsChange({
      [SearchParamKey.Name]: normalized || null,
    });
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={nameQuery}
          onChange={handleNameChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

export default SearchFilter;
