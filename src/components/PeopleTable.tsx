import { useParams } from 'react-router-dom';
import { TABLE_ATTRIBUTES } from '../utils/constants';
import { Person } from '../types';
import { PersonElement } from './PersonElement/PersonElemet';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ATTRIBUTES.map((attribute: string) => (
            (attribute !== 'Mother' && attribute !== 'Father')
              ? (
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {attribute}
                    <SortLink sortBy={attribute.toLocaleLowerCase()} />
                  </span>
                </th>
              )
              : (
                <th>
                  {attribute}
                </th>
              )
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonElement
            person={person}
            key={person.slug}
            selectedPerson={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
