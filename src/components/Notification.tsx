type Props = {
  message: string;
};

export const Notification: React.FC<Props> = ({ message }) => {
  return <p data-cy="peopleLoadingError">{message}</p>;
};
