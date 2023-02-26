import './code-editor.css';
import './syntax.css';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Hightlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  value: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const onEditorChange = (input: string | undefined) => {
    onChange(input || "");
  }

  const onFormatClick = () => {
    const formatted = prettier.format(value, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/, '');

    onChange(formatted);
  }

  return (
    <div className="editor-wrapper">
      <button 
        className="button button-format is-primary is-small" 
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onEditorChange}
        defaultValue=""
        value={value}
        theme="vs-dark"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  ) 
}

export default CodeEditor;