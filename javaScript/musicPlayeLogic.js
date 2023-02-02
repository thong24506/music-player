const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        var musicList = $('.music-warehouse');
        var musicPlaying = $('.music-play');
        var isPlaying = false;
        musicList.style.margin = musicPlaying.offsetHeight + 'px' + ' 0' + ' 0' + ' 0';
        var audio = $('#audio');
        var myRange = $('#myRange');
        var nowPlayingMusicImg = $('.now-playing-music-img');
        var nextBtn = $('.next-song');
        var backBtn = $('.back-song');
        var btnRandom = $('.btn-random');
        var btnAgian = $('.btn-agian');
        var listMusic = $('.music-list');

        var app = {

            currentIndex: 0,

            songs: [
                {
                    id: 1,
                    name: 'Don\'t Break My Heart',
                    singer:'Binz',
                    path: './assets/music/music-1.mp3',
                    image: './assets/img/music-1.jpg'
                },
                {
                    id: 2,
                    name: 'Bigcityboi',
                    singer:'Binz, Touliver',
                    path: './assets/music/music-2.mp3',
                    image: './assets/img/music-2.jpg'
                },
                {
                    id: 3,
                    name: 'Sao Cũng Được',
                    singer:'Binz',
                    path: './assets/music/music-3.mp3',
                    image: './assets/img/music-3.jpg'
                },
                {
                    id: 4,
                    name: 'Gene',
                    singer:'Binz, Touliver',
                    path: './assets/music/music-4.mp3',
                    image: './assets/img/music-4.jpg'
                },
                {
                    id: 5,
                    name: 'They Said',
                    singer:'Binz, Touliver',
                    path: './assets/music/music-5.mp3',
                    image: './assets/img/music-5.jpg'
                },
                {
                    id: 6,
                    name: 'OK',
                    singer:'Binz',
                    path: './assets/music/music-6.mp3',
                    image: './assets/img/music-6.jpg'
                },
                {
                    id: 7,
                    name: 'Sofar',
                    singer:'Binz',
                    path: './assets/music/music-7.mp3',
                    image: './assets/img/music-7.jpg'
                },
                {
                    id: 8,
                    name: 'Luật Rừng',
                    singer:'Binz, Rhymastic, 16 Typh, Gonzo',
                    path: './assets/music/music-8.mp3',
                    image: './assets/img/music-8.jpg'
                },
                {
                    id: 9,
                    name: 'Krazy',
                    singer:'Binz, Touliver, Andree, Evy',
                    path: './assets/music/music-9.mp3',
                    image: './assets/img/music-9.jpg'
                },
                {
                    id: 10,
                    name: 'Cho Mình Em',
                    singer:'Binz, Đen Vâu',
                    path: './assets/music/music-10.mp3',
                    image: './assets/img/music-10.jpg'
                },
            ],
            
            render: function() {
                const html = this.songs.map((song, index) => {
                    return `
                    <li class="music-item ${index === this.currentIndex ? 'active' : ''}" data-index="${song.id}">
                        <div class="music-img" style="background-image: url('${song.image}');" ></div>
                        <div class="music-information">
                            <h2 class="music-name">${song.name}</h2>
                            <span class="music-singer">${song.singer}</span>
                        </div>
                        <i class="music-ellipsis fa-solid fa-ellipsis"></i>
                    </li>
                    `
                });
                $('.music-list').innerHTML = html.join('');
            },

            handleEvents: function() {
                var _this = this;
                // Xử lý phóng to thu nhỏ cd
                const nowPlayingMusicImgWidth = nowPlayingMusicImg.offsetWidth;
                const nowPlayingMusicImgHeight = nowPlayingMusicImg.offsetHeight;
                document.onscroll = function() {
                    const scrollTop = window.screenY || document.documentElement.scrollTop;
                    const newNowPlayingMusicImgWidth =  nowPlayingMusicImgWidth - scrollTop;
                    const newNowPlayingMusicImgHeight = nowPlayingMusicImgHeight - scrollTop;
                    nowPlayingMusicImg.style.width = newNowPlayingMusicImgWidth > 0 ? newNowPlayingMusicImgWidth + 'px' : 0 ;
                    nowPlayingMusicImg.style.height = newNowPlayingMusicImgWidth > 0 ? newNowPlayingMusicImgHeight + 'px' : 0;
                    nowPlayingMusicImg.style.opacity = newNowPlayingMusicImgWidth > 0 ? newNowPlayingMusicImgHeight / nowPlayingMusicImgHeight : 0;
                }

                // Xử lý quay cd
                var cdPlay = nowPlayingMusicImg.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 10000,
                    iterations: Infinity
                });
                
                cdPlay.pause();

                audio.onplay = function() {
                    cdPlay.play();
                };

                audio.onpause = function() {
                    cdPlay.pause();
                };

                // Xử lý phát nhạc
                var playBtn = $('.nav-item-play');
                var player = $('.player');
                playBtn.onclick =  function() {
                    if(isPlaying) {
                        isPlaying = false;
                        audio.pause();
                    } else {
                        isPlaying = true;
                        audio.play();
                    }
                        player.classList.toggle('fa-pause');
                        player.classList.toggle('fa-play');
                }

                // Khi tiến độ bài hát thay đổi 
                audio.ontimeupdate = function() {
                    if (audio.duration) {
                        var currentAudio = Math.floor(audio.currentTime / audio.duration * 100);
                        myRange.value = currentAudio;
                    }
                }

                // Xử lý khi tua bài hát
                myRange.onchange = function(e) {
                    audio.currentTime = Math.ceil(e.target.value / 100 * audio.duration);
                }

                // Xử lý next bài hát
                nextBtn.onclick = function() {
                    if (btnRandom.classList.contains('color')) {
                        _this.playRandomSong();
                    } else {
                        _this.nextSong();
                    }
                    myRange.value = 0;
                    isPlaying = true;
                    audio.play();
                    if (player.classList.contains('fa-play')) {
                        player.classList.toggle('fa-play');
                        player.classList.toggle('fa-pause');
                    }
                    _this.render();
                    _this.toShowMusic();
                }

                // Xử lý back bài hát
                backBtn.onclick = function() {
                    if (btnRandom.classList.contains('color')) {
                        _this.playRandomSong();
                    } else {
                        _this.backSong();
                    }
                    myRange.value = 0;
                    isPlaying = true;
                    audio.play();
                    if (player.classList.contains('fa-play')) {
                        player.classList.toggle('fa-play');
                        player.classList.toggle('fa-pause');
                    }
                    _this.render();
                    _this.toShowMusic();
                }

                // if(btnRandom.classList.contains('color')) {

                // }

                // Xử lý random bài hát khi hết nhạc
                btnRandom.onclick = function() {
                    btnRandom.classList.toggle('color');
                    if(btnAgian.classList.contains('color')) {
                        btnAgian.classList.remove('color');
                    }
                }

                // Xử lý nút phát lại liên tục một bài
                btnAgian.onclick = function() {
                    btnAgian.classList.toggle('color');
                    if(btnRandom.classList.contains('color')) {
                        btnRandom.classList.remove('color');
                    }
                }

                // Xử lý khi bài hát kết thúc
                audio.onended = function() {
                    if(btnAgian.classList.contains('color')) {
                        myRange.value = 0;
                        isPlaying = true;
                        audio.play();
                        if (player.classList.contains('fa-play')) {
                            player.classList.toggle('fa-play');
                            player.classList.toggle('fa-pause');
                        }
                    } else {
                        nextBtn.onclick();
                    }
                }

                // Xử lý khi click vào list music
                listMusic.onclick = function(e) {
                    const musicOnClick = e.target.closest('.music-item:not(.active)');
                    const ellipsisOnClick = e.target.closest('.music-ellipsis');
                    if (musicOnClick && !ellipsisOnClick) {
                        _this.currentIndex = Number.parseInt(musicOnClick.getAttribute('data-index')) -1;
                        _this.loadCurrentSong();
                        _this.render(); 
                        myRange.value = 0;
                        isPlaying = true;
                        audio.play();
                        if (player.classList.contains('fa-play')) {
                            player.classList.toggle('fa-play');
                            player.classList.toggle('fa-pause');
                        }
                    }
                }
                
            },

            defineProperties: function() {
                return this.songs[this.currentIndex];
            },

            loadCurrentSong: function() {
                $('.now-playing-header').innerText = this.defineProperties().name;
                $('.now-playing-music-img').style.background = 'url(' + this.defineProperties().image + ') center / cover no-repeat';
                audio.src = this.defineProperties().path;
            },

            nextSong: function() {
                this.currentIndex ++;
                if (this.currentIndex >= this.songs.length) {
                    app.currentIndex = 0;
                }
                this.loadCurrentSong();
            },

            backSong: function() {
                this.currentIndex --;
                if (this.currentIndex < 0) {
                    app.currentIndex = app.songs.length - 1;
                }
                this.loadCurrentSong();
            },

            playRandomSong: function() {
                const currentIndexFake = app.currentIndex;
                do {
                    app.currentIndex = Math.floor(Math.random() * this.songs.length);
                } while(app.currentIndex === currentIndexFake);
                this.loadCurrentSong();
            },
            toShowMusic: function() {
                if (this.currentIndex === 0 || this.currentIndex === 1 || this.currentIndex === 2) {
                    setTimeout(() => {
                        $('.music-item.active').scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                } else {
                    setTimeout(() => {
                        $('.music-item.active').scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            },

            start: function() {

                // Lắng nghe / xử lý các sự kiện (DOM events)
                this.handleEvents();

                this.loadCurrentSong();

                // Render playlist
                this.render();
            }
        }

        app.start();
