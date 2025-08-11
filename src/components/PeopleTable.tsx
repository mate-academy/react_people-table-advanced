import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Sort } from '../types/SortType';
import { SearchLink } from './SearchLink';

type Props = {
  filteredPeople: Person[];
  sort: string;
  order: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  sort,
  order,
}) => {
  const { slugId } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([type, value]) => {
            return (
              <th key={type}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {type}
                  {sort === value && !order && (
                    <SearchLink params={{ order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  )}
                  {sort === value && order && (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  )}
                  {(sort !== value || !sort) && (
                    <SearchLink params={{ sort: value }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person, _index, array) => {
          // eslint-disable-next-line no-param-reassign
          person.mother = array.find(
            parent => parent.name === person.motherName,
          );

          // eslint-disable-next-line no-param-reassign
          person.father = array.find(
            parent => parent.name === person.fatherName,
          );

          return (
            <PersonLink key={person.name} person={person} slugId={slugId} />
          );
        })}
      </tbody>
    </table>
  );
};
