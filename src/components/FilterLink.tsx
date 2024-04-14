import cn from 'classnames';

// import { useState } from "react";
// import {  useParams } from "react-router-dom";
import { PeopleFilter } from '../types/enums';

type Props = {
  filterType: PeopleFilter;
  children: React.ReactNode;
  // onFilter: () => {};
};
export const FilterLink: React.FC<Props> = ({ filterType, children }) => {
  // const [selectedCentury, setSelectedCentury] = useState([]);

  {
    /* </p>href="#/people?sex=m", href="#/people?sex=f" */
  }

  return (
    <a
      key={filterType}
      href={`#/${filterType === PeopleFilter.All ? '' : filterType}`}
      className={cn('filter__link', {
        selected: filterType === filterType,
      })}
      data-cy={`FilterLink${filterType}`}
      // onClick={onFilter}
    >
      {children}
    </a>
  );
};
