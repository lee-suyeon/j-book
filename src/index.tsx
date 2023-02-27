import 'bulmaswatch/darkly/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(<App />);
