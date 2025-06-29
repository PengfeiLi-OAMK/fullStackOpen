
/*Lets begin to create a restaurant web application. First goal is to implement the menu (the foods offered) of the restaurant. In this exercises your goal is to create a menu structure, which allows the user to browse the foods offered by the restaurant. The restaurant owner wants to separate the menu into two categories. First should be main courses and second should be drinks.
Here are the steps which to follow:
1. Create a new empty react project
2. Create the two components – MainCourses and Drinks. Put some example dishes into the MainCourses component and some example drinks into the Drinks component to be rendered. The content in both can be hard coded as JSX for now.
3. Render both of them in the App.js
4. Create a horizontal menu in the App.js which visually presents the menu options for the user, the main courses and drinks
6. Import React Router into your project
7. Initialize browser router in your Ex61RestaurantMenu
8. Define Router Routes in the Ex61RestaurantMenu, main courses should be the default view to present when the application loads
9. Define Router links to the horizontal menu
10. Test that you can navigate between the two menu options*/
import './App.css'
import MainCourses from './MainCourses'
import Drinks from './Drinks'
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  

  return (
    
      <div>
        <BrowserRouter>
        <div>
        <h1>Menu</h1>
        <Link to={'/MainCourses'}><div>Main Courses</div></Link>
        <Link to={'/Drinks'}><div>Drinks</div></Link>
        </div>
        <Routes>
          <Route path="/MainCourses" element={<MainCourses />} />
          <Route path="/Drinks" element={<Drinks />} />
        </Routes>
        </BrowserRouter>
        
      
          <MainCourses />
          <Drinks />

      </div>
       
  )
}

export default App
