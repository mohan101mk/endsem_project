'use client'
import Link from "next/link";
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
        <div className="logo">
            <Link href='/dashboard' className="nav-link">Logo</Link>
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
            <Link href='/' className="nav-link">Profile</Link>
            </div>
      </nav>
    )
}

export default Navbar