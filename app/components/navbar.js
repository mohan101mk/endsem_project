'use client'
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";


const Navbar=()=>{
    const pathname=usePathname();

    const links = [
        {href: '/dashboard' , label: 'Dashboard'},
        {href: '/transactions' , label: 'Transactions'},
        {href: '/budget' , label: 'Budget'},
        {href: '/insights' , label: 'Insights'},
        {href: '/tax-calculator' , label: 'Tax Calculator'},
    ]
    return (
        <nav className="navbar">
        <div className="logo" style={{
          fontFamily: "Copperplate, 'Copperplate Gothic Bold', 'Geist', 'Inter', 'Segoe UI', Arial, sans-serif",
          fontWeight: 800,
          color: '#e53935',
          fontSize: '2rem',
          letterSpacing: '1.5px',
          borderBottom: '3px solid #e53935',
          display: 'inline-block',
          paddingBottom: '2px',
        }}>
            <Link href='/' className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>FinX</Link>
        </div>

        <div className="header">
          {links.map(({href,label}) => (
            <Link 
                key={href}
                href={href}
                className={pathname === href ? 'nav-link active-link' : 'nav-link'}
            >
                {label}
            </Link>
          ))}
        </div>

        <div className="profile">
            
            <Link href='/profile'>
                <Image src="/profile.png" alt="Profile" className="profile-img" width={60} height={60}  />
            </Link>
        </div>
      </nav>
    )
}

export default Navbar