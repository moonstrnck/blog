'use client';

import React, { type ElementRef, useRef, useState } from 'react';

import IconCopy from '@/assets/icons/icon-copy.svg';
import IconDone from '@/assets/icons/icon-done.svg';

const Pre = (props: React.ComponentPropsWithoutRef<'pre'>) => {
  const preRef = useRef<ElementRef<'pre'>>(null);
  const [copied, setCopied] = useState(false);

  const { children, ...rest } = props;

  const language = (rest as { 'data-language': string })['data-language'];

  const onCopy = (): void => {
    if (!preRef.current) return;

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);

    const code = preRef.current.getElementsByTagName('code')[0].cloneNode(true);

    Array.from((code as HTMLElement).querySelectorAll('div.code-line')).forEach((line) => {
      line.innerHTML = line.innerHTML + '\r';
    });

    void navigator.clipboard.writeText(code.textContent ?? '');
  };

  return (
    <pre ref={preRef} {...rest}>
      <span className="pre-language-label">{language}</span>
      <button className="pre-copy-button" onClick={onCopy}>
        {copied ? (
          <IconDone fill="var(--secondary-foreground)" width="12px" height="12px" />
        ) : (
          <IconCopy fill="var(--secondary-foreground)" width="12px" height="12px" />
        )}
      </button>
      {children}
    </pre>
  );
};

export default Pre;
