import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortLink = (field: string) => {
    let nextOrder: string | null = null;
    let nextSort: string | null = field;

    if (sort !== field) {
      nextOrder = null;
    } else if (!order) {
      nextOrder = 'desc';
    } else {
      nextSort = null;
      nextOrder = null;
    }

    return {
      search: getSearchWith(searchParams, {
        sort: nextSort,
        order: nextOrder,
      }),
    };
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) {
      return (
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      );
    }

    return (
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort-up': !order,
            'fa-sort-down': order === 'desc',
          })}
        />
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <a
              onClick={event => {
                event.preventDefault();
                setSearchParams(
                  new URLSearchParams(getSortLink('name').search),
                );
              }}
            >
              {renderSortIcon('name')}
            </a>
          </th>
          <th>
            Sex
            <a
              onClick={event => {
                event.preventDefault();
                setSearchParams(new URLSearchParams(getSortLink('sex').search));
              }}
            >
              {renderSortIcon('sex')}
            </a>
          </th>
          <th>
            Born
            <a
              onClick={event => {
                event.preventDefault();
                setSearchParams(
                  new URLSearchParams(getSortLink('born').search),
                );
              }}
            >
              {renderSortIcon('born')}
            </a>
          </th>
          <th>
            Died
            <a
              onClick={event => {
                event.preventDefault();
                setSearchParams(
                  new URLSearchParams(getSortLink('died').search),
                );
              }}
            >
              {renderSortIcon('died')}
            </a>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(item => (
          <PersonItem key={item.slug} person={item} />
        ))}
      </tbody>
    </table>
  );
};
