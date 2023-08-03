const elements = [
  'ch_addspeed', 'ch_space', 'ch_updown', 'ch_leftright',
  'in_seek', 'ch_volume', 'in_volume', 'ch_intro', 'in_intro'
];

function injectScript(file_path, tag) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.runtime.getURL(file_path));
  tag.appendChild(script);
}

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type && (event.data.type === 'FROM_EXTERNAL_SCRIPT')) {
    chrome.storage.sync.get(elements, function (data) {
      window.postMessage({ type: 'TO_EXTERNAL_SCRIPT', storage: data }, '*');
    });
  }
});

injectScript('inject.js', document.head);