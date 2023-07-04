import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer'
import { createStore, compose, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
