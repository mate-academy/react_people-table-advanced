import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  century: number;
};

export const CenturyFilterOption: React.FC<Props> = ({ century }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const centuryToToggle = century.toString();
  const isCenturyIncluded = centuries.includes(centuryToToggle);
  const newCenturies = isCenturyIncluded
    ? centuries.filter(selectedCentuty => selectedCentuty !== centuryToToggle)
    : [...centuries, centuryToToggle];

  return (
    <SearchLink
      data-cy="century"
      className={classNames('button', 'mr-1', { 'is-info': isCenturyIncluded })}
      params={{ centuries: newCenturies }}
    >
      {century}
    </SearchLink>
  );
};
