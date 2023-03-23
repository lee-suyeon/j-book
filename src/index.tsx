import 'bulmaswatch/darkly/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(<App />);
