import { useSearchParams } from 'react-router-dom';
import { People } from '../../types/People';
import './TableContent.scss';

type Props = {
  person: People;
  slug: string | undefined;
};

const tableTitles = [
  'name',
  'sex',
  'born',
  'died',
  'father',
  'mother',
  'slug'];

export const TableContent: React.FC<Props> = ({ person, slug }) => {
  const [searchParams] = useSearchParams();

  let background = '';
  const sortBy = searchParams.get('sortBy');

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
      {
        tableTitles.map(el => {
          let backgroundTable = '';

          if (sortBy === el) {
            backgroundTable = 'highlighted';
          }

          if (el === 'father') {
            return (
              <td className={backgroundTable} key={el}>
                {person.fatherName.split(' ')[0]}
              </td>
            );
          }

          if (el === 'mother') {
            return (
              <td className={backgroundTable} key={el}>
                {person.motherName.split(' ')[0]}
              </td>
            );
          }

          return (
            <td className={backgroundTable} key={el}>
              {person[el as keyof People]}
            </td>
          );
        })
      }
    </tr>
  );
};
