import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
  visiblePeople: Person[] | null;
  personToHighlight: Person | null;
  setVisiblePeople: (people: Person[]) => void;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  // people,
  visiblePeople,
  personToHighlight,
  // setVisiblePeople,
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

  const getParent = (parentName: string | null | undefined) =>
    parentName
      ? visiblePeople?.find(p => p.name === parentName) || parentName
      : null;

  const renderParent = (parent: Person | string | null) =>
    !parent ? (
      '-'
    ) : typeof parent === 'string' ? (
      parent
    ) : (
      <PersonLink person={parent} />
    );

  if (!visiblePeople || visiblePeople.length === 0) {
    return null;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTypes.map(type => {
            const typeToLower = type.toLowerCase();

            let params;

            if (sortBy !== typeToLower) {
              params = { sort: typeToLower };
            } else if (!currentOrder) {
              params = { sort: typeToLower, order: 'desc' };
            } else {
              params = { sort: null, order: null };
            }

            return (
              <th key={type}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {type}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i
                        className={`fas ${
                          sortBy !== typeToLower
                            ? 'fa-sort'
                            : currentOrder === 'desc'
                              ? 'fa-sort-down'
                              : 'fa-sort-up'
                        }`}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople?.map(person => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          const isHighlighted =
            personToHighlight && person.name === personToHighlight.name;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isHighlighted ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(mother)}</td>
              <td>{renderParent(father)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
