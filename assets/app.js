import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';

const App = () => {
    return <h1>Bonjour à tous</h1>;
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
