import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import i18n from 'i18next'

import AppContainer from './components/App'
import locales from './locales'
import configureStore from './store/configureStore'
import history from './utils/history'

const userLanguage = 'nl'

// Initialize i18n
i18n.init({
  lng: userLanguage,
  fallbackLng: 'en',
  resources: locales,
})

// MUI Theme
const theme = createMuiTheme({
  palette: { primary: blue },
  typography: { useNextVariants: true },
})

// Initialize Redux store
const store = configureStore(history)

// React Render
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <AppContainer/>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
