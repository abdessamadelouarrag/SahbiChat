import { useState } from 'react';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

export default function Post({ post, store, setStore, notify, showDialog }) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const reaction = store.reactions[post.id] || { liked: post.liked, saved: false };
  const comments = store.comments[post.id] || [];

  function changeReaction(key) {
    setStore(previous => ({
      ...previous,
      reactions: { ...previous.reactions, [post.id]: { ...reaction, [key]: !reaction[key] } },
    }));
  }

  function addComment(event) {
    event.preventDefault();
    if (!comment.trim()) return;
    setStore(previous => ({ ...previous, comments: { ...previous.comments, [post.id]: [...(previous.comments[post.id] || []), comment.trim()] } }));
    setComment('');
  }

  async function share() {
    const link = `${location.origin}${location.pathname}#post-${post.id}`;
    try { await navigator.clipboard.writeText(link); notify('Post link copied.'); }
    catch { showDialog({ title: 'Share post', content: <p>{link}</p> }); }
  }

  return (
    <article className="card post" id={`post-${post.id}`}>
      <div className="post-head">
        <Avatar src={post.avatar} name={post.name} online={post.online} />
        <div className="who"><b>{post.name}</b><span>{post.meta}</span></div>
        <button className="post-more" aria-label="Post options" onClick={() => showDialog({ title: 'Post options', content: <button className="btn-dark" onClick={() => { changeReaction('saved'); showDialog(null); }}>{reaction.saved ? 'Remove from saved posts' : 'Save post'}</button> })}><Icon name="dots" /></button>
      </div>
      <div className="post-body">{post.text}</div>
      {post.image && <div className="post-media"><img src={post.image} alt={post.imageAlt || 'Shared photo'} /></div>}
      <div className="post-stats">
        <button className={`stat-btn ${reaction.liked ? 'liked' : ''}`} aria-label={reaction.liked ? 'Unlike post' : 'Like post'} aria-pressed={reaction.liked} onClick={() => changeReaction('liked')}><Icon name="heart" /> {post.likes + Number(reaction.liked) - Number(post.liked)}</button>
        <button className="stat-btn" aria-label="Show comments" onClick={() => setCommentsOpen(!commentsOpen)}><Icon name="message-circle" /> {post.comments + comments.length}</button>
        <button className="stat-btn" aria-label="Share post" onClick={share}><Icon name="share" /> {post.shares}</button>
        <button className="stat-btn" style={{ marginLeft: 'auto' }} aria-pressed={reaction.saved} onClick={() => changeReaction('saved')}><Icon name="bookmark" /> {reaction.saved ? 'Saved' : 'Save'}</button>
      </div>
      {commentsOpen && <>
        <div className="comment-list">{comments.map((text, index) => <p key={index}>{text}</p>)}</div>
        <form className="comment-form" onSubmit={addComment}>
          <input aria-label="Write a comment" placeholder="Write a comment…" value={comment} onChange={event => setComment(event.target.value)} maxLength={2000} required autoFocus />
          <button className="btn-dark" type="submit">Post</button>
        </form>
      </>}
    </article>
  );
}
