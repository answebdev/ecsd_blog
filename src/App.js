import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Blog from './components/pages/Blog';
import OnePost from './components/pages/OnePost';
import Resources from './components/pages/Resources';
import Error from './components/pages/Error';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/blog' element={<Blog />} />
        <Route exact path='/resources' element={<Resources />} />
        <Route exact path='/blog/:slug' element={<OnePost />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
