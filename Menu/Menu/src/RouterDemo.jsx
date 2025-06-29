import ViewA from './ViewA';
import ViewB from './ViewB';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
export default function RouterDemo() {
  return (
	<div>
		<BrowserRouter>
		<h1>Router Demo</h1>
	  <div>
		Menu 
        <Link to={'/viewA'}><div>menuitem for viewA</div></Link>
		<Link to={'/viewB'}><div>menuitem for viewB</div></Link>
		
	  </div>
	  <Routes>
		<Route path="/viewA" element={<ViewA />} />
		<Route path="/viewB" element={<ViewB />} />
	  </Routes>
		
		</BrowserRouter>
	  
	  
	</div>
  );
}