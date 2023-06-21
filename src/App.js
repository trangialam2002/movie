import logo from './logo.svg';
import './App.css';
import { PublicRouter } from './Route/PublicRouter';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './Component/Header/Header';

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          {
            PublicRouter.map((item,index)=>(
              <Route key={index} path={item.path} element={<item.component/>}/>
            ))
          }
        </Routes>
    </BrowserRouter>
  );
}

export default App;
