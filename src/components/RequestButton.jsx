import Icon from './Icon.jsx';

export default function RequestButton({ name, requested, toggle, small = false, listing = false }) {
  return (
    <button type="button" className={`${small ? 'add-btn' : 'req-btn'} ${requested ? 'done' : ''}`} title={small ? (requested ? 'Cancel request' : 'Send request') : undefined} aria-label={`${requested ? 'Cancel request to' : 'Send request to'} ${name}`} aria-pressed={requested} onClick={toggle}>
      <Icon name={requested ? 'check' : small ? 'plus' : 'send'} />
      {!small && (requested ? 'Requested' : listing ? 'Request Visit' : 'Send Request')}
    </button>
  );
}
