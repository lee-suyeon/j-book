import 'bulmaswatch/darkly/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(<App />);
