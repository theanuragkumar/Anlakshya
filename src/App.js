import Navbar from "./Navbar/Navbar";
import Home from "./Home/home";
import Single from "./Page/single";
import Write from "./Write/write";
import Setting from "./Settings/setting";
import Login from "./Login/login";
import Sidebar from "./Sidebar/sidebar";
import Contact from "./Contact/contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
    const user= true;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/post/:postId" element={<Single />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/write" element={user ?  <Write /> : <Home /> } />
        <Route exact path="/settings" element={user ? <Setting /> : <Login />} />
        <Route exact path="/about" element={<Sidebar />} />
      </Routes>

    </Router>
  );
}

export default App;
