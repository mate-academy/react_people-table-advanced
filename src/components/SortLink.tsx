import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  field: 'name' | 'sex' | 'born' | 'died',
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  // const sortField = searchParams.get('sort') || '';
  // const isReversed = searchParams.get('order') === 'desc';

  const handleSort = () => {
    return searchParams.toString();
  };

  searchParams.set('sort', field);

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {field}
        <Link to={{ search: handleSort() }}>
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </Link>
      </span>
    </th>
  );
};

// "#/people?sort=name"
