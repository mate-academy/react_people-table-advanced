import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getLink } from '../utils/getLink';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';
import { useContext } from 'react';

type Props = {
  person: string | null;
  sex: string;
};
export const PersonLink: React.FC<Props> = ({ person, sex }) => {
  const { people } = useContext(PeopleContext);

  return (
    <>
      {person && !!getLink(people, person, sex) ? (
        <Link
          to={`${getLink(people, person, sex).slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {person}
        </Link>
      ) : (
        person || '-'
      )}
    </>
  );
};
