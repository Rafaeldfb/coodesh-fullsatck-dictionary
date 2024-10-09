
export default function Navbar() {
  return (
    <nav className="navbar-container flex w-full h-[60px] items-center">
      <div className="logo w-[100px]">
        LOGO
      </div>

      <div className="navigation-links flex flex-auto gap-4 justify-end">
        <div className="nav-link">Entries</div>

        <div className="nav-link">User</div>

        <div className="nav-link">Auth</div>
      </div>
    </nav>
  )
}
