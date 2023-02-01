import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Prize from './components/Prize';
import Lighthouse from './components/Lighthouse';
import Market from './components/Market';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Form />
      <Prize />
      <Lighthouse />
      <Market />
    </div>
  );
};

export default App;
