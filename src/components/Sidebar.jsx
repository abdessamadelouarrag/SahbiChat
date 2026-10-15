import Icon from './Icon.jsx';
import Avatar from './Avatar.jsx';
import { avatars } from '../data.js';

const links = [['home', 'Home', 'home'], ['search', 'Search', 'search'], ['chat', 'Messages', 'message'], ['profile', 'Profile', 'user']];

export default function Sidebar({ page, navigate, avatar }) {
  return (
    <aside className="rail">
      <div className="logo" aria-label="SahbiChat"><Icon name="menu" /></div>
      {links.map(([id, title, icon]) => (
        <button key={id} className={`rail-btn ${page === id ? 'active' : ''}`} title={title} aria-label={title} aria-current={page === id ? 'page' : undefined} onClick={() => navigate(id)}>
          <Icon name={icon} size="lg" />
        </button>
      ))}
      <div className="rail-spacer" />
      <button className="rail-btn" title="Settings" aria-label="Settings" onClick={() => navigate('profile', true)}><Icon name="settings" size="lg" /></button>
      <button className="avatar-button" aria-label="My profile" onClick={() => navigate('profile')}><Avatar src={avatar || avatars.rail} name="Sahbi" className="rail-avatar" /></button>
    </aside>
  );
}
