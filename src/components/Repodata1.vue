<template>
 <section class="repodata">
       <h2 class="repo-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
        <br />
          <h5 class="text-center;" style="text-transform: capitalize;"><strong>Repo Name:</strong> Repo Description</h5>
               <br />
              <ul class="list-group">
               <li class="list-group-item d-flex justify-content-between align-items-center">Forks: Repo Forks Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Watchers: Repo Watchers Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Stars: Repo Page</li>
               </ul>
               <ul class="list-group">
               <br />
           <a href="#" target="_blank" class="btn btn-lg btn-success">Repo Page</a>
         </ul>
        <div class="controls">
          <button class="prev" @click="prev">Prev</button>
          <!--<button class="play" v-if="!isPlaying" @click="play">Play</button>-->
          <!--<button class="pause" v-else @click="pause">Pause</button>-->
          <button class="next" @click="next">Next</button>
        </div>
        <div class="repos">
        <h3 class="text-center">Latest Repos</h3>
        <button v-for="repo in repos" :key="repo.src" @click="play(repo)" :class="(repo.src == current.src) ? 'repo playing' : 'repo'">
          {{ repo.title }} - {{ repo.artist }}
        </button>
      </div>
    </section>
</template>
<script>
export default {
    name:  'repodata'
}
</script>

<style>

</style>