import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />} >
            <Route index element={<Home />} />
            <Route path='create' element={<Create />} />
            <Route path='edit/:userId' element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
