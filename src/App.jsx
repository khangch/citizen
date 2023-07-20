import logo from './logo.svg';
import './App.css';
import Datatable from './components/DataTable';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import HomeList from './pages/HomeList';
import HomeDetail from './pages/HomeDetail';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/list' element={<HomeList />} />
        <Route path='/home/:id' element={<HomeDetail />} />

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
