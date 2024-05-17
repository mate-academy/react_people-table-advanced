import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getLink } from '../utils/getLink';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';
import { useContext } from 'react';

type Props = {
  person: string | null;
  sex: string;
};
export const PersonLink: React.FC<Props> = ({ person, sex }) => {
  const { peopleCopy } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  return (
    <>
      {person && !!getLink(peopleCopy, person, sex) ? (
        <Link
          to={{
            pathname: `${getLink(peopleCopy, person, sex).slug}`,
            search: searchParams.toString(),
          }}
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
