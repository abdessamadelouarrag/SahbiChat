const shapes = {
  "menu": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></>,
  "home": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" /></g></>,
  "search": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6" /></>,
  "message": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" /></>,
  "user": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></>,
  "settings": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" /></g></>,
  "bell": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1" /></>,
  "plus": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" /></>,
  "photo": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" /><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5" /><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3" /></g></>,
  "building": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /></>,
  "dots": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" /></>,
  "heart": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" /></>,
  "message-circle": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z" /></>,
  "share": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4" /></>,
  "bookmark": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M18 7v14l-6-4l-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4" /></>,
  "calendar": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3" /></>,
  "users": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" /></>,
  "send": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z" /></>,
  "eye": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" /><path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" /></g></>,
  "check": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m5 12l5 5L20 7" /></>,
  "phone": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></>,
  "video": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>,
  "player-play": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 4v16l13-8z" /></>,
  "temperature": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10 13.5a4 4 0 1 0 4 0V5a2 2 0 0 0-4 0zM10 9h4" /></>,
  "paperclip": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3L18 10a3 3 0 0 0-6-6l-6.5 6.5a4.5 4.5 0 0 0 9 9L21 13" /></>,
  "microphone": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5a3 3 0 0 1 3-3a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3a3 3 0 0 1-3-3z" /><path d="M5 10a7 7 0 0 0 14 0M8 21h8m-4-4v4" /></g></>,
  "pencil": <><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4" /></>,
  "camera": <><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0" /></g></>,
};

export default function Icon({ name, size = '', className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-icon-style="line" className={`ic ${size ? `ic-${size}` : ''} ${className}`} aria-hidden="true" focusable="false">
      {shapes[name] || shapes.message}
    </svg>
  );
}
