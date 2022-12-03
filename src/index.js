import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss";

// Redux : 
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // A enlever au passage en prod;


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={ store }>
        <App />    
    </Provider>
);



