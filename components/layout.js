import NavBar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
     return (
          <>
               <NavBar />
               <main className="position-relative" style={{ height: '100vh', paddingTop: '4.5rem', paddingBottom: '20px', overflow: "hidden" }}>{ children }</main>
               <Footer />
          </>
     )
}