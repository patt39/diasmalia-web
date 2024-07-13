import { cn } from '@/lib/utils';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import linkifyHtml from 'linkify-html';
import { useState } from 'react';

interface HtmlParserProps {
  html: string;
  value?: number;
}

export const HtmlParser = ({ html, value }: HtmlParserProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const lengthHtml = html.length;
  const options: HTMLReactParserOptions = {
    replace: (node: any) => {
      if (node.name === 'a') {
        return (
          <a
            href={node.attribs.href}
            style={{ color: 'blue' }} // Appliquez ici vos styles souhaités
          >
            {domToReact(node.children)}
          </a>
        );
      }
    },
  };

  const classNameValue = {
    className: {
      url: 'text-blue-500 hover:underline',
    },
  };
  const cleanHtmlString = linkifyHtml(html.slice(0, value), {
    ...classNameValue,
  });
  const cleanHtmlNotSliceString = linkifyHtml(html, { ...classNameValue });
  const parseSliceValue = parse(cleanHtmlString, options);
  const parseNotSliceValue = parse(cleanHtmlNotSliceString, options);

  return (
    <>
      {isReadMore ? parseSliceValue : parseNotSliceValue}
      {lengthHtml > Number(value) && (
        <span
          onClick={() => setIsReadMore((lk) => !lk)}
          className={cn('text-sm text-blue-600 cursor-pointer')}
        >
          {isReadMore ? '...read more' : ''}
        </span>
      )}
    </>
  );
};

export const HtmlParserMessage = ({ html, value }: HtmlParserProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const lengthHtml = html.length;
  const options: HTMLReactParserOptions = {
    replace: (node: any) => {
      if (node.name === 'a') {
        return (
          <a
            href={node.attribs.href}
            style={{ color: 'blue' }} // Appliquez ici vos styles souhaités
          >
            {domToReact(node.children)}
          </a>
        );
      }
    },
  };

  const classNameValue = {
    className: {
      url: 'text-blue-500 hover:underline',
    },
  };
  const cleanHtmlString = linkifyHtml(html.slice(0, value), {
    ...classNameValue,
  });
  const cleanHtmlNotSliceString = linkifyHtml(html, { ...classNameValue });
  const parseSliceValue = parse(cleanHtmlString, options);
  const parseNotSliceValue = parse(cleanHtmlNotSliceString, options);

  return (
    <>
      {isReadMore ? parseSliceValue : parseNotSliceValue}
      {lengthHtml > Number(value) && (isReadMore ? '...' : '')}
    </>
  );
};
