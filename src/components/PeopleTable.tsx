import { useParams, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../types';
import { NOT_SET_VALUE, tableColumnNames } from '../utils/constants';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

const sortTableColumnNames = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortedParams = (newSortType: string): SearchParams => {
    if (sort !== newSortType) {
      return {
        sort: newSortType,
        order: null,
      };
    }

    if (sort === newSortType && !order) {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumnNames.map((name) => {
            return sortTableColumnNames.includes(name) ? (
              <th key={name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  <SearchLink params={getSortedParams(name.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={classnames('fas', {
                          'fa-sort': sort !== name.toLowerCase(),
                          'fa-sort-up': sort === name.toLowerCase() && !order,
                          'fa-sort-down': sort === name.toLowerCase() && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={name}>
                {name}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classnames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || NOT_SET_VALUE}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || NOT_SET_VALUE}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
