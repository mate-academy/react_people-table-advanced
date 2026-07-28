import { useParams, useSearchParams } from 'react-router-dom';
import { Person, Sex } from '../types';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const [serarchParams] = useSearchParams();
  const params = useParams();
  const getPersonLink = (currPerson: Person) =>
    currPerson.name.replace(/\s+/g, '-').toLowerCase() + `-${currPerson.born}`;
  const isSelectedPerson = params.personLinkName === getPersonLink(person);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelectedPerson })}
    >
      <td>
        <SearchLink
          params={serarchParams}
          personLink={getPersonLink(person)}
          femalePerson={person.sex === Sex.Female}
        >
          {person.name}
        </SearchLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother && (
          <SearchLink
            params={serarchParams}
            personLink={getPersonLink(person.mother)}
            femalePerson={true}
          >
            {person.motherName}
          </SearchLink>
        )}
        {(!person.mother && person.motherName) || '-'}
      </td>
      <td>
        {person.father && (
          <SearchLink
            params={serarchParams}
            personLink={getPersonLink(person.father)}
          >
            {person.fatherName}
          </SearchLink>
        )}
        {(!person.father && person.fatherName) || '-'}
      </td>
    </tr>
  );
};
