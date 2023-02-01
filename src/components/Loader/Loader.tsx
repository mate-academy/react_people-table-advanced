import './Loader.scss';
import { memo } from 'react';

export const Loader = memo(() => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
));
