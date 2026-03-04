import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import './NodeEditor.css';

type NoteEditor = {
  initialValue?: string;
};

export const NoteEditor = ({ initialValue = '' }: NoteEditor) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <div className="h-full">
        <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm dark:border-gray-800">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-200 dark:border-gray-800">
              <textarea
                value={value}
                autoFocus={true}
                placeholder="Enter text..."
                spellCheck={false}
                className="bg-editor h-full min-h-80 w-full resize-none px-6 py-4 text-[15px] leading-relaxed font-medium text-neutral-900 caret-neutral-800 outline-none selection:bg-neutral-300/60 dark:bg-white/10 dark:text-white dark:caret-white"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="md-editor overflow-auto bg-white px-6 py-4 text-[15px] leading-relaxed text-neutral-800 shadow-[-3px_0_6px_-1px_rgba(0,0,0,0.08)] dark:bg-black/25 dark:text-white">
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
    </>
  );
};
