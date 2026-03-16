import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import './NodeEditor.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type NoteEditorProps = {
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  setToc?: (val: any) => any;
};

const useTableOfContents = (
  containerRef: React.RefObject<HTMLElement | null>,
  content: string,
) => {
  const [toc, setToc] = useState<
    {
      text: string;
      level: number;
    }[]
  >([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const headings = container.querySelectorAll('h1, h2, h3');

    const items = Array.from(headings).map((item) => ({
      text: item.textContent.trim() ?? '',
      level: Number(item.tagName[1]),
    }));

    setToc(items);
  }, [containerRef, content]);

  return toc;
};

export const NoteEditor = ({
  value = '',
  autoFocus = false,
  readOnly = false,
  onChange,
  setToc,
}: NoteEditorProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toc = useTableOfContents(contentRef, value);

  useEffect(() => {
    if (setToc) {
      setToc(toc);
    }
  }, [toc, setToc]);

  return (
    <div className="h-full">
      <div className="overflow-hidden rounded-md text-sm shadow-sm dark:outline dark:outline-white/10">
        <div className={clsx('grid', readOnly ? 'grid-cols-1' : 'grid-cols-2')}>
          {!readOnly && (
            <div className="border-r border-gray-200 dark:border-gray-800">
              <textarea
                value={value}
                autoFocus={autoFocus}
                placeholder="Enter text..."
                spellCheck={false}
                className="bg-editor h-full min-h-80 w-full resize-none px-6 py-4 text-[15px] leading-relaxed font-medium text-neutral-900 caret-neutral-800 outline-none selection:bg-neutral-300/60 dark:bg-white/10 dark:text-white dark:caret-white"
                onChange={(e) => onChange?.(e.target.value)}
              />
            </div>
          )}
          <div
            ref={contentRef}
            className="md-editor overflow-auto bg-white px-6 py-4 text-[15px] leading-relaxed text-neutral-800 shadow-[-3px_0_6px_-1px_rgba(0,0,0,0.08)] dark:bg-black/25 dark:text-white"
          >
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[
                [rehypeKatex, { throwOnError: false, strict: 'ignore' }],
              ]}
            >
              {value}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
