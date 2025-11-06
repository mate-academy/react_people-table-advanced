import { LinkProps, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = Omit<LinkProps, 'to'> & {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field, ...props }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let newParams;

  if (sort !== field) {
    newParams = { sort: field, order: null };
  } else if (order === null) {
    newParams = { sort: field, order: 'desc' };
  } else {
    newParams = { sort: null, order: null };
  }

  const iconClass = classNames('fas', {
    'fa-sort': sort !== field,
    'fa-sort-up': sort === field && order === null,
    'fa-sort-down': sort === field && order === 'desc',
  });

  return (
    <SearchLink params={newParams} {...props}>
      <span className="icon">
        <i className={iconClass} />
      </span>
    </SearchLink>
  );
};
