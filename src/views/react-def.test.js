import React from 'react';
import ReactDOM from 'react-dom';
import ReactDef from './react-def';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactDef />, div);
  ReactDOM.unmountComponentAtNode(div);
});