type TitleProps = {
  title: string;
};

export const PageTitle: React.FC<TitleProps> = ({ title }) => (
  <h1 className="title">{title}</h1>
);
