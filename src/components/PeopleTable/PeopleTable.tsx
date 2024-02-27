import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSortingIcon } from '../../utils/getSortingIcon';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugParam } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (sort === column && !order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={{ ...getSortParams('name') }}>
                <span className="icon">
                  <i className={getSortingIcon('name', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortParams('sex') }}>
                <span className="icon">
                  <i className={getSortingIcon('sex', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortParams('born') }}>
                <span className="icon">
                  <i className={getSortingIcon('born', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortParams('died') }}>
                <span className="icon">
                  <i className={getSortingIcon('died', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, motherName, fatherName, slug } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': slug === slugParam,
              })}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex || '-'}</td>
              <td>{born || '-'}</td>
              <td>{died || '-'}</td>
              <td>{motherName ? findParent(motherName) : '-'}</td>
              <td>{fatherName ? findParent(fatherName) : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
