import classNames from 'classnames';
import { FC, memo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { textColorByGender } from '../../functions/textColorByGender';
import { useSearchParams } from '../../hooks/useSearchParams';
import { Human } from '../../types/Human';

interface Props {
  person: Human | null;
  parentName?: string;
}

export const PersonName: FC<Props> = memo(({ person, parentName }) => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const personName = person ? person.name : 'not found';
  const styleClasses = classNames('link', textColorByGender(person));
  const { slug } = useParams<{ slug: string }>();

  if (person) {
    return (
      <NavLink
        to={(slug === person.slug
          ? `?${searchParams.toString()}`
          : `${person.slug}?${searchParams.toString()}`)}
        className={styleClasses}
        onClick={() => {
          navigate(`?${searchParams.toString()}`);
        }}
      >
        {personName}
      </NavLink>
    );
  }

  return (
    <p className={styleClasses}>
      {parentName || 'not exist parent name'}
    </p>
  );
});
