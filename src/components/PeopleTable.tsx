/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

import { PersonLink } from './PersonLink';
import { TableTitles } from '../enums/tableTitles';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  peoples: Person[],
};

type Params = {
  sort?: string | null,
  order: 'desc' | null,
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const setSearchWith = (params: Params) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const spanElement = e.currentTarget;
    const parentEl = spanElement.parentElement?.parentElement?.textContent
      ?.toLocaleLowerCase();

    switch (true) {
      case sort !== parentEl:
        setSearchWith({ sort: parentEl || null, order: null });

        return null;

      case sort === parentEl && Boolean(order):
        setSearchWith({ sort: null, order: null });

        return null;

      case sort === parentEl:
        setSearchWith({ order: 'desc' });

        return null;

      default:
        return null;
    }
  };

  return (
    <>
      {peoples.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(TableTitles).map((el) => (
                <th key={el}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {el}
                    <span style={{ color: '#485FC7', cursor: 'pointer' }}>
                      <span className="icon" onClick={handleClick}>
                        <i className={classNames('fas', {
                          'fa-sort': sort !== el.toLocaleLowerCase(),
                          'fa-sort-up': sort === el.toLocaleLowerCase()
                            && !order,
                          'fa-sort-down': order
                            && sort === el.toLocaleLowerCase(),
                        })}
                        />
                      </span>
                    </span>
                  </span>
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {peoples.map((person) => (
              <PersonLink person={person} peoples={peoples} key={person.name} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
