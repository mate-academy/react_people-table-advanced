import { Link } from 'react-router-dom';

const nameInKebabCase = (initialName: string) => {
  return initialName.split(' ').join('-').toLocaleLowerCase();
};

type Props = {
  name: string,
  born: string,
  gender: string,
};

export const PersonName: React.FC<Props> = ({ name, born, gender }) => {
  return (
    <td>
      {born !== 'No information' ? (
        <Link
          key={name}
          to={`/people/${nameInKebabCase(name)}-${born}`}
          className={gender === 'm' ? 'name-link blue' : 'name-link red'}
        >
          {name}
        </Link>
      ) : (
        name
      )}
    </td>
  );
};
