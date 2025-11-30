import { Route, Routes } from "react-router";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import Nav from './components/nav';
import Header from './components/header';
import Footer from './components/footer';
import EmployeeDirectory from './components/employee_directory';
import Organization from './components/organization';

function App() {
  return (
    <div className="App">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
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
      </SignedIn>
    </div>
  );
}

export default App;