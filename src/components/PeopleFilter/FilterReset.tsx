import { NavLink } from 'react-router-dom';

export const FilterReset = () => (
  <div className="panel-block">
    <NavLink
      className="button is-link is-outlined is-fullwidth"
      to={{
        search: '',
      }}
    >
      Reset all filters
    </NavLink>
  </div>
);
