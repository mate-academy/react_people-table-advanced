import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';
import classNames from 'classnames';
import { SortFild } from '../../../types/SortField';

type Props = {
  currentValue: SortFild;
};

export const SortItem: React.FC<Props> = ({ currentValue: value }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const capitalizedTitle = value[0].toUpperCase() + value.slice(1);

  const getClassName = () =>
    classNames('fas', {
      'fa-sort': sort !== value,
      'fa-sort-down': sort === value && !order,
      'fa-sort-up': order && sort === value,
    });

  const handleSorting = () => {
    const sortField = sort !== value || !order ? value : null;
    const changeOrder = sort === value && !order ? 'desc' : null;

    return { sort: sortField, order: changeOrder };
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {capitalizedTitle}
        <SearchLink params={handleSorting()}>
          <span className="icon">
            <i className={getClassName()} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
