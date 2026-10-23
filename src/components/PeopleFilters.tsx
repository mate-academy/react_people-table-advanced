import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';

type Props = {
  query: string;
  centuries: number[];
  selectedCenturies: string[];
  onQueryChange: (query: string) => void;
  onCenturiesChange: (centuries: string[]) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  selectedCenturies,
  onQueryChange,
  onCenturiesChange,
}) => (
  <aside className="menu">
    <NameFilter query={query} onChange={onQueryChange} />

    <CenturyFilter
      centuries={centuries}
      selectedCenturies={selectedCenturies}
      onChange={onCenturiesChange}
    />
  </aside>
);
