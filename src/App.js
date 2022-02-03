import cypress from './static/cypress.svg';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css';

function Header() {
    return <header className="main-header">
        <Link to="/page1">Some page</Link>
        <Link to="/page2">Another page</Link>
        <Link to="/page3">A third page</Link>
    </header>
}

function Home() {
    return <main className="App">
        <Header />
        <div className="page-content">
            <h1 className="main-tagline">
                <img src={cypress} alt="" className="cypress-logo"/> Cypress example for React
            </h1>
        </div>
    </main>
}

function PageView({name}) {
    return <main className="App">
        <Header />
        <div className="page-content">
            <h1 className="main-tagline">
                {name}
            </h1>
        </div>
    </main>
}

function App() {
    return <Router>
        <Routes>
            <Route path="/page1" exact element={<PageView name="Page one"/>} />
            <Route path="/page2" exact element={<PageView name="Page two"/>} />
            <Route path="/page3" exact element={<PageView name="Page three"/>} />
            <Route exact path="/" element={<Home />} />
        </Routes>
    </Router>
}

export default App;
