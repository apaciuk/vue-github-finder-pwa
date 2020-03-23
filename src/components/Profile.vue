<template>
 <section class="profile-search text-center">
      <div class="profile-details text-center">
          <h2 class="user-title">{{ details.name }}</h2>
          <img class="user-img" :src="details.avatar_url" width="200px;" />
         <br />
         <br />
         <btn class="btn-dark btn-lg btn-block"><a href="#">View Profile</a></btn>
          <br /><br />
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
             <li class="list-group-item d-flex justify-content-between align-items-center">Bio: {{ details.bio }}</li>
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
</template>
<script>
export default {
  name: "profile",
  props: {
    value: String
  },
  data() {
    return {
     localValue: "",
     details: {},
     url_base: 'https://api.github.com/users/',
     avatar_url: ""
    };
  },
  created() {
    this.localValue = this.value;
    this.$watch("localValue", value => {
    this.$emit("input", value);
    });
  },
  methods: {
      async fetchData(e) {
        let config = {
          headers: {
            'Accept': 'application/json'
          }
        }
        if (e.key == "Enter") {
        fetch(`${this.url_base}${this.localValue}`, config)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
      },
       setResults(results) {
       this.details = results;
       document.querySelector(".profile-details").style.display = "block";
       document.querySelector(".repodata").style.display = "block";
       document.querySelector(".search-box").style.display = "none";
       console.log(results);


    }
  }
}
</script>

<style>

</style>