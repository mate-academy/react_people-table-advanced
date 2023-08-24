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

  switch (true) {
    case (isSorting && !isDesc):
      return (<i className="fas fa-sort-up" />);
    case (isSorting && isDesc):
      return (<i className="fas fa-sort-down" />);
    default:
      break;
  }

  return (<i className="fas fa-sort" />);
};
