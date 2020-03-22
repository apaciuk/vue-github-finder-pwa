<template>
 <section class="profile-search text-center">
       <h2 class="user-profile">Github User</h2>
       <div class="profile-details">
         <img class="pro-img" src="@/assets/img/avatar.jpg" width="200px;" />
         <br />
         <br />
         <btn class="btn-dark btn-lg btn-block">View Profile</btn>
          <br /><br />
              <div class="column-md-12">
              <span class="badge badge-secondary"><strong>Public Repos:</strong> User Public Repos</span>
              <span class="badge badge-primary"><strong>Public Gists:</strong> User Public Gists</span>
              <span class="badge badge-success"><strong>Followers:</strong> User Followers</span>
              <span class="badge badge-info"><strong>Following:</strong> User Following</span>
              <br><br>
               <ul class="list-group">
             <li class="list-group-item d-flex justify-content-between align-items-center">Company: User Company</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Website/blog: <a href="#" target="_blank">User Blog</a></li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Location: User Location</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Member Since: User Created At</li>
              </ul>
          </div>
        </div>
        <div class="search-box">
        <div class="textfield">
        <input v-model="localValue" v-on:keyup.enter="showData" placeholder="Enter Github User Name">
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
      name: "",
      localValue: ""
    };
  },
  created() {
    this.localValue = this.value;
    this.$watch("localValue", value => {
    this.$emit("input", value);
    });
  },
  methods: {
       async showData() {
        let config = {
          headers: {
            'Accept': 'application/json'
          }
        }
        let username = this.localValue;
        let url = 'https://api.github.com/users/' +username;
        let results = await this.$http.get(url, config);
        this.results = results.data;
        console.log(results);
    },
  }
}
</script>

<style>

</style>