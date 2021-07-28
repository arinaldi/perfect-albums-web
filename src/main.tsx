import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';

import theme from './utils/theme';
import App from './components/App';

render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
