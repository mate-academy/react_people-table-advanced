import { useSearchParams, Link } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';
import NameFilter from '../Filters/NameFilter';
import CenturyFilter from './CenturyFilter';

type PeopleProps = {
  selectedCenturies: number[];
};

export const PeopleFilters = ({ selectedCenturies }: PeopleProps) => {
  const [searchParams] = useSearchParams();

  const currentSex = searchParams.get('sex');
  const getLink = (params: string) =>
    params ? `/people?${params}` : '/people';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={currentSex === null ? 'is-active' : ''}
          to={getLink(getSearchWith(searchParams, { sex: null }))}
        >
          All
        </Link>
        <Link
          className={currentSex === 'm' ? 'is-active' : ''}
          to={getLink(getSearchWith(searchParams, { sex: 'm' }))}
        >
          Male
        </Link>
        <Link
          className={currentSex === 'f' ? 'is-active' : ''}
          to={getLink(getSearchWith(searchParams, { sex: 'f' }))}
        >
          Female
        </Link>
      </p>

      <NameFilter />

      <CenturyFilter selectedCenturies={selectedCenturies} />

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

export default PeopleFilters;
