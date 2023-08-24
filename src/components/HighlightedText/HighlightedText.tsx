import classNames from 'classnames';

type Props = {
  text: string | null,
  highlight: string | null
};

export const HighlightedText: React.FC<Props> = ({
  text = '',
  highlight = '',
}) => {
  if (!text) {
    return (
      <span>-</span>
    );
  }

  const normalizedText = text?.toLowerCase();

  if (highlight !== null && normalizedText.includes(highlight)) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <span>
        {parts.map((part, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}`}
            className={classNames(
              { highlighted: part.toLowerCase() === highlight.toLowerCase() },
            )}
          >
            {part}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span>{text}</span>
  );
};
