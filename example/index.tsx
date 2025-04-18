import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { DialogProvider, useDialog } from '../.';

const App = () => {
  const { alert } = useDialog();
  const handleClick = () => {
    alert({
      title: 'Hello',
      message: 'This is a test alert',
      onOk: () => console.log('Alert closed'),
    });
  };
  return (
    <>
      <div>
        <button onClick={() => handleClick()}>o</button>
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}