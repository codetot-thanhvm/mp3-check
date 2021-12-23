const song = document.getElementById('song');
const thumb = document.getElementById('img');
const musicbackground = document.querySelector('body');
const music = document.querySelector(".music")
const namemusic = document.querySelector('.name-inner');
const timenow = document.querySelector('.duration');
const timeall = document.querySelector('.remaining');
const playBtn = document.querySelector('.player-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');
const randomBtn = document.querySelector('.random-Btn');
const reloadBtn = document.querySelector('.reload-Btn');
const range = document.getElementById('range');
const timer = document.querySelector('.timer');
const controls = document.querySelector('.controls');
const nameinner = document.querySelector('.music-name');
let isPlaying = true;
let indexSong = 0;
let random = false;
let reload = false;
let whitecolor = true;
const musics = ["tinylove.mp3","thoiquen.mp3","bleu.mp3", "biettimdau.mp3","troivedau.mp3","thethoi.mp3","vimotcaunoi.mp3","xichthemchut.mp3","contholacongo.mp3","ngaymailatuonglai.mp3","saigoncoem.mp3","em.mp3","luckyboy.mp3","ngonnen.mp3"];
const img = ["tinylove.png", "thoiquen.png", "avatar.jpg", "biettimdau.png","troivedau.png","thethoi.png","vimotcaunoi.png","xichthemchut.png","contholacongo.png","ngaymailatuonglai.png","saigoncoem.png","em.png","luckyboy.png","ngonnen.png"];
const content = ["Tiny Love", "Thói Quen", "Bleu", "Biết tìm đâu", "Trôi về đâu","Thế thôi","Vì một câu nói","Xích thêm chút","Còn thở còn gỡ","Ngày mai là tương lai","Sài gòn có em","Em","Lucky Boy","Ngọn Nến"];
// Bắt sự kiện khi ấN vào nút chuyển bài
nextBtn.addEventListener("click", function() {
    changeSong(1);
})
prevBtn.addEventListener("click", function() {
    changeSong(-1);
})
randomBtn.addEventListener("click", function() {
    randomSong();
})
reloadBtn.addEventListener("click", function() {
    reloadSong();
})
thumb.addEventListener("click", function(){
    if(whitecolor){
        nameinner.classList.toggle("blackcolor");
        timer.classList.toggle("blackcolor");
        controls.classList.toggle("blackcolor");
        whitecolor = false;
    }else{
        nameinner.classList.remove("blackcolor");
        timer.classList.remove("blackcolor");
        controls.classList.remove("blackcolor");
        whitecolor = true;
    }
})
// Chạy ngay khi load trang
do{
    song.setAttribute("src",`./music/${musics[indexSong]}`);
    thumb.setAttribute("src", `./img/${img[indexSong]}`);
    namemusic.innerHTML = `<h3 class="music-name">${content[indexSong]}</h3>`;
    musicbackground.setAttribute("style", `background: url(./img/${img[indexSong]}); background-size:100%`);
    range.value = 0;
    song.volume = 1;
    // timer();
}while (false)
// Chuyển bài hát và chế độ random bài hát
function changeSong(dir) {
    if (random){
        do{
            newIndex = Math.floor(Math.random() * musics.length)
        }while(newIndex === indexSong)
        indexSong = newIndex
        isPlaying = true;
    }
    else if (dir == 1) {
        //next song
        indexSong++;
        if(indexSong >=musics.length ){
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if (dir == -1 ) {
        //prev song
        indexSong--;
        if(indexSong <0){
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src",`./music/${musics[indexSong]}`);
    thumb.setAttribute("src", `./img/${img[indexSong]}`);
    namemusic.innerHTML = `<h3 class="music-name">${content[indexSong]}</h3>`;
    musicbackground.setAttribute("style", `background: url(./img/${img[indexSong]}); background-size:100%`);
    // timer();
    playPause();
}

function randomSong(){
    if(random){
        random = false
        randomBtn.setAttribute("style", "color: #999;");
    }
    else{
        random = true
        randomBtn.setAttribute("style", "color: var(--color-base);");
    }
}

function reloadSong(){
    if(reload){
        reload = false
        reloadBtn.setAttribute("style", "color: #999;");
    }
    else{
        reload = true
        reloadBtn.setAttribute("style", "color:var(--color-base)");
    }
}

function downVolume(){
    if(song.volume <= 1){
        if (song.volume < 0.01){
            song.volume = 0
        }
        else{
            Math.floor( song.volume -= 0.01);
        }
    }
}

function upVolume(){
    if(song.volume >= 0){
        if (song.volume > 0.99){
            song.volume = 1;
        }
        else{
            Math.floor( song.volume += 0.01);
        }
    }
}
function muteVolume(){
    song.muted = song.muted ? false : true;
}

function keyDown(event){
        // Chuyển bài = nút sang trái, phải, A, D
        if(event.keyCode == '37' || event.keyCode == '65' || event.keyCode == '97' ){
            changeSong(-1);
        }
        if(event.keyCode == '39' || event.keyCode == '68' || event.keyCode == '100' ){
            changeSong(1);
        }
        // Tạm dừng = SPACE
        if(event.keyCode == '32'){
            playPause();
        }
        // random = Q
        if(event.keyCode == '81' || event.keyCode == '113'){
            randomSong();
        }
        // reload = R
        if(event.keyCode == '82' || event.keyCode == '114'){
            reloadSong();
        }
        // Chỉnh volume = nút LÊN, XUỐNG, W, S
        if(event.keyCode == '40' || event.keyCode == '83'){
            downVolume();
        }
        if(event.keyCode == '38' || event.keyCode == '87'){
            upVolume();
        }
        if(event.keyCode == '77'){
            muteVolume();
        }
}
// Xử lý khi ấn vào bút play
playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        song.play();
        isPlaying = false;
        playBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    }
    else {
        song.pause();
        isPlaying = true;
        playBtn.innerHTML = '<ion-icon name="play-outline" ></ion-icon>';
    }
}
// Chạy range và chạy thời gian thực và reload bài hát
song.ontimeupdate = function() {
    precent = Math.floor(song.currentTime / song.duration * 10000);
    range.value = precent;
    //Chuyển khi hết bài
    if(song.currentTime == song.duration) {
        if(reload){
            song.play();
            isPlaying = false;
        }else{
            changeSong(1);
        }
    }
    // Thời gian thực
    phut_now = Math.floor(song.currentTime / 60);
    giay_now = Math.floor(song.currentTime - phut_now * 60);
    if ( giay_now < 10 ){
        timenow.textContent = `${phut_now}:0${giay_now}`;
    }
    else {
        timenow.textContent = `${phut_now}:${giay_now}`;
    }
    // Tổng thời gian
    if(song.duration){
        phut = Math.floor(song.duration / 60);
        giay = Math.floor(song.duration - phut * 60);
        if(giay < 10){
            timeall.textContent = `${phut}:0${giay}`;
        }
        else{
            timeall.textContent = `${phut}:${giay}`;
        }
    }
    if(indexSong == 12){
        if(song.currentTime >= 99.5 && song.currentTime < 100.5){
        music.classList.toggle("none")
        }
        if(song.currentTime >= 103.3){
            musicbackground.classList.add("tranform")
        }
        if(song.currentTime >= 105){
            musicbackground.classList.remove("tranform")
        }
        if(song.currentTime >= 106.8 && song.currentTime < 107.8){
            music.classList.toggle("none")
        }
        if(song.currentTime >= 110.5){
            musicbackground.classList.add("tranform")
        }
        if(song.currentTime >= 112){
            musicbackground.classList.remove("tranform")
        }
    }
    }

// Tua song
range.onchange = function() {
    timerange = song.duration / 10000 * range.value;
    song.currentTime = timerange;
    isPlaying = true;
    playPause()
}