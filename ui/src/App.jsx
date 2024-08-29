import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import homePage from '../pages/header'
import patrimoine from '../pages/patrimoinePage'
import possession from '../pages/possessionsPage.jsx'
import createPossession from '../pages/createPossessions.jsx';
import updateByLibelle from '../pages/updatePossessionByLibelle.jsx';
import EditionPage from '../pages/editionPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" Component={homePage}/>
        <Route path='/patrimoine' Component={patrimoine}/>
        <Route path='/possession' Component={possession}/>
        <Route path='/possession/create' Component={createPossession}/>
        <Route path='/possession/:libelle/update' Component={updateByLibelle}/>
        <Route path='/possession/edit/:index' Component={EditionPage}/>
      </Routes>
    </Router>
  )
}

export default App;
