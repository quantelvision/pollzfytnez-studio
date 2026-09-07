import { Fragment } from "react";

// Splits a line into words so each one can rise from behind its own mask.
// Rendered on the server, so the effect adds no JavaScript and no client
// boundary. The spaces sit outside the masks, so the line still wraps and reads
// as ordinary text to a screen reader and to find in page.
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const classes = ["stagger", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word-mask">
            <span className="word-rise in-group">{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
