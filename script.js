// https://dummyjson.com/docs/products
// https://saavn.me/songs?link=https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc

let songImage = document.querySelector("#songImage");
let songName = document.querySelector("#songName");
let songPlayer = document.querySelector("#Song");
let prevBtn = document.querySelector("btn.prev");
let nextBtn = document.querySelector("btn.next");
let playPauseBtn = document.querySelector(".play");
let progressDiv = document.querySelector("#progress");
let currentTime = document.querySelector("#currentTime");
let totalTime = document.querySelector("#TotalTime");
let data;

async function playSong(id) {
  url = `https://saavn.me/songs?id=${id}`;
  let response = await fetch(url);
  data = await response.json();
  if (data.status == "SUCCESS") {
    data = data.data;
    console.log(data[0].downloadUrl[0].link);
    songPlayer.setAttribute("src", data[0].downloadUrl[0].link);
    showData(data);
  }
}

let Cmins = 0,
  Csec = "00";
let Tmins, Tsec;
let isPlaying = false;

function showData(data) {
  console.log(data);
  songName.innerHTML = data[0].name;
  songImage.setAttribute("src", data[0].image[2].link);
  Tmins = String(data[0].duration / 60).split(".")[0];
  Tsec = String(data[0].duration / 60)
    .split(".")[1]
    .substring(0, 2);
  totalTime.innerHTML = `${Tmins}:${Tsec}`;
  currentTime.innerHTML = `${Cmins}:${Csec}`;
}
let Timer, progress_val, load;
load = 0;
function playPause() {
  progress_val = 100 / data[0].duration;
  if (!isPlaying) {
    songPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;

    Timer = setInterval(() => {
      console.log(Csec, Tsec, Cmins, Tmins, Csec != Tsec, Cmins != Tmins);
      if (Csec != Tsec || Cmins != Tmins) {
        Csec = Number(Csec);
        Csec++;
        if (Csec == 60) {
          Csec = 0;
          Cmins++;
          currentTime.innerHTML = `${Cmins}:${Csec}`;
        } else {
          load += progress_val;
          progressDiv.style.width = `${load}%`;
          slider.style.left = `${load}%`;
          currentTime.innerHTML = `${Cmins}:${Csec}`;
        }
      } else {
        songPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
        clearInterval(Timer);
      }
    }, 1000);
  }
  if (songPlayer.ended) {
    songPlayer.pause();
    isPlaying = false;
    clearInterval(Timer);
  }
  console.log(isPlaying);
}

playPauseBtn.addEventListener("click", playPause);

playSong("5WXAlMNt");
