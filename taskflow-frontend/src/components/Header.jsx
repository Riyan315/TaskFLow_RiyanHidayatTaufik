const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'kalender', label: 'Kalender' },
  { id: 'selesai', label: 'Tugas Selesai' },
]

function Header({ view, onNavigate }) {
  return (
    <header className="header">
      <button
        type="button"
        className="header__brand"
        onClick={() => onNavigate('dashboard')}
      >
        TaskFlow
      </button>
      <nav className="header__nav" aria-label="Navigasi utama">
        {NAV_ITEMS.map((item) => {
          const isActive = view === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`header__link ${isActive ? 'header__link--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
