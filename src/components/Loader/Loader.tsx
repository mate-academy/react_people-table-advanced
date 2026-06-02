import './Loader.scss';

type Props = {
  load: boolean;
};

export const Loader: React.FC<Props> = ({ load }) =>
  load && (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
