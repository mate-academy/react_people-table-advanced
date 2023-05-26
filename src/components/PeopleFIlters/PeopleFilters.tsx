import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { NameFilterPanel } from '../NameFilterPanel';
import { SexFilterPanel } from '../SexFilterPanel';
import { CenturyFilterPanel } from '../CenturyFilterPanel';
import { ClearFilterLink } from '../ClearFilterLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query' || '');
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex' || '');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilterPanel sex={sex} searchParams={searchParams} />

      <NameFilterPanel query={query} onQueryChange={handleQueryChange} />

      <CenturyFilterPanel
        centuries={centuries}
        searchParams={searchParams}
      />

      <ClearFilterLink />
    </nav>
  );
};
