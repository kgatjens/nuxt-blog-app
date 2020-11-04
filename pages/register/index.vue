<template>
    <div>
    <form novalidate class="md-layout" @submit.prevent="registerUser" >
      <md-card class="md-layout-item md-size-25 md-small-size-50">
        <md-card-header>
          <div class="md-title">Register a new user</div>
        </md-card-header>

        <md-card-content>
          <!-- <md-field :class="getValidationClass('email')"> -->
              <md-field>
            <label for="email">Email</label>
            <md-input type="email" :disabled="loading" name="email" id="email" autocomplete="email" v-model="form.email"  />
            <!-- <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          </md-field>

          <div class="md-layout-item md-small-size-100">
              <!-- <md-field :class="getValidationClass('lastName')"> -->
                  <md-field>
                <label for="password">Password</label>
                <md-input type="password" :disabled="loading" name="password" id="password" autocomplete="password" v-model="form.password"  />
                <!-- <span class="md-error" v-if="!$v.form.password.required">The password name is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid last name</span> -->
              </md-field>
            </div>
          

        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        
        <md-card-actions>
          <md-button to="/login">Login</md-button>
          <md-button  type="submit" class="md-primary" :disabled="loading">Register user</md-button>
        </md-card-actions>

      </md-card>
      <md-snackbar :md-active.sync="authenticated">The user was registered with success!</md-snackbar>
    </form>


  </div>
</template>

<script>
//   import { validationMixin } from 'vuelidate'
//   import {
//     required,
//     email,
//     minLength,
//     maxLength
//   } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    //mixins: [validationMixin],
    data: () => ({
      form: {
        password: null,
        email: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    // validations: {
    //   form: {
    //     password: {
    //       required,
    //       minLength: minLength(3)
    //     },
        
    //     email: {
    //       required,
    //       email
    //     }
    //   }
    // },
    computed:{
      loading(){
        return this.$store.getters.loading;
      },
      authenticated(){
        return this.$store.getters.authenticated;
      }
    },
    watch:{
      authenticated(token){
        if(token){
          setTimeout(()=>this.$router.push('/'),1500);
        }
      }
    },
    methods: {
    async registerUser(){
        await this.$store.dispatch('authenticateUser',{
            email: this.form.email,
            password: this.form.password,
            returnSecureToken: true
        })
    },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
    //   clearForm () {
    //     this.$v.$reset()
    //     this.form.password = null
    //     this.form.email = null
    //   },
    //   saveUser () {
    //     this.sending = true

    //     // Instead of this timeout, here you can call your API
    //     window.setTimeout(() => {
    //       this.userSaved = true
    //       this.sending = false
    //       this.clearForm()
    //     }, 1500)
    //   },
    //   validateUser () {
    //     this.$v.$touch()

    //     if (!this.$v.$invalid) {
    //       this.saveUser()
    //     }
    //   }
    }
  }
</script>