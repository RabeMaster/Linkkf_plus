const elements = [
  'ch_addspeed', 'ch_space', 'ch_updown', 'ch_leftright',
  'in_seek', 'ch_volume', 'in_volume', 'ch_intro', 'in_intro'
];

elements.forEach(elementId => {
  const element = document.getElementById(elementId);

  element.addEventListener('change', () => {
    const key = elementId;
    if (elementId.includes('ch_')) {
      chrome.storage.sync.set({ [key]: element.checked });
    } else {
      chrome.storage.sync.set({ [key]: element.value });
    }
  });
});

function loadSettingsFromStorage() {
  chrome.storage.sync.get(elements, function (data) {
    elements.forEach(elementId => {
      const element = document.getElementById(elementId);

      if (elementId.includes('ch_')) {
        element.checked = data[elementId];
      } else {
        element.value = data[elementId];
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadSettingsFromStorage);