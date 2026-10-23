const NAV_ITEMS = [
  { href: '#ringkasan', label: 'Ringkasan' },
  { href: '#tambah', label: 'Tambah tugas' },
  { href: '#daftar', label: 'Daftar tugas' },
]

function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#main">TaskFlow</a>
      <nav className="header__nav" aria-label="Navigasi utama">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} className="header__link" href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
