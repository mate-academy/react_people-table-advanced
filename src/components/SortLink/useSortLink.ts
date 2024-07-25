import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SortParam = 'sort' | 'order';

export const useSortLink = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getNewSearchParams = useCallback(
    (param: SortParam) => {
      const preparedNewParam = param.toLowerCase();

      if (!sort) {
        return {
          sort: preparedNewParam,
          order,
        };
      }

      if (sort !== preparedNewParam) {
        return {
          sort: preparedNewParam,
          order: null,
        };
      }

      if (sort && !order) {
        return {
          sort,
          order: 'desc',
        };
      }

      return {
        sort: null,
        order: null,
      };
    },
    [sort, order],
  );

  return {
    currentParams: { sort, order },
    getNewSearchParams,
  };
};
