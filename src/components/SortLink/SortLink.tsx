import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  field: string
};

export const SortLink: FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const isReverse = searchParams.get('order') === 'desc';

  const preparedFieldCase = field.toLocaleLowerCase();

  const getParamsWithSort = () => {
    if (sortField !== preparedFieldCase) {
      return {
        sort: preparedFieldCase,
        order: null,
      };
    }

    if (!isReverse) {
      return {
        sort: preparedFieldCase,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const params = getParamsWithSort();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {field}
        <SearchLink params={params}>
          <span className="icon">
            <i className={classNames('fas',
              { 'fa-sort': sortField !== preparedFieldCase },
              { 'fa-sort-up': sortField === preparedFieldCase && !isReverse },
              { 'fa-sort-down': sortField === preparedFieldCase && isReverse })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
