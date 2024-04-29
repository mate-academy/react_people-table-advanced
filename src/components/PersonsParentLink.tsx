import classNames from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  personName: string;
  peopleList: Person[];
};

export const PersonsParentLink: React.FC<Props> = ({
  personName,
  peopleList,
}) => {
  const [searchParams] = useSearchParams();
  const targetPerson = peopleList.find(human => human.name === personName);

  if (!targetPerson) {
    return undefined;
  }

  const { name, slug, sex } = targetPerson;

  return (
    <Link
      to={`/people/${slug}?${searchParams}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
