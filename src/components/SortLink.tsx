import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  text: string,
};

export const SortLink: React.FC<Props> = ({ text }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortBy = text.toLowerCase();
  const inOrderASC = sort === sortBy && !order;
  const inOrderDESC = sort === sortBy && order === 'desc';

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {text}
      <SearchLink
        params={{
          sort: inOrderDESC
            ? null
            : sortBy,
          order: inOrderASC
            ? 'desc'
            : null,
        }}
      >
        <span className="icon">
          <i className={classNames(
            'fa fa-sort',
            { 'fa-sort-up': inOrderASC },
            { 'fa-sort-down': inOrderDESC },
          )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
