function injectScript(file_path, tag) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.runtime.getURL(file_path));
  tag.appendChild(script);
}

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type && (event.data.type === 'FROM_EXTERNAL_SCRIPT')) {
    chrome.storage.sync.get(['option_speed', 'option_arrow', 'option_seek'], (data) => {
      const { option_speed, option_arrow, option_seek } = data;
      window.postMessage({ type: 'TO_EXTERNAL_SCRIPT', data: data }, '*');
    });
  }
});

injectScript('inject.js', document.head);