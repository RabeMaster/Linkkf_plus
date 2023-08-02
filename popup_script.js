const option_arrow = document.getElementById('option_arrow');
const seek_input = document.getElementById('seek_input');

document.getElementById('btn_save').addEventListener('click', () => {
  const option_speed = document.getElementById('option_speed').checked;
  const option_arrow = document.getElementById('option_arrow').checked;
  option_seek = parseInt(document.getElementById('option_seek').value);
  saveOptions(option_speed, option_arrow, option_seek);
});

function saveOptions(option_speed, option_arrow, option_seek) {
  const options = {
    option_speed: option_speed,
    option_arrow: option_arrow,
    option_seek: option_seek
  };

  chrome.storage.sync.set(options, () => {
    console.log('설정이 저장되었습니다.');
  });
}

function loadOptions() {
  chrome.storage.sync.get(['option_speed', 'option_arrow', 'option_seek'], (data) => {
    const { option_speed, option_arrow, option_seek } = data;
    if (!option_speed && !option_arrow && !option_seek) {
      saveOptions(true, true, 10);
      loadOptions();
      return;
    }
    document.getElementById('option_speed').checked = option_speed;
    document.getElementById('option_arrow').checked = option_arrow;
    document.getElementById('option_seek').value = option_seek;
  });
}

loadOptions();