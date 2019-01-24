<template>
  <q-page class="degradado" padding>
    <!-- Login Form -->
    <div v-if="logn">
      <div class="row justify-center">
        <div class="column">
          <img src="../assets/logo.png" alt="" width="150px">
        </div>
      </div>
      <div>
    
        <q-input 
          class="no-shadow radius op-8 q-mt-lg"       
          inverted
          :before="[{icon: 'mail', handler () {}}]"
          v-model="login.email"
          float-label="email"
          @blur="$v.login.email.$touch" 
          @keyup.enter="submit"
          :error="$v.login.email.$error"
        />
    

    
        <q-input 
          class="no-shadow radius op-8 q-mt-sm"
          :before="[{icon: 'https', handler () {}}]"
          inverted
          type="password"
          v-model="login.password"
          float-label="password"
          @blur="$v.login.password.$touch" 
          @keyup.enter="submit"
          :error="$v.login.password.$error"
          
        />
  
      <div class="row justify-center">
        <div class="column ">
          <q-btn
        class="q-mt-lg no-shadow radius"
        color="secondary"
        icon-right="send"
        label="login"
        @click.native="submit"
        :disabled="$v.login.$invalid"
      />
        </div>
      </div>
      <div class="row justify-center">
        <div class="column ">
          <q-btn
          class="q-mt-sm"
            flat
            color="white"
            @click.native="showLoginForm"
            label="Create Account"
          />
        </div>
      </div>
      
    </div>
  </div>
  <!-- Register Form -->
    <div v-if="!logn">
      <div class="row justify-center">
        <div class="column">
          <img src="../assets/logo.png" alt="" width="100px">
        </div>
      </div>
      <div>
        <q-input 
          class="no-shadow radius op-8 q-mt-lg"       
          inverted
          :before="[{icon: 'account_box', handler () {}}]"
          v-model="register.name"
          float-label="name"
          @blur="$v.register.name.$touch" 
          @keyup.enter="register"
          :error="$v.register.name.$error"
        />

        <q-input 
          class="no-shadow radius op-8 q-mt-sm"       
          inverted
          :before="[{icon: 'vpn_key', handler () {}}]"
          v-model="register.username"
          float-label="username"
          @blur="$v.register.username.$touch" 
          @keyup.enter="registerSend"
          :error="$v.register.username.$error"
        />
    
        <q-input 
          class="no-shadow radius op-8 q-mt-sm"       
          inverted
          :before="[{icon: 'mail', handler () {}}]"
          v-model="register.email"
          float-label="email"
          @blur="$v.register.email.$touch" 
          @keyup.enter="registerSend"
          :error="$v.register.email.$error"
        />
    

    
        <q-input 
          class="no-shadow radius op-8 q-mt-sm"
          :before="[{icon: 'https', handler () {}}]"
          inverted
          type="password"
          v-model="register.password"
          float-label="password"
          @blur="$v.register.password.$touch" 
          @keyup.enter="registerSend"
          :error="$v.register.password.$error"
          
        />
  
        <div class="row justify-center">
          <div class="column ">
            <q-btn
          class="q-mt-lg no-shadow radius"
          color="secondary"
          icon-right="send"
          label="Register"
          @click.native="registerSend"
          :disabled="$v.register.$invalid"
        />
          </div>
        </div>
        <div class="row justify-center">
          <div class="column ">
            <q-btn
            class="q-mt-sm"
              flat
              color="white"
              @click.native="showLoginForm"
              label="Login"
            />
          </div>
        </div>
      
      </div>
    </div>
  </q-page>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators'
import {mapMutations} from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      logn: true,
      login:{
        email:'',
        password:''
      },
      register:{
        name:'',
        username:'',
        email:'',
        password:''
      }
    }
  },
  validations: {
    login: {
      email: { required, email },
      password:{required, minLength: minLength(6)}
    },
    register: {
      name:{required},
      username:{required},
      email: { required, email },
      password:{required, minLength: minLength(6)}
    }
  },
  computed: {
    
  },
  methods: {
    ...mapMutations('auth',['setLogged','setUser','setToken']),
    submit(){
      this.$q.loading.show()
      console.log(this.login);
       this.$axios.post('/login',this.login)
        .then(response=>{
          console.log(response)
          this.setToken(response.data.data.token)
          this.setLogged(true)
          this.$router.push('/')
          this.$q.loading.hide()

        })
        .catch(error=>{
          this.$q.loading.hide()
          console.log(error.response.data.message);
          this.$q.notify({
            message: error.response.data.message,
            timeout: 3000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            type: 'negative',
          })
        })
    },
    showLoginForm(){
      this.logn = !this.logn
      console.log(this.logn)
    },
    registerSend(){
      this.$q.loading.show()
      console.log(this.login);
       this.$axios.post('/signup',this.register)
        .then(response=>{
          console.log(response)
          this.setToken(response.data.data.token)
          this.setLogged(true)
          this.$router.push('/')
          this.$q.loading.hide()

        })
        .catch(error=>{
          this.$q.loading.hide()
          console.log(error.response.data.message);
          this.$q.notify({
            message: error.response.data.message,
            timeout: 3000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            type: 'negative',
          })
        })
    }
  },
}
</script>

<style >
.degradado{
      /* background-image: linear-gradient(#5be693,#24e2cf, #027be38f); */
      background: -webkit-gradient(#5be693,#24e2cf, #027be38f);
      background: -webkit-linear-gradient(#5be693,#24e2cf, #027be38f);
      background: -moz-linear-gradient(#5be693,#24e2cf, #027be38f);
      background: -o-linear-gradient(#5be693,#24e2cf, #027be38f);
      background: -ms-linear-gradient(#5be693,#24e2cf, #027be38f);
      background: linear-gradient(#5be693,#24e2cf, #027be38f);
      padding: 30px;
}
.radius{
  border-radius: 25px;
}

.op-8{
  opacity: 0.7;
}
.register_link{
  color: white;
    margin-top: 15px;
}
</style>
