import React from 'react';
import Callout from './callout';

export function Blockquote(props: { children: React.ReactNode }) {
  const text = extractTextFromChildren(props.children).trim();
  const type = text.startsWith('💡')
    ? 'tip'
    : text.startsWith('⚠️')
      ? 'warning'
      : text.startsWith('🚨')
        ? 'danger'
        : undefined;

  const childrenWithoutEmoji = removeEmojiFromFirstChild(props.children);

  return type ? (
    <Callout type={type}>{childrenWithoutEmoji}</Callout>
  ) : (
    <blockquote>{props.children}</blockquote>
  );
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }

  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    return extractTextFromChildren(props.children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractTextFromChildren(child)).join('');
  }

  return '';
}

function removeEmojiFromFirstChild(children: React.ReactNode): React.ReactNode {
  if (!Array.isArray(children)) {
    return children;
  }

  const textElement = children[1];

  if (React.isValidElement(textElement)) {
    const props = textElement.props as { children?: string | string[] };
    if (typeof props.children === 'string' || Array.isArray(props.children)) {
      const text =
        typeof props.children === 'string' ? props.children.trim() : props.children[0].trim();
      let cleanText = text;

      if (text.startsWith('💡')) {
        cleanText = text.slice('💡'.length);
      } else if (text.startsWith('⚠️')) {
        cleanText = text.slice('⚠️'.length);
      } else if (text.startsWith('🚨')) {
        cleanText = text.slice('🚨'.length);
      }

      const modifiedElement =
        typeof props.children === 'string'
          ? React.cloneElement(textElement, {
              children: cleanText,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
          : React.cloneElement(textElement, {
              children: [cleanText, ...props.children.slice(1)],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);

      return children.map((child, index) => (
        <React.Fragment key={index}>
          {index === 1 ? modifiedElement : child}
        </React.Fragment>
      ));
    }
  }

  return children;
}
