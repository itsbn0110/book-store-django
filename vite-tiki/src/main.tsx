import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import App from './App'

import GlobalStyles from '~/components/GlobalStyles';
import './components/GlobalStyles/GlobalStyles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalStyles>
      </PersistGate>
    </Provider>
  </StrictMode>
)
