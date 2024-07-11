import { SexOption } from '../../types/types';
import { SexFilterOption } from './SexFilterOption';

export const SexFilter: React.FC = () => (
  <p className="panel-tabs" data-cy="SexFilter">
    <SexFilterOption title="All" sexOption={SexOption.All} />
    <SexFilterOption title="Male" sexOption={SexOption.Male} />
    <SexFilterOption title="Female" sexOption={SexOption.Female} />
  </p>
);
