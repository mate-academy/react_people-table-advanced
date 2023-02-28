import classNames from "classnames";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchLink } from "./SearchLink";

type Props = {
  field: string
}

export const SortLink: FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const isReverse = searchParams.get('order') === 'desc';

  const preparedField = field.toLocaleLowerCase();

  const getParamsWithSort = () => {
    if (sortField !== preparedField) {
      return {
        sort: preparedField,
        order: null,
      };
    }

    if (!isReverse) {
      return {
        sort: preparedField,
        order: 'desc',
      }
    }

    return {
      sort: null,
      order: null,
    }
  };

  const params = getParamsWithSort();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {field}
        <SearchLink params={params} >
          <span className="icon">
            <i className={classNames('fas',
              {'fa-sort': sortField !== preparedField},
              {'fa-sort-up': sortField === preparedField && !isReverse},
              {'fa-sort-down': sortField === preparedField && isReverse}
            )} />
          </span>
        </SearchLink>
      </span>
    </th>
  )

}
