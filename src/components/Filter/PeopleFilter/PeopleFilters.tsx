import { useNavigate, useSearchParams } from 'react-router-dom';
import { PeopleFilterParams } from '../../../types/FilterParams';
import { SearchLink } from '../../SearchLink';
import { FilterByCentury } from '../FilterByCentury';
import { FilterBySex } from '../FilterBySex';
import { FilterInput } from '../FilterInput';
import { getSearchWith } from '../../../utils/searchHelper';

const resetAllFilters: PeopleFilterParams = {
  sex: null,
  query: null,
  centuries: null,
};

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const navigate = useNavigate();

  const onChangeInputFilter = (inputText: string) => {
    const path = getSearchWith(searchParams, {
      query: inputText === '' ? null : inputText,
    });

    navigate({ search: path });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex selectedSex={selectedSex} />

      <div className="panel-block">
        <FilterInput onChangeInput={onChangeInputFilter} />
      </div>

      <div className="panel-block">
        <FilterByCentury selectedCenturies={selectedCenturies} />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ ...resetAllFilters }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
