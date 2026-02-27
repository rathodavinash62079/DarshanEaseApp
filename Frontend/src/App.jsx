import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MoreTemple from "./pages/MoreTemple";
import TempleDetails from "./pages/TempleDetails";
import BookNow from "./pages/BookNow";
import MyBookings from "./pages/MyBookings";
import AdminTemples from "./pages/AdminTemples";
import AdminBookings from "./pages/AdminBookings";
import AdminSlots from "./pages/AdminSlots";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/more-temples" element={<MoreTemple />} />

        <Route path="/temple/:slug" element={<TempleDetails />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/temples" element={<AdminTemples />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/slots" element={<AdminSlots />} />
       


      </Routes>

    </BrowserRouter>

  );

}

export default App;
