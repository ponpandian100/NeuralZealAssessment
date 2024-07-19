import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import bg from './assets/bg.jpg' ;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://neural-zeal-assessment-backend-api.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.success) {
      navigate(`/projects?userId=${data.user.id}`);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className='md:p-20 p-8 h-screen bg-green-200' >
{/* mobile view ---------------------------------------------------------------------------------------------------------------------------- */}
      <div className=" sm:hidden flex flex-col-reverse overflow-hidden shadow-md  shadow-black rounded-xl h-full bg-red-700 ">
      <form className=" bg-white p-6 w-full h-full max-w-2xl" onSubmit={handleLogin}>
        <h1 className=" text-2xl text-green-500 font-extrabold  mb-4">Login</h1>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <div className="mb-4">
          <label className="block font-bold text-black">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 p-2 border-[1px] bg-green-200 rounded-xl "
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold ">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-2 border rounded-xl bg-green-200"
            required
          />
        </div>
        <br/>
        <button type="submit" className="w-full bg-green-500 font-extrabold  hover:bg-green-900 text-white py-2 rounded-xl">
          Login
        </button>
        <div className=" p-10   flex justify-center gap-4 text-2xl">
        <ion-icon name="logo-youtube" ></ion-icon>
        <ion-icon name="logo-github"></ion-icon>
        <ion-icon name="logo-facebook"></ion-icon>
        <ion-icon name="logo-instagram"></ion-icon>

        </div>
        <div className=" mt-[-10px] text-center text-[12px]"><p>&copy; 2024 Pon Pandian. All Rights Reserved</p></div>
      
      </form>
      <div className=' bg-green-500 w-full h-full  '>
        <img className=' opacity-[0.35] w-full h-full' src={bg}/>
        <h1 className=' z-10 text-white mt-[-110px] text-center font-extrabold text-4xl' >Neural Zeal Assessment</h1>
      </div>
      
    </div>
{/* pc view ---------------------------------------------------------------------------------------------------------------------------- */}
<div className=" hidden sm:flex  overflow-hidden shadow-md  shadow-black rounded-xl h-full bg-red-700 ">
      <form className=" bg-white p-6 w-full h-full max-w-sm" onSubmit={handleLogin}>
        <h1 className=" text-2xl text-green-500 font-extrabold  mb-4">Login</h1>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <div className="mb-4">
          <label className="block font-bold text-black">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 p-2 border-[1px] bg-green-200 rounded-xl "
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold ">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-2 border rounded-xl bg-green-200"
            required
          />
        </div>
        <br/>
        <button type="submit" className="w-full bg-green-500 font-extrabold  hover:bg-green-900 text-white py-2 rounded-xl">
          Login
        </button>
        <div className=" p-10   flex justify-center gap-4 text-2xl">
        <ion-icon name="logo-youtube" ></ion-icon>
        <ion-icon name="logo-github"></ion-icon>
        <ion-icon name="logo-facebook"></ion-icon>
        <ion-icon name="logo-instagram"></ion-icon>

        </div>
        <div className=" mt-[-10px] text-center text-[12px]"><p>&copy; 2024 Pon Pandian. All Rights Reserved</p></div>
      
      </form>
      <div className=' bg-green-500 w-full h-full  '>
        <img className=' opacity-[0.35] w-full h-full' src={bg}/>
        <h1 className=' z-10 text-white mt-[-350px] text-center font-extrabold text-4xl' >Neural Zeal Assessment</h1>
      </div>
      
    </div>

      
    </div>
   
  );
};

const Projects = () => {
  const navigate=useNavigate();
  const [projects, setProjects] = useState([]);
  const userId = new URLSearchParams(window.location.search).get('userId');

  React.useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`https://neural-zeal-assessment-backend-api.vercel.app/projects?userId=${userId}`);
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, [userId]);

  return (
    <div className=" bg-green-200 min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="bg-white flex flex-wrap gap-4 p-6 rounded-xl shadow-md w-full max-w-md">
        {projects.map((project) => (
          <li key={project.id} className=" text-white hover:text-white hover:bg-green-900 bg-green-500 rounded-xl shadow-black shadow-md p-4">
            <button className="  font-bold text-xl" onClick={()=>navigate(`/dashboard/${project.id}`)}>{project.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {

  
  const {id} = useParams();
    return (
    <div className=" bg-green-200 min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Dashboard for Project {id}</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/NeuralZealAssessment">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
