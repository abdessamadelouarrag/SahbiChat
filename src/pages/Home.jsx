import { useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';
import Post from '../components/Post.jsx';
import RequestButton from '../components/RequestButton.jsx';
import { avatars, online, posts, stories, suggestions } from '../data.js';

function Week() {
  return <>
    <div className="side-row"><div className="ava week-icon"><Icon name="calendar" size="lg" /></div><div><b>3 viewings booked</b><span>Thu–Sat this week</span></div></div>
    <div className="side-row"><div className="ava week-icon"><Icon name="message" size="lg" /></div><div><b>9 new messages</b><span>from 5 contacts</span></div></div>
  </>;
}

export default function Home({ store, setStore, profile, notify, showDialog, pickImage, openContact, navigate, toggleRequest }) {
  const [draft, setDraft] = useState('');
  const [notificationsRead, setNotificationsRead] = useState(false);
  const localPosts = Object.entries(store.posts).map(([id, post]) => ({
    ...post, id, name: profile.fields[0], meta: 'Just now · Your network',
    avatar: profile.avatar, likes: 0, comments: 0, shares: 0, liked: false,
  })).reverse();

  function addPost(text, image) {
    const id = `local-${Date.now()}`;
    setStore(previous => ({ ...previous, posts: { ...previous.posts, [id]: { text, image } } }));
    setDraft('');
    notify('Posted to your local feed.');
  }

  function composeListing() {
    showDialog({ title: 'Share a listing', content: <form onSubmit={event => {
      event.preventDefault();
      const text = event.currentTarget.elements.description.value.trim();
      if (!text) return;
      addPost(text); showDialog(null);
    }}>
      <div className="field"><label htmlFor="listing-description">Listing details</label><textarea id="listing-description" name="description" defaultValue={draft} maxLength={5000} required /></div>
      <button className="btn-dark" type="submit">Share listing</button>
    </form> });
  }

  function storyClick(story) {
    showDialog({ title: story.name, content: <img src={story.image} alt={story.alt} /> });
  }

  const interactive = (callback, name) => ({
    role: 'button', tabIndex: 0, 'aria-label': name, onClick: callback,
    onKeyDown: event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); callback(); } },
  });

  return (
    <div className="home-scroll">
      <div className="home-grid">
        <div className="feed">
          <div className="topline">
            <div><h1>Good morning, Sahbi</h1><p>Wednesday, 15 October · 4 new listings from your network</p></div>
            <button className="icon-pill" title="Notifications" aria-label="Notifications" onClick={() => { setNotificationsRead(true); showDialog({ title: 'Notifications', content: <Week /> }); }}><Icon name="bell" size="lg" />{!notificationsRead && <i className="dot-badge" />}</button>
          </div>
          <div className="card stories">
            <div className="story add" {...interactive(() => {
              if (store.story) return storyClick({ name: 'Your story', image: store.story, alt: 'Your story' });
              pickImage(image => { setStore(previous => ({ ...previous, story: image })); storyClick({ name: 'Your story', image, alt: 'Your story' }); });
            }, 'Your story')}>
              <div className="story-ring"><div className="story-ring-inner"><Icon name="plus" /></div></div><small>Your story</small>
            </div>
            {stories.map(story => <div className="story" key={story.name} {...interactive(() => storyClick(story), `${story.name} story`)}>
              <div className="story-ring"><div className="story-ring-inner"><img src={story.image} alt={story.alt} /></div></div><small>{story.name}</small>
            </div>)}
          </div>
          <div className="card composer">
            <Avatar src={store.profile?.avatar || avatars.composer} name="Sahbi" className="mini-ava" />
            <input className="composer-input" placeholder="Share a listing, ask your network…" aria-label="Share a listing, ask your network…" value={draft} onChange={event => setDraft(event.target.value)} maxLength={5000} onKeyDown={event => {
              if (event.key === 'Enter' && draft.trim()) { event.preventDefault(); addPost(draft.trim()); }
            }} />
            <div className="composer-actions">
              <button title="Photo" aria-label="Photo" onClick={() => pickImage(image => addPost(draft.trim(), image))}><Icon name="photo" size="lg" /></button>
              <button title="Listing" aria-label="Listing" onClick={composeListing}><Icon name="building" size="lg" /></button>
            </div>
          </div>
          {[...localPosts, ...posts].map(post => <Post key={post.id} {...{ post, store, setStore, notify, showDialog }} />)}
        </div>
        <aside className="side">
          <div className="card side-card">
            <h3>Online now <a href="#chat" onClick={event => { event.preventDefault(); navigate('chat'); }}>See all</a></h3>
            {online.map(person => <div className="side-row" data-person={person.name} key={person.name} {...interactive(() => openContact(person.name), `Message ${person.name}`)}>
              <Avatar src={person.image} name={person.name} online /><div><b>{person.name}</b><span>{person.meta}</span></div>
            </div>)}
          </div>
          <div className="card side-card">
            <h3>Suggested for you</h3>
            {suggestions.map(person => <div className="side-row" key={person.name}>
              <Avatar src={person.image} name={person.name} /><div><b>{person.name}</b><span>{person.meta}</span></div>
              <RequestButton name={person.name} small requested={store.requests[person.name] ?? false} toggle={() => toggleRequest(person.name)} />
            </div>)}
          </div>
          <div className="card side-card"><h3>your week</h3><Week /></div>
        </aside>
      </div>
    </div>
  );
}
