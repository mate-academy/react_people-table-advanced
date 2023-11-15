import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { TableHeader } from '../types/TableHeader';

const tableHeaders = [
  TableHeader.Name,
  TableHeader.Sex,
  TableHeader.Born,
  TableHeader.Died,
  TableHeader.Mother,
  TableHeader.Father,
];

type Props = {
  people: Person[];
  collection: Person[];
  toggleSortBy: (header: TableHeader) => void;
  sortBy: TableHeader | string;
  isReversed: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  collection,
  toggleSortBy,
  sortBy,
  isReversed,
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => {
            const sortable = header !== TableHeader.Mother
              && header !== TableHeader.Father;

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}

                  {sortable && (
                    <a
                      href="#/people"
                      onClick={() => toggleSortBy(header)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sortBy !== header,
                            'fa-sort-up': sortBy === header && !isReversed,
                            'fa-sort-down': sortBy === header && isReversed,
                          })}
                        />
                      </span>
                    </a>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = collection.find(parent => parent.name === motherName);
          const father = collection.find(parent => parent.name === fatherName);

          const mum = mother
            ? (
              <PersonLink
                name={motherName}
                sex={mother.sex}
                slug={mother.slug}
              />
            )
            : motherName;

          const dad = father
            ? (
              <PersonLink
                name={fatherName}
                sex={father.sex}
                slug={father.slug}
              />
            )
            : fatherName;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={person.slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherName
                  ? mum
                  : '-'}
              </td>

              <td>
                {fatherName
                  ? dad
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
