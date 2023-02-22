import 'bulmaswatch/darkly/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const ref = useRef<any>();
  const [ code, setCode ] = useState('');
  const [ input, setInput ] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService();
  }, [])

  const onClick = async () => {
    if(!ref.current) {
      return;
    }
    
    const env = ["process", "env", "NODE_ENV"].join(".");
    // bundling
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        [env]: '"production"',
        globalName: 'window',
      },
    });

    setCode(result.outputFiles[0].text);
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
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
