import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  field: 'name' | 'sex' | 'born' | 'died',
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  // const sortField = searchParams.get('sort') || '';
  // const isReversed = searchParams.get('order') === 'desc';

  const getSort = () => {
    searchParams.set('sort', field);

    return searchParams.toString();
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {field}
        <Link to={{ search: getSort() }}>
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </Link>
      </span>
    </th>
  );
};

// "#/people?sort=name"
