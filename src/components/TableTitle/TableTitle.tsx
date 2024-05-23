import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

export const TableTitle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParam: string[] = ['Name', 'Sex', 'Born', 'Died'];

  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const setSearchWith = (params: {
    order?: string | null;
    sort?: string | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const sortfunc = (field: string) => {
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

  return titleParam.map(titleField => (
    <th key={titleField}>
      <span className="is-flex is-flex-wrap-nowrap">
        {titleField}
        <a onClick={() => sortfunc(titleField.toLowerCase())}>
          <span className="icon">
            <i
              className={classNames('fas', {
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
