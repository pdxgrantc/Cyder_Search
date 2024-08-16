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
    <div className="text bg min-h-screen w-full flex flex-col">
      <PageHeader />
      <div className="m-page flex flex-col gap-5">
        <main className="flex-grow">{children || <Outlet />}</main>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="h-[5rem] bg-orange text-black text-5xl flex flex-col justify-center">
      <div className="m-x_page flex justify-between h-fit">
        <h1 className="font-extrabold">Cyder Search</h1>
        <nav className="font-bold text-4xl self-end flex gap-5">
          <NavLink className="header-button" to="/">Home</NavLink>
          <NavLink className="header-button" to="/help">Help</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default App
