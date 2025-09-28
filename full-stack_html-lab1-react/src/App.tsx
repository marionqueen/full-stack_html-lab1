import { Route, Routes } from "react-router";
import Nav from './components/nav';
import Header from './components/header';
import Footer from './components/footer';
import EmployeeDirectory from './components/employee_directory';
import Organization from './components/organization';

function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<EmployeeDirectory />} />
          <Route path="/employees" element={<EmployeeDirectory />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;