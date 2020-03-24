<template>
  <div id="app">
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand tag="h1" class="mb-0" href="/">Gitfinder General</b-navbar-brand>
    </b-navbar>
    </div>
    <div class="container">
    <section class="profile-search text-center">
      <div class="profile-details text-center">
        <b-card variant="info">
          <h2 class="user-title">{{ details.name }}</h2>
        </b-card>
          <img class="user-img" :src="details.avatar_url" width="200px;" />
         <br />
         <br />
         <btn class="btn-dark btn-lg btn-block"><a href="#" style="color: #fff; text-decoration:none;">View Profile</a></btn>
          <br />
          <div>
            <b-card class="text-center">
              <b-card-body>{{ details.bio }}</b-card-body>
           </b-card>
          </div>
           <br />
              <div class="column-md-12">
              <span class="badge badge-secondary"><strong>Public Repos:</strong>{{ details.public_repos }}</span>
              <span class="badge badge-primary"><strong>Public Gists:</strong>{{ details.public_gists }}</span>
              <span class="badge badge-success"><strong>Followers:</strong>{{ details.followers }}</span>
              <span class="badge badge-info"><strong>Following:</strong>{{ details.following }}</span>
              <br><br>
              <ul class="list-group">
             <li class="list-group-item d-flex justify-content-between align-items-center">Company: {{ details.company }}</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Website/blog: <a href="#" target="_blank">{{ details.blog }}</a></li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Location: {{ details.location }}</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Member Since: {{ details.created_at }}</li>
           </ul>
          </div>
        </div>
        <div class="search-box">
        <div class="textfield">
        <input
        v-model="localValue"
        @keypress="fetchData"
        placeholder="Enter Github User Name">
       </div>
        <br>
       </div>
      </section>
      <section class="repodata text-center">
         <div class="controls">
          <btn class="btn-success btn-lg prev" @click="prev">Prev</btn>
         <!--<button class="btn-success btn-lg play" v-if="!isViewing" @click="play">View</button>-->
          <!--<button class="pause" v-else @click="pause">Pause</button>-->
         <button class="btn-success btn-lg next" @click="next">Next</button>
        </div>
           <b-card class="text-center">
           <b-card-title><h2 class="text-center section-title">Latest Repos</h2></b-card-title>
           <h4 v-for="repo in repos" v-bind:key="repo.title" class="repo-name">{{ repo.name }} - <span>{{ repo.description }}</span></h4>
           <ul class="list-group">
               <li class="list-group-item d-flex justify-content-between align-items-center">Created: Created Repo Page</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Updated: Updated Repo Page</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Forks: Repo Forks Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Watchers: Repo Watchers Count</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Stars: Repo Stars Page</li>
            </ul>
           </b-card>
           <br />
            <ul class="list-group">
             <a href="#" target="_blank" class="btn btn-lg btn-primary">View Repo</a>
             <br />
             </ul>
        </section>
    </div>
 </div>
</template>
<script>
export default {
  name: 'app',
   props: {
    value: String
  },
  data () {
     return {
     localValue: "",
     details: {},
     avatar_url: "",
     url_base: 'https://api.github.com/users/',
     //index: 0,
     isViewing: false,
     current: {},
     repos: []
    }
  },
  created () {
      this.localValue = this.value;
      this.$watch("localValue", value => {
      this.$emit("input", value);
      });
      this.repos = this.repos[this.id];
  },
  methods: {
       fetchData(e) {
       if (e.key == "Enter") {
        fetch(`${this.url_base}${this.localValue}`)
          .then(res => {
            return res.json();
          }).then(this.setResults)
        }
        this.getRepos();
      },
       setResults(results) {
       this.details = results;
       //console.log("It Works");
       document.querySelector(".profile-details").style.display = "block";
       document.querySelector(".repodata").style.display = "block";
       document.querySelector(".search-box").style.display = "none";
    },
       getRepos() {
         fetch(`${this.url_base}${this.localValue}` + '/repos')
          .then(res => res.json())
          .then(data => {
            let repos = [];
            data.forEach(item => {
            repos = [...repos, ...Object.values(item)];
            });
            });
      },
  prev() {},
  next() {},
  computed: {}
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
.repo-name {
  color: #53565A;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.repo-name span {
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
