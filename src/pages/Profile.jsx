import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';

const fields = [['Full name', 'text'], ['Username', 'text'], ['Email', 'email'], ['Phone', 'tel'], ['Location', 'text'], ['Bio', 'textarea']];
const preferences = [
  ['Email notifications', 'New listings, replies and requests'],
  ['SMS alerts for new listings', 'Only for saved searches in Algiers'],
  ['Show my online status', "Contacts can see when you're active"],
];

export default function Profile({ profile, setStore, notify, pickImage }) {
  const [draft, setDraft] = useState(profile);
  useEffect(() => setDraft(profile), [profile]);

  function updateField(index, value) {
    setDraft(previous => ({ ...previous, fields: previous.fields.map((field, position) => position === index ? value : field) }));
  }

  function renderField(index) {
    const [label, type] = fields[index];
    const props = {
      id: `profile-field-${index}`, value: draft.fields[index],
      onChange: event => updateField(index, event.target.value),
      maxLength: type === 'textarea' ? 2000 : 200,
    };
    return <div className="field" key={label}>
      <label htmlFor={props.id}>{label}</label>
      {type === 'textarea' ? <textarea {...props} rows={3} /> : <input {...props} type={type} required={index === 0} />}
    </div>;
  }

  function save(event) {
    event.preventDefault();
    if (!draft.fields[0].trim()) return notify('Enter your full name.');
    setStore(previous => ({ ...previous, profile: { ...draft, fields: draft.fields.map(value => value.trim()) } }));
    notify('Profile changes saved in this browser.');
  }

  return (
    <div className="page-inner">
      <form className="profile-wrap" onSubmit={save}>
        <div className="search-hero" style={{ marginBottom: 20 }}><h1>My Profile</h1><p>Edit your public details — contacts in your network see this information.</p></div>
        <div className="card profile-card">
          <div className="cover profile-cover" style={draft.cover ? { backgroundImage: `url("${draft.cover}")` } : undefined} />
          <div className="profile-top">
            <div className="profile-ava">
              <img src={draft.avatar} alt="Sahbi" />
              <button className="edit-ava" type="button" title="Change photo" aria-label="Change photo" onClick={() => pickImage(image => setDraft(previous => ({ ...previous, avatar: image })))}><Icon name="pencil" /></button>
            </div>
            <div className="p-who"><h2>{profile.fields[0]}</h2><p>Property seeker · Algiers · Member since 2024</p></div>
            <button className="btn-ghost" type="button" onClick={() => pickImage(image => setDraft(previous => ({ ...previous, cover: image })))}><Icon name="camera" /> Cover</button>
          </div>
        </div>
        <div className="card form-card">
          <h3>Personal information</h3>
          <div className="two-col">{renderField(0)}{renderField(1)}</div>
          <div className="two-col">{renderField(2)}{renderField(3)}</div>
          {renderField(4)}{renderField(5)}
        </div>
        <div className="card form-card" id="preferences">
          <h3>Notifications &amp; privacy</h3>
          {preferences.map(([label, description], index) => <div className="toggle-row" key={label}>
            <div className="t-text"><b>{label}</b><span>{description}</span></div>
            <input className="switch" type="checkbox" role="switch" aria-label={label} checked={draft.preferences[index]} onChange={event => {
              const checked = event.target.checked;
              setDraft(previous => ({ ...previous, preferences: previous.preferences.map((value, position) => position === index ? checked : value) }));
            }} />
          </div>)}
        </div>
        <div className="form-actions">
          <button className="btn-ghost" type="button" onClick={() => { setDraft(profile); notify('Unsaved changes discarded.'); }}>Cancel</button>
          <button className="btn-dark" type="submit"><Icon name="check" /> Save Changes</button>
        </div>
      </form>
    </div>
  );
}
