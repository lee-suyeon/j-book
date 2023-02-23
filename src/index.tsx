import 'bulmaswatch/darkly/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const [ code, setCode ] = useState('');
  const [ input, setInput ] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <div>
      <CodeEditor 
        value={input}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview 
        code={code}
      />
    </div>
  );
};

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(<App />);
