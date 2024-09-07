import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';

export const TitleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const title: string[] = ['Name', 'Sex', 'Born', 'Died'];

  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const setSearch = (params: {
    order?: string | null;
    sort?: string | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleFilt = (field: string) => {
    let filtOrder = null;
    let filtSort: string | null = field;

    if (sort !== field) {
      filtOrder = null;
    } else if (!order) {
      filtOrder = 'desc';
    } else {
      filtOrder = null;
      filtSort = null;
    }

    setSearch({ order: filtOrder, sort: filtSort });
  };

  return title.map(titleField => (
    <th key={titleField}>
      <span className="is-flex is-flex-wrap-nowrap">
        {titleField}
        <a onClick={() => handleFilt(titleField.toLowerCase())}>
          <span className="icon">
            <i
              className={cn('fas', {
                'fa-sort': sort !== titleField.toLowerCase(),
                'fa-sort-up': !order && sort === titleField.toLowerCase(),
                'fa-sort-down': order && sort === titleField.toLowerCase(),
              })}
            />
          </span>
        </a>
      </span>
    </th>
  ));
};
