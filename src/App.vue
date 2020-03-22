<template>
  <div id="app">
    <header>
    <h1>Vue Gitfinder General</h1>
    </header>
    <div class="container">
     <Profile />
      <section class="repodata text-center">
         <h2 class="text-center section-title">Latest Repos</h2>
       <h2 class="repo-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
        <br />
              <ul class="list-group">
               <li class="list-group-item d-flex justify-content-between align-items-center">Forks: Repo Forks Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Watchers: Repo Watchers Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Stars: Repo Page</li>
               </ul>
               <ul class="list-group">
               <br />
         <a href="#" target="_blank" class="btn btn-lg btn-primary">Repo Page</a>
         </ul>
        <div class="controls">
          <btn class="btn-success btn-lg prev" @click="prev">Prev</btn>
          <!--<button class="play" v-if="!isPlaying" @click="play">Play</button>-->
          <!--<button class="pause" v-else @click="pause">Pause</button>-->
          <button class="btn-success btn-lg next" @click="next">Next</button>
        </div>
      </section>
    </div>
 </div>
</template>
<script>
import Profile from "./components/Profile"
export default {
  name: 'app',
  components: {
    Profile
  },
  data () {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      repos: [
        {
          title: 'Blocks',
          artist: 'Cybersynth',
          src: require('./assets/music/blocks.mp3')
        },
        {
          title: 'Grateful',
          artist: 'Neffex',
          src: require('./assets/music/grateful.mp3')
        },
        {
          title: 'Invincible',
          artist: 'Deaf Kev',
          src: require('./assets/music/invincible.mp3')
        },
        {
          title: 'After',
          artist: 'Wheezy',
          src: require('./assets/music/after.mp3')
        },
        {
          title: 'Synth',
          artist: 'Artful Dodger',
          src: require('./assets/music/synth.mp3')
        },
        {
          title: 'Beach',
          artist: 'Barmy',
          src: require('./assets/music/beach.mp3')
        },
        {
          title: 'Swing',
          artist: 'Foolhardy',
          src: require('./assets/music/swing.mp3')
        },
         {
          title: 'Unkown Known',
          artist: 'Breezeblock',
          src: require('./assets/music/unknown.mp3')
        }
      ],
      repodata: new Audio()
    }
  },
  methods: {
    play (repo) {
      if (typeof repo.src != "undefined") {
        this.current = repo;
        this.repodata.src = this.current.src;
      }

      this.repodata.play();
      this.repodata.addEventListener('ended', function () {
        this.index++;
        if (this.index > this.repos.length - 1) {
          this.index = 0;
        }

      this.current = this.repos[this.index];
      this.play(this.current);
      }.bind(this));
      this.isPlaying = true;
    },
    pause () {
      this.repodata.pause();
      this.isPlaying = false;
    },
    next () {
      this.index++;
      if (this.index > this.repos.length - 1) {
        this.index = 0;
      }
      this.current = this.repos[this.index];
      this.play(this.current);
    },
    prev () {
      this.index--;
      if (this.index < 0) {
        this.index = this.repos.length - 1;
      }

      this.current = this.repos[this.index];
      this.play(this.current);
    }
  },
  created () {
    this.current = this.repos[this.index];
    this.repodata.src = this.current.src;
  }
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	font-family: sans-serif;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-color: rgb(212, 32, 116);
	color: #FFF;
}
.user-img {
  border-radius: 50%;
  margin-top: 10px;
}
.repodata,
.profile-details {
display: none;
}
.profile-search {
  margin-top:40px;
}
.repodata,
.profile-details,
.search-box {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 30px;
  max-width: 768px;
}
.search-box {
margin-top:300px;
}
.search-box .textfield > input {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(180, 219, 182, 0.5);
  border-radius: 0px 15px 0px 15px;
  transition: 0.4s;
}
.search-box .textfield > input:focus {
 box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
 background-color:rgba(180, 219, 182, 0.5);
 border-radius: 16px 0px 16px 0px;
}
.repo-title {
  color: #53565A;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.repo-title span {
  font-weight: 400;
  font-style: italic;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.next, .prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #FFF;
}
.repos {
  padding: 0px 30px;
}
.repos h3 {
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.repos .repo {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
.repos .repo.playing {
  color: #FFF;
 background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
}
</style>
