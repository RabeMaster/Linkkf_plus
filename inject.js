window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data.type && (event.data.type === 'TO_EXTERNAL_SCRIPT')) {
        const storage = event.data.data;

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
            playbackRates: storage.option_speed ? [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10] : [0.5, 1, 1.5, 2]
        });
        var player = videojs('my-video');
        player.seekButtons({
            forward: storage.option_seek,
            back: storage.option_seek
        });
        player.aspectRatioPanel();
        player.mobileUi();
        if (storage.option_arrow) {
            document.addEventListener("keydown", function (event) {
                const LEFT = 37;
                const RIGHT = 39;
                const SPACE = 32;

                if (event.keyCode === LEFT) {
                    player.currentTime(player.currentTime() - storage.option_seek)
                } else if (event.keyCode === RIGHT) {
                    player.currentTime(player.currentTime() + storage.option_seek)
                } else if (event.keyCode === SPACE) {
                    player.paused() ? player.play() : player.pause();
                }
            });
        }
    }
});

window.postMessage({ type: 'FROM_EXTERNAL_SCRIPT' }, '*');