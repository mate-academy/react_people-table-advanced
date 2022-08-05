import { People } from '../../types/People';
import './TableContent.scss';

type Props = {
  person: People;
  slug: string | undefined;
};

export const TableContent: React.FC<Props> = ({ person, slug }) => {
  let background = '';

  if (slug && person.slug === slug) {
    switch (person.sex) {
      case 'm':
        background = 'blue';
        break;

      case 'f':
        background = 'red';
        break;
      default:
        break;
    }
  }

  return (

    <tr className={`person ${background}`}>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person?.fatherName && person.fatherName.split(' ')[0]}</td>
      <td>{person?.motherName && person.motherName.split(' ')[0]}</td>
      <td>{person.slug}</td>
    </tr>
  );
};
