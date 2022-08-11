import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types/Person';
import { PersonInfo } from '../PersonInfo/PersonInfo';

interface Props {
  person: Person,
  columnHighlight: string,
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr className={classNames({
      'has-background-primary': person.slug === slug,
      'has-background-white': !slug,
    })}
    >
      <PersonInfo
        person={person}
      />
    </tr>
  );
};
