/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { getParent } from '../../utils/getParent';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { getClasses } from '../../utils/getClassNames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugParam } = useParams();
  const [searchParams] = useSearchParams();

  const getSortParams = (columnName: string) => {
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
              <SearchLink params={{ ...getSortParams('name') }}>
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
              <SearchLink params={{ ...getSortParams('sex') }}>
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
              <SearchLink params={{ ...getSortParams('born') }}>
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
              <SearchLink params={{ ...getSortParams('died') }}>
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
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = people.find(({ name }) => name === motherName);
          const father = people.find(({ name }) => name === fatherName);

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': slugParam === slug,
              })}
              key={slug}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {getParent(motherName, mother)}
              </td>

              <td>
                {getParent(fatherName, father)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
