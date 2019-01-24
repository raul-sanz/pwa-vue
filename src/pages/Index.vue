<template>
  <q-page padding class="">
    <q-input
      v-model="tweetText"
      type="textarea"
      float-label="Tweet"
      :max-height="100"
      rows="2"
    />
    <q-btn float class="flotante" round color="secondary" icon="send" @click.native="sendTweet" />
  </q-page>
</template>

<style>
</style>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'PageIndex',
  data() {
    return {
      tweetText:''
    }
  },
  computed: {
    ...mapState('auth',['token'])
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapMutations('auth',['setUser']),
    getUser(){
      this.$axios.get('/account/me', {headers: {Authorization: `Bearer ${this.token}`}})
        .then(response => {
            let user = response.data.data
            console.log(user);
            this.setUser(user)
        })
    },
    sendTweet(){
      console.log(this.tweetText)
      this.tweetText = ''
    }
  },
}
</script>
<style>
.flotante{
  float: right;
  margin-top: 10px;
}
</style>

