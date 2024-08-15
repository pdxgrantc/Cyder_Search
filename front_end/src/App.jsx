import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  NavLink,
} from "react-router-dom";

// Pages
import Home from './components/Home'
import Help from "./components/Help";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} caseSensitive={true}>
          <Route index element={<Home />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


function Root(props) {
  const { children } = props;

  return (
    <div className="bg text min-h-screen">
      <header className="px-page py-[.75rem] bg-orange text-black text-5xl flex justify-between">
        <h1 className="font-extrabold">Cyder Search</h1>
        <nav className="font-bold text-4xl self-end flex gap-5">
          <NavLink className="custom-button" to="/">Home</NavLink>
          <NavLink className="custom-button" to="/help">Help</NavLink>
        </nav>
      </header>
      <main>{children || <Outlet />}</main>
    </div>
  )

}

export default App
