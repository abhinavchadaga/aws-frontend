import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from './ThemeProvider';
import Content from './components/Content';
import { Header } from './components/Header';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Notifications />
        <Header />
        <Content />
      </ThemeProvider>
    </Provider>
  );
}
