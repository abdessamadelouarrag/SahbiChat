import { useState } from 'react';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';
import RequestButton from '../components/RequestButton.jsx';
import { results } from '../data.js';

const filters = ['All', 'Agents', 'Buyers', 'Listings', 'Rentals', 'Notaries'];

export default function Search({ store, toggleRequest }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const matches = results.filter(result => (filter === 'All' || result.kind === filter) && `${result.name} ${result.meta} ${result.detail}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="page-inner">
      <div className="search-wrap">
        <div className="search-hero">
          <h1>Search</h1>
          <p>Find agents, buyers and listings across your network, then send a connection request.</p>
          <form className="search-bar" onSubmit={event => event.preventDefault()}>
            <Icon name="search" size="lg" />
            <input placeholder="Search people, agencies, listings…" aria-label="Search people, agencies, listings…" value={query} onChange={event => setQuery(event.target.value)} />
            <button className="go" type="submit">Search</button>
          </form>
          <div className="chips">{filters.map(item => <button key={item} className={`chip ${filter === item ? 'on' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        </div>
        {['People', 'Listings'].map(group => {
          const rows = matches.filter(result => (result.kind === 'Listings') === (group === 'Listings'));
          return rows.length > 0 && <div className="result-group" key={group}>
            <div className="section-label">{group}</div>
            {rows.map(result => <div className="card result" key={result.name}>
              {group === 'Listings' ? <div className="result-photo"><img src={result.image} alt={result.imageAlt} /></div> : <Avatar src={result.image} name={result.imageAlt} />}
              <div className="who"><b>{result.name}</b><span>{result.meta}</span><div className="mutual"><Icon name={group === 'Listings' ? 'eye' : 'users'} /> {result.detail}</div></div>
              <RequestButton name={result.name} listing={group === 'Listings'} requested={store.requests[result.name] ?? result.requested} toggle={() => toggleRequest(result.name, result.requested)} />
            </div>)}
          </div>;
        })}
        {matches.length === 0 && <div className="card empty-state" role="status">No results found. Try another name, location, or filter.</div>}
      </div>
    </div>
  );
}
