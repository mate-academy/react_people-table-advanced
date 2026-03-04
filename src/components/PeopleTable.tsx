import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink/PersonLink';

type Props = {
  people: Person[];
};

type SortFilter = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const currentOrder = searchParams.get('order');
  const currentSort = searchParams.get('sort');
  const sortBySex = searchParams.get('sex');
  const sortByCentury = searchParams.getAll('centuries');
  const sortByName = searchParams.get('query');
  const sortFilters: SortFilter[] = ['name', 'sex', 'born', 'died'];

  const sortedPeople = () => {
    let copy = [...people];

    switch (currentSort) {
      case 'name':
        if (currentOrder === 'desc') {
          copy = copy.sort((a, b) => b.name.localeCompare(a.name));
          break;
        }

        copy = copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        if (currentOrder === 'desc') {
          copy = copy.sort((a, b) => b.sex.localeCompare(a.sex));
          break;
        }

        copy = copy.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'born':
        if (currentOrder === 'desc') {
          copy = copy.sort((a, b) => b.born - a.born);
          break;
        }

        copy = copy.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        if (currentOrder === 'desc') {
          copy = copy.sort((a, b) => b.died - a.died);
          break;
        }

        copy = copy.sort((a, b) => a.died - b.died);
        break;
      default:
        break;
    }

    if (sortBySex !== null) {
      copy = copy.filter(item => item.sex === sortBySex);
    }

    if (sortByCentury.length > 0) {
      copy = copy.filter(item =>
        sortByCentury.some(century => Math.ceil(item.born / 100) === +century),
      );
    }

    if (sortByName !== null) {
      const lowerSearch = sortByName.toLowerCase();

      copy = copy.filter(item => {
        const selfMatch = item.name.toLowerCase().includes(lowerSearch);
        const momMatch = item.motherName?.toLowerCase().includes(lowerSearch);
        const fatherMatch = item.fatherName?.toLowerCase().includes(lowerSearch);

        return selfMatch || momMatch || fatherMatch;
      });
    }

    return copy;
  };

  const getSortLink = (item: SortFilter) => {
    const params = new URLSearchParams(searchParams);

    if (currentSort !== item) {
      params.set('sort', item);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    const query = params.toString();

    return query ? `?${query}` : '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFilters.map(item => {
            return (
              <th key={item}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <Link to={getSortLink(item)}>
                    <span className="icon">
                      <i
                        // className="fas fa-sort"
                        className={classNames('fas', {
                          'fa-sort': currentSort !== item,
                          'fa-sort-up':
                            currentSort === item && currentOrder !== 'desc',
                          'fa-sort-down':
                            currentSort === item && currentOrder === 'desc',
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople().map(item => {
          return (
            <tr
              className={item.slug === personId ? 'has-background-warning' : ''}
              data-cy="person"
              key={item.slug}
            >
              <td>
                <PersonLink person={item} />
              </td>

              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>
              <td>
                {item.mother ? (
                  <PersonLink person={item.mother} />
                ) : (
                  <>{!item.motherName ? '-' : item.motherName}</>
                )}
              </td>
              <td>
                {item.father ? (
                  <PersonLink person={item.father} />
                ) : (
                  <>{!item.fatherName ? '-' : item.fatherName}</>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
