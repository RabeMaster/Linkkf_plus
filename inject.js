window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data.type && (event.data.type === 'TO_EXTERNAL_SCRIPT')) {
        const storage = event.data.storage;

        var old_player = videojs('my-video');
        var save_video = old_player.src();
        var save_vtt;
        old_player.textTracks().tracks_.forEach(function (element) {
            if (element.src && element.src.includes('.vtt')) {
                save_vtt = element.src;
            }
        });
        old_player.dispose();

        document.body.innerHTML += `
        <video id="my-video" class="video-js vjs-default-skin vjs-16-9" controlsList="nodownload" preload="none" controls preload="auto" poster="/bl.jpg" data-setup="{}">
  <track kind="captions" src="` + save_vtt + `" srclang="sub" label="sub" default >
  <source src="` + save_video + `" type="application/x-mpegURL" />
  </video>`;

        videojs('my-video', {
            playbackRates: storage.ch_addspeed ? [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10] : [0.5, 1, 1.5, 2]
        });
        var player = videojs('my-video');
        player.seekButtons({
            forward: parseInt(storage.in_seek),
            back: parseInt(storage.in_seek)
        });
        if (storage.ch_intro) {
            player.seekButtons({ forward: parseInt(storage.in_intro) });
        }
        //player.aspectRatioPanel();
        player.mobileUi();

        if (storage.ch_volume) {
            player.volume(parseFloat(storage.in_volume));
        }

        document.addEventListener("keydown", function (event) {
            const LEFT = 37;
            const RIGHT = 39;
            const SPACE = 32;
            const UP = 38;
            const DOWN = 40;

            if (storage.ch_leftright && event.keyCode == LEFT) {
                player.currentTime(player.currentTime() - parseInt(storage.in_seek));
            } else if (storage.ch_leftright && event.keyCode == RIGHT) {
                player.currentTime(player.currentTime() + parseInt(storage.in_seek));
            } else if (storage.ch_space && event.keyCode == SPACE) {
                player.paused() ? player.play() : player.pause();
            } else if (storage.ch_updown && event.keyCode == UP) {
                (player.volume() < 1) ? player.volume(player.volume() + 0.05) : null;
            } else if (storage.ch_updown && event.keyCode == DOWN) {
                (player.volume() > 0) ? player.volume(player.volume() - 0.05) : null;
            }
        });
    }
});

window.postMessage({ type: 'FROM_EXTERNAL_SCRIPT' }, '*');