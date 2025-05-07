import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function MainLayout({ children }) {
  return (
    <div style={{minHeight: '100vh', display:'flex' , flexDirection:'column'}}>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
}