import './App.css';
import Home from './Home';
import Work from './Work';
import Personal from './Personal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-gray-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.3),rgba(0,0,0,0))]">
		<header className="App-header">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/work" element={<Work />}/>
					<Route path="/personal" element={<Personal />}/>
				</Routes>
			</Router>
		</header>
    </div>
  );
}

export default App;
