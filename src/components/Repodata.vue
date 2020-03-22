<template>
  <section class="repodata">
     <h2 class="repo-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
        <div class="controls">
          <button class="prev" @click="prev">Prev</button>
          <button class="play" v-if="!isPlaying" @click="play">Play</button>
          <button class="pause" v-else @click="pause">Pause</button>
          <button class="next" @click="next">Next</button>
        </div>
  </section>
</template>

<script>
export default {
  name: "repodata",
  data () {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      repos: [
        {
          title: 'Blocks',
          artist: 'Cybersynth',
          src: require('../assets/music/blocks.mp3')
        },
        {
          title: 'Grateful',
          artist: 'Neffex',
          src: require('../assets/music/grateful.mp3')
        },
        {
          title: 'Invincible',
          artist: 'Deaf Kev',
          src: require('../assets/music/invincible.mp3')
        },
        {
          title: 'After',
          artist: 'Wheezy',
          src: require('../assets/music/after.mp3')
        },
        {
          title: 'Synth',
          artist: 'Artful Dodger',
          src: require('../assets/music/synth.mp3')
        },
        {
          title: 'Beach',
          artist: 'Barmy',
          src: require('../assets/music/beach.mp3')
        },
        {
          title: 'Swing',
          artist: 'Foolhardy',
          src: require('../assets/music/swing.mp3')
        },
         {
          title: 'Unkown Known',
          artist: 'Breezeblock',
          src: require('../assets/music/unknown.mp3')
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

</style>