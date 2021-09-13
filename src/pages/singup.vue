<template>
  <q-page class="row justify-center q-pb-xl">
    <div class="col-12 text-center text-h5 text-weight-medium text-grey-8 q-pa-xl">
      <span>Bem vindo de volta, forneça seus dados para se cadastrar na plataforma.</span>
    </div>
    <q-card class="row col-md-4 col-12 q-col-gutter-sm">
      <q-form
        class="col-12 col-xs-10 q-pa-sm"
        greedy
        ref="formUser"
      >
        <div class="text-grey-8 text-weight-bold text-h5 q-py-md">
          Registre-se
        </div>
        <q-input
          label="Insira seu nome"
          class="col-12"
          outlined
          v-model="dataModel.nmusuario"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor informe seu nome']"
        />
        <q-input
          label="Insira seu e-mail"
          class="col-12"
          outlined
          v-model="dataModel.nmmail"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor informe seu email']"
        />
        <q-input
          label="Insira sua senha"
          outlined
          v-model="dataModel.password"
          type="password"
          class="col-12"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor informe sua senha']"
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
        <q-input
          label="Confirme sua senha"
          outlined
          v-model="dataModel.confirmpassword"
          type="password"
          v-on:keyup.enter="processSingup()"
          class="col-12 "
          lazy-rules
          :rules="[ val => val === dataModel.password || 'Por favor informe a mesma senha']"
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
        <div class="row col-12 q-pa-sm">
          <q-btn
            label="Registrar"
            @click="processSingup()"
            class="col-12 q-mt-md"
            color="primary"
          />
          <q-btn
            flat
            color="primary"
            label="Já tenho uma conta"
            to="login"
            class="col-12 q-mt-sm"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
import { openURL } from 'quasar'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data () {
    return {
      check: false,
      tiposenha: true,
      dataModel: {
        nmusuario: '',
        nmmail: '',
        password: '',
        confirmpassword: '',
      }
    }
  },
  mounted () {
    this.$q.localStorage.clear('user')
  },
  methods: {
    chamalink (url) {
      openURL(url)
    },
    processSingup () {
      const auth = getAuth();
      this.$refs.formUser.validate()
        .then((success) => {
          if (success) {
            this.loading = true;
            createUserWithEmailAndPassword(auth, this.dataModel.nmmail, this.dataModel.password)
              .then((userCredential) => {
                const { user } = userCredential;
                this.$q.localStorage.set('user', user);
                this.$router.push('/')
              })
              .catch((error) => {
                const { message } = error;

                this.$q.notify({
                  message: message,
                  caption: error.code,
                  color: 'negative',
                  icon: 'error'
                })
              })
              .finally(() => {
                this.loading = false;
              });
          }
        });
    }
  }
}
</script>
