import { render } from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';

import theme from './utils/theme';
import App from './components/App';

render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById('root'),
);
