chrome.runtime.onInstalled.addListener(function() {
  const initialSettings = {
    ch_addspeed: true,
    ch_space: true,
    ch_updown: true,
    ch_leftright: true,
    in_seek: 10,
    ch_volume: true,
    in_volume: 0.9,
    ch_intro: false,
    in_intro: 80
  };

  chrome.storage.sync.set(initialSettings);
});