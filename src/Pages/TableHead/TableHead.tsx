import './TableHead.scss';
import { useSearchParams } from 'react-router-dom';

const titles = ['Name', 'Sex', 'Born', 'Died', 'Father', 'Mother', 'Slug'];

export const TableHead = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  const clickHandler = (el: string):void => {
    const sortOrder = searchParams.get('sortOrder');

    if (sortOrder === 'asc' && sortBy === el.toLowerCase()) {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', el.toLowerCase());
    setSearchParams(searchParams);
  };

  return (
    <tr
      className="person"
    >
      {
        titles.map(el => {
          return (
            <th
              key={el}
              className={`headerField ${sortBy === el.toLowerCase() ? 'selected-header' : ''}`}
              onClick={() => {
                clickHandler(el);
              }}
            >
              {el}
            </th>
          );
        })
      }
    </tr>
  );
};
