import Navbar from '../components/navbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  );
}