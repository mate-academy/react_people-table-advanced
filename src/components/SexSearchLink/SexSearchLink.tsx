import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  sex: string | null,
  text: string,
};

export const SexSearchLink: FC<Props> = ({ sex, text }) => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex') || null;

  return (
    <SearchLink
      params={{
        sex,
      }}
      className={classNames({ 'is-active': currentSex === sex })}
    >
      {text}
    </SearchLink>
  );
};
