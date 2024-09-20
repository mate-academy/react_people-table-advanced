// import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const TableTitle = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const order = searchParams.get('order') || 'asc';
  const sort = searchParams.get('sort');

  const titleTable: string[] = ['Name', 'Sex', 'Born', 'Died'];

  const setSearchWith = (params: {
    order?: string | null;
    sort?: string | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSort = (field: string) => {
    let newOrder = null;
    let newSort: string | null = field;

    if (sort !== field) {
      newOrder = null;
    } else if (!order) {
      newOrder = 'desc';
    } else {
      newOrder = null;
      newSort = null;
    }

    setSearchWith({ order: newOrder, sort: newSort });
  };

  return titleTable.map(title => (
    <th key={title}>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <a onClick={() => handleSort(title.toLowerCase())}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sort !== title.toLowerCase(),
                'fa-sort-up': !order && sort === title.toLowerCase(),
                'fa-sort-down': order && sort === title.toLowerCase(),
              })}
            />
          </span>
        </a>
      </span>
    </th>
  ));
};
