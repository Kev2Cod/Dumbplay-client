import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Transaction, AddMusic, AddArtis, Pricing, Error } from "./pages/Index";
import Complain from "./pages/Complain";
import ComplainAdmin from "./pages/Admin/ComplainAdmin";

const isLogin = true;
const isAdmin = false;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/pay" element={<Pricing />} />
        <Route path="/add-music" element={<AddMusic />} />
        <Route path="/add-artis" element={<AddArtis />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {isLogin ? !isAdmin ? <Complain /> : <ComplainAdmin /> : <></>}
    </BrowserRouter>
  );
}

export default App;
