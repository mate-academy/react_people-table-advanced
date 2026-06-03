import { PeopleSexFilter } from './PeopleSexFilter';
import { PeopleNameFilter } from './PeopleNameFilter';
import { PeopleCenturyFilter } from './PeopleCenturyFilter';
import { Link, useParams, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  function getLink() {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('centuries');
    params.delete('query');

    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: params.toString(),
    };
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <PeopleSexFilter />
      </p>

      <div className="panel-block">
        <PeopleNameFilter />
      </div>

      <div className="panel-block">
        <PeopleCenturyFilter />
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={getLink()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
