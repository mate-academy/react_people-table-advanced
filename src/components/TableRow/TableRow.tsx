import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { HighlightedText } from '../HighlightedText';
import { FilterEnum } from '../../types/FilterEnum';

type Props = {
  person: Person;
};

export const TableRow: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const [searchFilters] = useSearchParams();
  const query = searchFilters.get(FilterEnum.Query);
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(mother)
          ? (<PersonLink person={mother} />)
          : <HighlightedText text={motherName} highlight={query} />}
      </td>
      <td>
        {(father)
          ? (<PersonLink person={father} />)
          : <HighlightedText text={fatherName} highlight={query} />}
      </td>
    </tr>
  );
};
