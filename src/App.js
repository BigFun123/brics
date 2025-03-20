import './App.css';
import { APPContextProvider } from './lib/context';
import { MainPage } from './pages/main';

function App() {

  return (
    <APPContextProvider>
      <MainPage></MainPage>
    </APPContextProvider>
  );
}

export default App;
