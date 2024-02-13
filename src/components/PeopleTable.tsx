/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { getPersonParent } from '../utils/peopleHelpers';
import { PersonLink } from './PersonLink';
import { getClasses } from '../utils/linkClasses';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugParam } = useParams();
  const [searchParams] = useSearchParams();

  const getSortParam = (columnName: string) => {
    const { column, order } = {
      column: searchParams.get('sort'),
      order: searchParams.get('order'),
    };

    if (column !== columnName) {
      return { sort: columnName, order: null };
    }

    if (column === columnName && !order) {
      return { sort: columnName, order: 'desc' };
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
              <SearchLink params={{ ...getSortParam('name') }}>
                <span className="icon">
                  <i className={
                    getClasses('name', searchParams.get('sort'),
                      searchParams.get('order'))
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortParam('sex') }}>
                <span className="icon">
                  <i className={
                    getClasses('sex', searchParams.get('sort'),
                      searchParams.get('order'))
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortParam('born') }}>
                <span className="icon">
                  <i className={
                    getClasses('born', searchParams.get('sort'),
                      searchParams.get('order'))
                  }
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortParam('died') }}>
                <span className="icon">
                  <i className={
                    getClasses('died', searchParams.get('sort'),
                      searchParams.get('order'))
                  }
                  />
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
          const personMother: Person | string
          = getPersonParent(person, people, 'mother');
          const personFather: Person | string
          = getPersonParent(person, people, 'father');

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': slugParam === person.slug,
              })}
              key={person.slug}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                <PersonLink person={personMother} />
              </td>

              <td>
                <PersonLink person={personFather} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
