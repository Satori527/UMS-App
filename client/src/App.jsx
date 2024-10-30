import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Sidebar from './components/sidebar/Sidebar.jsx';



function App() {
  

  return (
    <>
      
      <ToastContainer/>
      <Sidebar/>
        <main>
          <Outlet/>
        </main>
    </>
  )
}

export default App
