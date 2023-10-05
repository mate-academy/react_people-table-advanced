type Props = {
  title: string,
};

export const PageTitle = ({ title }: Props) => (
  <h1 className="title">{title}</h1>
);
