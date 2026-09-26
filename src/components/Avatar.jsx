export default function Avatar({ src, name, online = false, className = 'ava' }) {
  return (
    <div className={className}>
      <img src={src} alt={name} />
      {online && <i className="presence" />}
    </div>
  );
}
