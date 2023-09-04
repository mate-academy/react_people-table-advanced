import { Ping } from '@uiball/loaders';
import './Loader.scss';

export const Loader = () => (
  <div className="Loader" data-cy="loader">
    <Ping
      size={55}
      speed={1}
      color="grey"
    />
  </div>
);
