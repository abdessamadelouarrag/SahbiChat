import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import { profile as defaultProfile } from './data.js';

const pageNames = { home: 'Home', search: 'Search', chat: 'Messages', profile: 'My Profile' };
const currentPage = () => pageNames[location.hash.slice(1)] ? location.hash.slice(1) : 'home';

function loadSavedState() {
  const defaults = { posts: {}, requests: {}, messages: {}, reactions: {}, comments: {} };
  try {
    const saved = JSON.parse(localStorage.getItem('sahbichat:v1'));
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults;
    return {
      ...defaults,
      ...saved,
      profile: saved.profile ? {
        ...defaultProfile,
        ...saved.profile,
        avatar: (saved.profile.avatar || defaultProfile.avatar).replace(/^https?:\/\/localhost:\d+\/public\/assets\//, '/assets/'),
      } : undefined,
    };
  } catch { return defaults; }
}

export default function App() {
  const [page, setPage] = useState(currentPage);
  const [store, setStore] = useState(loadSavedState);
  const [notification, setNotification] = useState('');
  const [dialog, setDialog] = useState(null);
  const [contact, setContact] = useState('Omar Ziani');
  const [conversationOpen, setConversationOpen] = useState(false);
  const dialogRef = useRef(null);
  const fileRef = useRef(null);
  const imageHandler = useRef(null);
  const profile = store.profile || defaultProfile;

  useEffect(() => {
    try { localStorage.setItem('sahbichat:v1', JSON.stringify(store)); }
    catch { setNotification('Your browser could not save this change. It is available for this session.'); }
  }, [store]);

  useEffect(() => {
    document.title = `SahbiChat — ${pageNames[page]}`;
  }, [page]);

  useEffect(() => {
    const onBack = () => setPage(currentPage());
    window.addEventListener('popstate', onBack);
    return () => window.removeEventListener('popstate', onBack);
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(''), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (dialog && !dialogRef.current.open) dialogRef.current.showModal();
    if (!dialog && dialogRef.current.open) dialogRef.current.close();
  }, [dialog]);

  useEffect(() => {
    if (location.hash.startsWith('#post-')) document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'center' });
  }, []);

  function navigate(next, settings = false) {
    setPage(next);
    if (location.hash !== `#${next}`) history.pushState(null, '', `#${next}`);
    if (settings) requestAnimationFrame(() => document.getElementById('preferences')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }

  function openContact(name) {
    setContact(name);
    setConversationOpen(true);
    navigate('chat');
  }

  function toggleRequest(name, initial = false) {
    setStore(previous => ({
      ...previous,
      requests: { ...previous.requests, [name]: !(previous.requests[name] ?? initial) },
    }));
  }

  function pickImage(callback) {
    imageHandler.current = callback;
    fileRef.current.value = '';
    fileRef.current.click();
  }

  function readImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setNotification('Choose an image file.');
    if (file.size > 3 * 1024 * 1024) return setNotification('Choose an image smaller than 3 MB.');
    const reader = new FileReader();
    reader.onload = () => imageHandler.current?.(reader.result);
    reader.readAsDataURL(file);
  }

  const shared = { store, setStore, notify: setNotification, showDialog: setDialog, pickImage };

  return (
    <>
      <div className="app">
        <Sidebar page={page} navigate={navigate} avatar={store.profile?.avatar} />
        <main>
          <section className="page page-home" hidden={page !== 'home'}>
            <Home {...shared} profile={profile} openContact={openContact} navigate={navigate} toggleRequest={toggleRequest} />
          </section>
          <section className="page page-search" hidden={page !== 'search'}>
            <Search store={store} toggleRequest={toggleRequest} />
          </section>
          <section className={`page page-chat ${conversationOpen ? 'conversation-open' : ''}`} hidden={page !== 'chat'}>
            <Messages {...shared} contact={contact} openContact={openContact} closeConversation={() => setConversationOpen(false)} />
          </section>
          <section className="page page-profile" hidden={page !== 'profile'}>
            <Profile {...shared} profile={profile} />
          </section>
        </main>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={readImage} />
      {notification && <div className="toast" role="status">{notification}</div>}
      <dialog ref={dialogRef} aria-labelledby="dialog-title" onClose={() => setDialog(null)} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setDialog(null);
      }}>
        <div className="dialog-head">
          <h2 id="dialog-title">{dialog?.title}</h2>
          <button type="button" aria-label="Close dialog" onClick={() => setDialog(null)}>×</button>
        </div>
        <div className="dialog-content">{dialog?.content}</div>
      </dialog>
    </>
  );
}
