import { ThemeProvider } from './ThemeProvider';
import Content from './components/Content';
import { Header } from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Content />
      </ThemeProvider>
    </Provider>
  );
}
