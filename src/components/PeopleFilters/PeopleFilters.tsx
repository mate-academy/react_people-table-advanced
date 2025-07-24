import { FilterSexValues, SexFilter } from '../../types/SexFilter';
import { SearchLink } from '../SearchLink/SearchLink';
import { CenturyFilter } from '../CenturyFilter/CenturyFilter';
import { NameFilter } from '../NameFilter/NameFilter';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  sexFilter: SexFilter;
  centuryFilter: string[];
  nameFilter: string;
  setSexFilter: React.Dispatch<React.SetStateAction<string>>;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setCenturyFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PeopleFilters: React.FC<Props> = ({
  sexFilter,
  nameFilter,
  setSexFilter,
  centuryFilter,
  setNameFilter,
  setCenturyFilter,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetAllFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');
    navigate(`?${newParams.toString()}`);

    setSexFilter(FilterSexValues.ALL);
    setCenturyFilter([]);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          onClick={() => setSexFilter(FilterSexValues.ALL)}
          className={sexFilter === FilterSexValues.ALL ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          onClick={() => setSexFilter(FilterSexValues.MALE)}
          className={sexFilter === FilterSexValues.MALE ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          onClick={() => setSexFilter(FilterSexValues.FEMALE)}
          className={sexFilter === FilterSexValues.FEMALE ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <NameFilter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <CenturyFilter
        centuryFilter={centuryFilter}
        setCenturyFilter={setCenturyFilter}
      />

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          onClick={() => resetAllFilters()}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
