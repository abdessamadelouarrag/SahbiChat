import { useRef, useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';
import { avatars, contacts, conversation } from '../data.js';

const waveform = [8, 16, 6, 22, 12, 4, 18, 10, 20, 8, 14, 2, 16, 8, 22, 10, 4, 16, 8, 20, 8, 2, 14, 8, 6];
const stats = [['eye', 'Daily Visitors', '2,429'], ['calendar', 'Building Age', '3Y'], ['temperature', 'Temperature', '28°F']];

function Message({ message, name, avatar, notify, showDialog }) {
  let content;
  if (message.type === 'voice') {
    content = <div className="voice">
      <button className="play-btn" aria-label="Play voice message" onClick={() => notify('This reference voice message does not include an audio file.')}><Icon name="player-play" /></button>
      <svg width="150" height="26" viewBox="0 0 150 26" fill="currentColor" style={{ color: 'var(--gesso-fg)' }} aria-hidden="true">{waveform.map((height, index) => <rect key={index} x={index * 6} y={(26 - height) / 2} width="3" height={height} rx={height === 2 ? 1 : 1.5} />)}</svg>
      <time>2:19</time>
    </div>;
  } else if (message.type === 'stats') {
    content = <div className="stat-card"><p>{message.text}</p><div className="stat-tiles">{stats.map(([icon, label, value]) => <div className="stat-tile" key={label}><div className="t-ic"><Icon name={icon} size="lg" /></div><span>{label}</span><b>{value}</b></div>)}</div></div>;
  } else if (message.type === 'photos') {
    content = <div className="photo-card"><p>{message.text}</p><div className="photo-grid">{message.photos.map((photo, index) => <div className="photo-cell" key={photo.src} role="button" tabIndex={0} aria-label={`View ${photo.alt.toLowerCase()} photo`} onClick={() => showDialog({ title: photo.alt, content: <img src={photo.src} alt={photo.alt} /> })} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showDialog({ title: photo.alt, content: <img src={photo.src} alt={photo.alt} /> }); }
    }}><img src={photo.src} alt={photo.alt} />{index === 2 && <div className="photo-more">3+</div>}</div>)}</div></div>;
  } else {
    const attachment = message.attachment || (message.mine ? message.image : undefined);
    content = <div className={`bubble ${message.mine ? 'light' : 'dark'}`}>{attachment && <img src={attachment} alt="Attached photo" />}{message.text}</div>;
  }

  return <div className={`msg-row ${message.mine ? 'me' : ''}`}>
    {!message.mine && <Avatar src={message.image || avatar} name={name} />}
    <div className="msg-stack">{content}<div className={`stamp ${message.mine ? 'right' : ''}`} style={message.type === 'voice' ? { marginTop: 6 } : undefined}>{message.time}</div></div>
  </div>;
}

export default function Messages({ store, setStore, contact, openContact, closeConversation, notify, showDialog, pickImage }) {
  const [query, setQuery] = useState('');
  const [drafts, setDrafts] = useState({});
  const [readContacts, setReadContacts] = useState([]);
  const scrollRef = useRef(null);
  const person = contacts.find(person => person.name === contact) || contacts[6];
  const savedMessages = store.messages[person.name] || [];
  const seed = person.name === 'Omar Ziani' ? conversation : person.typing ? [] : [{ type: 'text', text: person.preview.replace(/…$/, ''), time: person.time }];
  const visibleContacts = contacts.filter(person => person.name.toLowerCase().includes(query.toLowerCase().trim()));

  function send(attachment) {
    const text = (drafts[person.name] || '').trim();
    if (!text && !attachment) return;
    const time = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Casablanca' }).format(new Date());
    const message = { mine: true, type: 'text', text, attachment, time };
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [person.name]: [...(previous.messages[person.name] || []), message] } }));
    setDrafts(previous => ({ ...previous, [person.name]: '' }));
    requestAnimationFrame(() => { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; });
  }

  return (
    <div className="chat-grid">
      <div className="contacts">
        <div className="contact-search"><Icon name="search" /><input placeholder="Search" aria-label="Search conversations" value={query} onChange={event => setQuery(event.target.value)} /></div>
        <h2>Messages</h2>
        {visibleContacts.map(item => {
          const latest = store.messages[item.name]?.at(-1);
          const select = () => { setReadContacts(previous => [...previous, item.name]); openContact(item.name); };
          return <div className={`contact ${person.name === item.name ? 'active' : ''}`} key={item.name} role="button" tabIndex={0} aria-label={`Open conversation with ${item.name}`} aria-pressed={person.name === item.name} onClick={select} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } }}>
            <Avatar src={item.image} name={item.name} online={item.online} />
            <div className="who"><b>{item.name}</b><span className={item.typing && !latest ? 'typing' : ''}>{latest ? latest.text || 'Photo' : item.preview}</span></div>
            <div className="meta"><time>{latest?.time || item.time}</time>{item.unread && !readContacts.includes(item.name) ? <i className="unread">{item.unread}</i> : <Icon name="check" className="seen" />}</div>
          </div>;
        })}
        {visibleContacts.length === 0 && <p className="empty-state">No conversations found.</p>}
      </div>
      <div className="chat-pane">
        <div className="chat-head">
          <button className="chat-back" aria-label="Back to conversations" onClick={closeConversation}>‹</button>
          <Avatar src={person.name === 'Omar Ziani' ? avatars.chat : person.image} name={person.name} />
          <div><h2>{person.name}</h2><div className="online">{person.online && <i />}{person.online ? 'Online' : 'Offline'}</div></div>
          <div className="chat-head-actions">
            <button title="Call" aria-label="Call" onClick={() => notify('Calls are unavailable in this local preview.')}><Icon name="phone" size="lg" /></button>
            <button title="Video" aria-label="Video" onClick={() => notify('Video calls are unavailable in this local preview.')}><Icon name="video" size="lg" /></button>
            <button title="More" aria-label="More" onClick={() => showDialog({ title: 'Contact details', content: <><p>{person.name}</p><p>{person.online ? 'Online' : 'Offline'}</p></> })}><Icon name="dots" size="lg" /></button>
          </div>
        </div>
        <div className="chat-scroll" ref={scrollRef} role="log" aria-label="Conversation" aria-live="polite">
          {[...seed, ...savedMessages].map((message, index) => <Message key={`${person.name}-${index}`} {...{ message, name: person.name, avatar: person.image, notify, showDialog }} />)}
        </div>
        <form className="chat-input" onSubmit={event => { event.preventDefault(); send(); }}>
          <button className="clip" type="button" aria-label="Attach a photo" onClick={() => pickImage(send)}><Icon name="paperclip" size="lg" /></button>
          <input placeholder="Write a Message" aria-label="Write a Message" value={drafts[person.name] || ''} onChange={event => setDrafts(previous => ({ ...previous, [person.name]: event.target.value }))} maxLength={10000} />
          <button className="mic-btn" type="button" title="Voice message" aria-label="Voice message" onClick={() => notify('Voice messages are unavailable in this local preview.')}><Icon name="microphone" size="lg" /></button>
          <button className="send-btn" type="submit" title="Send" aria-label="Send"><Icon name="send" size="lg" /></button>
        </form>
      </div>
    </div>
  );
}
