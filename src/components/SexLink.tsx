import { FC } from 'react';
import { SearchLink } from './SearchLink';

interface Props {
  parametrValue: string | null
  text: string
}
export const SexLink: FC<Props> = ({ parametrValue, text }) => (
  <SearchLink
    className="is-active"
    params={{ sex: parametrValue }}
  >
    {text}
  </SearchLink>
);
