import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type PeopleSortProps = {
  value: string;
};

export const PeopleSort: React.FC<PeopleSortProps> = ({ value }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const label = value.charAt(0).toUpperCase() + value.slice(1);

  let params;
  let iconClass;

  if (sort !== value) {
    params = { sort: value, order: null };
    iconClass = 'fas fa-sort';
  } else if (sort === value && !order) {
    params = { sort: value, order: 'desc' };
    iconClass = 'fas fa-sort-up';
  } else {
    params = { sort: null, order: null };
    iconClass = 'fas fa-sort-down';
  }

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {label}
      <SearchLink params={params}>
        <span className="icon">
          <i className={iconClass} />
        </span>
      </SearchLink>
    </span>
  );
};
