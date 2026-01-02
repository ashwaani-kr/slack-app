let currentChat = null;

const channelsEl = document.getElementById("channels");
const messagesEl = document.getElementById("messages");
const chatTitle = document.getElementById("chatTitle");

let channels = JSON.parse(localStorage.getItem("channels")) || {};
let dms = JSON.parse(localStorage.getItem("dms")) || {};

renderChannels();

function createChannel() {
  const name = prompt("Channel name?");
  if (!name) return;

  channels[name] = channels[name] || [];
  save();
  renderChannels();
}

function renderChannels() {
  channelsEl.innerHTML = "";

  Object.keys(channels).forEach(channel => {
    const li = document.createElement("li");
    li.innerText = `# ${channel}`;
    li.onclick = () => openChat(channel, "channel");
    channelsEl.appendChild(li);
  });
}

function openChat(name, type) {
  currentChat = { name, type };
  chatTitle.innerText = type === "channel" ? `# ${name}` : name;
  messagesEl.innerHTML = "";

  const msgs = (type === "channel" ? channels[name] : dms[name]) || [];
  msgs.forEach(renderMessage);
  scrollToBottom();
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text || !currentChat) return;

  const msg = { user: 'You', text, time: new Date().toLocaleTimeString() };

  if (currentChat.type === "channel") {
    channels[currentChat.name] = channels[currentChat.name] || [];
    channels[currentChat.name].push(msg);
  } else {
    dms[currentChat.name] = dms[currentChat.name] || [];
    dms[currentChat.name].push(msg);
  }

  input.value = "";
  save();
  renderMessage(msg);
  scrollToBottom();
}

function renderMessage(msg) {
  const root = document.createElement('div');
  root.className = 'message';

  const avatar = document.createElement('img');
  avatar.className = 'avatar';
  // simple placeholder avatar using initials background
  const initial = (msg.user && msg.user[0]) ? msg.user[0].toUpperCase() : 'U';
  avatar.src = `https://via.placeholder.com/44/5865f2/ffffff?text=${initial}`;

  const body = document.createElement('div');
  body.className = 'message-body';

  const meta = document.createElement('div');
  meta.className = 'message-meta';
  meta.innerText = `${msg.user || 'User'} • ${msg.time}`;

  const text = document.createElement('div');
  text.className = 'message-text';
  text.innerText = msg.text;

  body.appendChild(meta);
  body.appendChild(text);

  root.appendChild(avatar);
  root.appendChild(body);

  messagesEl.appendChild(root);
}

function scrollToBottom(){
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function save() {
  localStorage.setItem("channels", JSON.stringify(channels));
  localStorage.setItem("dms", JSON.stringify(dms));
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
