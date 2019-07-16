function PlayList() {  
  let list = [];
  let currentSong = 0;
  
  fetch('../playlist.json')
  .then(function(resp) {
    return resp.json();
    })
  .then(function(data){
    songs = data;
    list = data.playlist;
    // showObj();
    render();
    playAudio();
  });
  
  // function showObj() {
  // for (let prop in json) {
  //   list = json.playlist;
  //   return list;
  //   };
  // }

  
  function playAudio () {
    let song = new Audio();
    song.src = '../track/' + list[currentSong].file;

    let playButton = document.querySelector('.action_play');
    let playButtonIcon = playButton.querySelector('i');

    let seekBar = document.querySelector('.time');
    let fillBar = seekBar.querySelector('.time_fill');
    
    playButton.addEventListener('click', function() {
      if (song.paused) {
        song.play();
      } else {
        song.pause();
      }
    });

    song.addEventListener('play', function (){
      playButtonIcon.className = 'fas fa-pause';
    });

    song.addEventListener('pause', function (){
      playButtonIcon.className = 'fas fa-play';
    });

    

    song.addEventListener('timeupdate', function(){

      
      let time = song.currentTime / song.duration;

      fillBar.style.width = time * 100 + '%';
    });


   // todo

    seekBar.addEventListener('mousedown', function(e){
      let clickPosition = (e.clientX - seekBar.offsetLeft)/seekBar.offsetWidth ;
      fillBar.style.width = (clickPosition * 100) - 100 + "%";
      // song.currentTime = song.duration - (song.duration/clickPosition);
    }, false);
   
  };
            
  function  render() {
    let li = '';
    let listContainer = document.querySelector('.list');
    let trackTitle = document.querySelector('.track_title');
    let trackSinger = document.querySelector('.track_singer');
    let trackImg = document.querySelector('.track_img');
    
    for (let i = 0; i < list.length; i++) {
      li += "<li>" + list[i].track + "</li>";
      trackTitle.innerHTML = list[currentSong].track;
      trackSinger.innerHTML = list[currentSong].author;

      (list[currentSong].image == null) ? 
      trackImg.src = '../img/placeholder.png' :
      trackImg.src = '../img/' + list[currentSong].image;
      
      // songs.splice(i, 1);
      listContainer.insertAdjacentHTML('afterbegin', li);

      let listItem = document.querySelectorAll('li');
      for (let i = 0; i < listItem.length; ++i) {
        listItem[i].classList.add('list_item');
      }
    }
  }

}
  
new PlayList();


