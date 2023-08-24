import { StringParam, useQueryParams } from 'use-query-params';

type Props = {
  sortBy: string,
};

export const Icon: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useQueryParams({
    sort: StringParam,
    order: StringParam,
  });

  const isSorting = searchParams.sort === sortBy;
  const isDesc = searchParams.order === 'desc';

  if (isSorting && !isDesc) {
    return (<i className="fas fa-sort-up" />);
  }

  if (isSorting && isDesc) {
    return (<i className="fas fa-sort-down" />);
  }

  return (<i className="fas fa-sort" />);
};
