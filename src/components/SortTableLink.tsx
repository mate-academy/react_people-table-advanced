import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  name: string,
};

export const SortTableLink: React.FC<Props> = ({ name }) => {
  const [searchParams] = useSearchParams();
  const sortParams = searchParams.get('sort') || '';
  const orderParams = searchParams.get('order') || '';

  const getSortParams = (sortName: string) => {
    if (sortParams === sortName && orderParams) {
      return {
        search: getSearchWith(searchParams, { sort: null, order: null }),
      };
    }

    if (sortParams !== sortName && orderParams) {
      return {
        search: getSearchWith(searchParams, { sort: sortName, order: null }),
      };
    }

    if (sortParams === sortName) {
      return {
        search: getSearchWith(searchParams, { order: 'desc' }),
      };
    }

    return {
      search: getSearchWith(searchParams, { sort: sortName }),
    };
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {name.charAt(0).toUpperCase() + name.slice(1)}
      <Link to={getSortParams(name)}>
        <span className="icon">
          <i className={classNames('fas', {
            'fa-sort-down': sortParams === name && orderParams,
            'fa-sort-up': sortParams === name && !orderParams,
            'fa-sort': sortParams !== name,
          })}
          />
        </span>
      </Link>
    </span>
  );
};
