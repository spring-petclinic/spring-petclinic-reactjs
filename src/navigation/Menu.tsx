
const MenuItem = ({
  active,
  url,
  title,
  children
}: {
  active: boolean;
  url: string;
  title: string;
  children?: any;
}) => (
  <li className={active ? 'active' : ''}>
    <a href={url} title={title}>
      {children}
    </a>
  </li>
);

export default function Menu({ name }: { name: string }) {
  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <span />
          </a>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-navbar">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div className="navbar-collapse collapse" id="main-navbar">
          <ul className="nav navbar-nav navbar-right">
            <MenuItem active={name === '/'} url="/" title="home page">
              <span className="glyphicon glyphicon-home" aria-hidden="true" />
              &nbsp;
              <span>Home</span>
            </MenuItem>

            <MenuItem active={name.startsWith('/owners')} url="/owners" title="find owners">
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
              &nbsp;
              <span>Find owners</span>
            </MenuItem>

            <MenuItem active={name === 'vets'} url="/vets" title="veterinarians">
              <span className="glyphicon glyphicon-th-list" aria-hidden="true" />
              &nbsp;
              <span>Veterinarians</span>
            </MenuItem>

            <MenuItem
              active={name === 'error'}
              url="/error"
              title="trigger a RuntimeException to see how it is handled"
            >
              <span className="glyphicon glyphicon-warning-sign" aria-hidden="true" />
              &nbsp;
              <span>Error</span>
            </MenuItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}
