import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../../SearchLink';
import { SearchParamsTypes } from '../../../../types/SearchParamsTypes';

type Props = {
  item: string
};

const { Order, Sort } = SearchParamsTypes;

export const TableHeaderItem: React.FC<Props> = ({ item }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(Sort) || '';
  const order = searchParams.get(Order) || '';

  const itemToLowerCase = item.toLowerCase();

  const params = {
    sort: sort === itemToLowerCase && order ? null : itemToLowerCase,
    order: sort === itemToLowerCase && !order ? 'desc' : null,
  };

  const clases = {
    'fa-sort-up': sort === itemToLowerCase && !order,
    'fa-sort-down': sort === itemToLowerCase && order,
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {item}
        <SearchLink params={params}>
          <span className="icon">
            <i className={classNames(
              'fas fa-sort', clases,
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>

  );
};
