<template>
  <div class="row justify-center items-center"
    style="height: 32rem"
  >
    <div class="col-12 text-center text-h5 text-weight-medium text-grey-8 q-pa-xl">
      <span>Bem vindo de volta, forneça seus dados para se logar na plataforma.</span>
    </div>
    <q-card class="row q-col-gutter-sm q-pa-sm col-xs-10 col-md-4">
      <div class="text-grey-8 text-weight-bold text-h5 q-py-md">
        Faça seu login
      </div>
      <q-input
        label="Insira seu e-mail"
        class="col-12"
        outlined
        v-model="dataModel.nmmail"
      />
      <q-input
        label="Insira sua senha"
        outlined
        v-model="dataModel.password"
        type="password"
        v-on:keyup.enter="processLogin()"
        class="col-12 q-pb-md"
      >
        <template v-slot:append>
          <q-btn
            flat
            color="primary"
            @click="tiposenha = !tiposenha"
            class="q-mr-sm"
            :icon="tiposenha ? 'visibility' : 'visibility_off'"
          />
        </template>
      </q-input>
      <div class="col-8 text-start">
        <q-checkbox class="q-pr-sm" dense v-model="check"/><u>Salvar credenciais</u>
      </div>
      <div class="col-4 cursor-pointer text-grey text-end">
        <u>Esqueci minha senha</u>
      </div>
      <div class="row col-12 justify-center">
        <q-btn
          label="entrar"
          @click="processLogin()"
          class="col-12 q-mt-md"
          color="primary"
        />
        <q-btn
          flat
          color="primary"
          label="cadastrar-se"
          @click="processSingup()"
          class="col-12"
        />
      </div>
    </q-card>
  </div>
</template>
<script>
import { openURL } from 'quasar'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  mounted () {
    this.$q.localStorage.clear('user')
  },
  data () {
    return {
      check: false,
      tiposenha: true,
      dataModel: {
        nmmail: '',
        password: null
      }
    }
  },
  methods: {
    chamalink (url) {
      openURL(url)
    },
    processLogin () {
      // this.$q.loading.show()

      const email = this.dataModel.nmmail.trimEnd()
      const password = this.dataModel.password
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          let { user } = userCredential
          this.$q.localStorage.set('user', user);
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.message)
          console.log(error.code)
          this.$q.notify({
            message: error.message,
            caption: error.code,
            color: 'negative'
          })
        })
        .finally(() => {
          // this.$q.loading.hide()
        })
    },
    processSingup () {
      this.$router.push('/singup')
    }
  }
}
</script>
