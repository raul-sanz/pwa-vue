<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header v-if="ruta != '/login'">
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          tweeter pwa
          
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      v-if="ruta != '/login'"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        
          <q-item>
              <q-item-side :avatar="user.website_url" />
              <q-item-main>
                <q-item-tile label>{{user.name}}</q-item-tile>
              
                <q-item-tile sublabel>@{{user.username}}</q-item-tile>
                <span slot="subtitle">Subtitle</span>
              </q-item-main>
            </q-item>
            <q-item @click.native="editProfile">
          <q-item-side icon="edit" />
          <q-item-main label="Edit Profile"/>
        </q-item>
        <q-item @click.native="logout">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Logout"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    ...mapMutations('auth',['setLogged','setToken']),
    openURL,
    logout(){
      this.setLogged(false)
      this.setToken(null)
      this.$router.push('/login')
    }
  },
  computed: {
    ruta(){
      return this.$route.fullPath
    },
    ...mapState('auth',['user'])
  },
  mounted() {
    console.log(this.$route.fullPath)
    console.log(this.ruta)
    function getLocation() {
            if(navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
            } else {
              console.log("Geo Location not supported by browser");
            }
          }
          //function that retrieves the position
          function showPosition(position) {
            var location = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            }
            console.log(location)
          }
          //request for location
          getLocation();
  },
}
</script>

<style>
</style>
