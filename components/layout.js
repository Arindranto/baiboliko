import NavBar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
     return (
          <>
               <NavBar />
               <main className="position-relative" style={{ height: '85vh', marginTop: '75px' }}>{ children }</main>
               <Footer />
          </>
     )
}