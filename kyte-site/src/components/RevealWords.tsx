type RevealWordsProps = {
  text: string;
  accentWord?: string;
};

export function RevealWords({ text, accentWord }: RevealWordsProps) {
  const words = text.trim().split(/\s+/);

  return <>
    {words.map((word, index) => <span key={`${word}-${index}`}>
      <span className={`reveal-word${word === accentWord ? " hero__accent" : ""}`}>{word}</span>
      {index < words.length - 1 ? " " : null}
    </span>)}
  </>;
}
