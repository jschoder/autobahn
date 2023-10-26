import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import theme from './theme.ts'

import App from '~/container/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme} defaultColorScheme='auto'>
    <App />
  </MantineProvider>,
)
