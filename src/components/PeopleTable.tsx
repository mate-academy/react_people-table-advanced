import cn from 'classnames';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (sortType: string) => {
    if (sort !== sortType) {
      return { sort: sortType, order: null };
    }

    if (sort === sortType && !order) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getParentInfo = (parentName: string) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTypes.map(sortType => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType}
                <SearchLink params={getSortParams(sortType)}>
                  <span className="icon">
                    <i className={cn('fas fa-sort',
                      { 'fa-sort-up': sort === sortType && !order },
                      { 'fa-sort-down': sort === sortType && order })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                ? getParentInfo(person.motherName)
                : '-'}
            </td>
            <td>
              {person.fatherName
                ? getParentInfo(person.fatherName)
                : '-'}
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};
