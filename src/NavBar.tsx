import Link from "next/link";

export default function NavBar() {
    return <nav className="navbar navbar-expand-lg bg-blue-500"
        style={{ backgroundColor: '#0a58ca' }}>
        <div className="container-fluid">
            <Link href='/'>
                <span className="navbar-brand text-white text-decoration-none">Oracle</span>
            </Link>
        </div>
    </nav>
}