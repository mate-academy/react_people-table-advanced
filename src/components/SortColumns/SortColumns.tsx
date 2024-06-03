import { useSearchParams } from "react-router-dom"
import { SearchLink } from "../SearchLink";
import cn from 'classnames'

type Props = {
  column: string;
};

type SortParams = {
  [key: string]: string | null;
};

export const SortColumns: React.FC<Props> = ({column}) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const sortParams = (field: string): SortParams => {
    const firstClick = sort !== field;
    const secondClick = sort === field && !order;
    const thirdClick = sort === field && order;

    if (firstClick) {
      return { sort: field, order: null };
    }

    if (secondClick) {
      return { order: 'desc' };
    }

    if (thirdClick) {
      return { sort: null, order: null}
    }

    return {};
  }

  const lowerColumn = column.toLowerCase();

return (<th>
      <span className="is-flex is-flex-wrap-nowrap">
        {column}
        <SearchLink params={sortParams(lowerColumn)}>
          <span className="icon">
            <i
              className={cn('fas', {
                'fa-sort': sort !== lowerColumn,
                'fa-sort-up': sort === lowerColumn && !order,
                'fa-sort-down': sort === lowerColumn && order,
              })}
            />
          </span>
        </SearchLink>
      </span>
</th>
)
}
