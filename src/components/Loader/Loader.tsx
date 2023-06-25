import { FC } from 'react';
import './Loader.scss';

export const Loader: FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);
