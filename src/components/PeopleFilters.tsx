import cn from 'classnames';

type Props = {
  handleQueryFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSexFilter: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    arg: string,
  ) => void;
  handleCenturyFilter: (arg: string) => void;
  handleQuery: string;
  searchParams: URLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  handleQueryFilter,
  handleQuery,
  handleSexFilter,
  handleCenturyFilter,
  searchParams,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({
            'is-active': searchParams.get('sex') === null,
          })}
          onClick={e => handleSexFilter(e, 'all')}
        >
          All
        </a>
        <a
          className={cn({
            'is-active': searchParams.get('sex') === 'm',
          })}
          onClick={e => handleSexFilter(e, 'm')}
        >
          Male
        </a>
        <a
          className={cn({
            'is-active': searchParams.get('sex') === 'f',
          })}
          onClick={e => handleSexFilter(e, 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={handleQuery}
            onChange={e => handleQueryFilter(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <span
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('centuries')?.includes('16'),
              })}
              onClick={() => handleCenturyFilter('16')}
            >
              16
            </span>

            <span
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('centuries')?.includes('17'),
              })}
              onClick={() => handleCenturyFilter('17')}
            >
              17
            </span>
            <span
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('centuries')?.includes('18'),
              })}
              onClick={() => handleCenturyFilter('18')}
            >
              18
            </span>

            <span
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('centuries')?.includes('19'),
              })}
              onClick={() => handleCenturyFilter('19')}
            >
              19
            </span>

            <span
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('centuries')?.includes('20'),
              })}
              onClick={() => handleCenturyFilter('20')}
            >
              20
            </span>
          </div>

          <div className="level-right ml-4">
            <span
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.getAll('centuries')?.length !== 0,
              })}
              onClick={() => handleCenturyFilter('all')}
            >
              All
            </span>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
