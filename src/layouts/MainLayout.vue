<template>
  <q-layout view="lHh Lpr fff">
    <q-header>
      <q-toolbar class="bg-grey-4">

        <svg
          :viewBox="this.$q.screen.lt.md ? '-100 -30 1500 250' : '-800 -30 5200 250'"
          @click="routesView('home')"
        >
          <use xlink:href="logo-de-olho.svg#image0"></use>
        </svg>

        <div v-if="user === 'logout'" class="col-2">
          <q-btn
            flat
            class="q-pr-md"
            color="primary"
            label="entrar"
            to="login"
          />
          <q-btn
            color="primary"
            label="cadastrar"
            to="singup"
          />
        </div>
        <div v-else class="col-2">
          <q-btn
            color="primary"
            label="sair"
            @click="logout"
          >
          <q-tooltip>{{user?.email}}</q-tooltip>
          </q-btn>
        </div>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <img
        class="absolute-top"
        style="width: 100%; height: 92%;"
        src="~/assets/BG_desktop.png"
      >
      <router-view />
    </q-page-container>
    <q-footer class="text-white">
      <q-toolbar class="bg-primary">
        <q-tabs class="col text-center text-weight-bold"
          no-caps
          indicator-color="transparent"
          v-model="tab"
          @click="routesView(tab)"
        >
          <q-tab name="home" label="HOME" />
          <q-tab name="aboutUs" label="SOBRE NÓS" />
          <q-tab name="team" label="EQUIPE" />
          <q-tab name="service" label="SERVIÇOS" />
          <q-tab name="blog" label="BLOG" />
          <q-tab name="contactMe" label="FALE CONOSCO" />
        </q-tabs>
      </q-toolbar>
      <q-toolbar class="bg-blue-9">
        <q-toolbar-title>
          <div class="col text-center text-weight-medium">
            2021 - Serpro
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
   data () {
    return {
      tab: 'home',
      usuario: null
    }
  },

  computed: {
    user: {
      get: function () {
        return this.usuario
      },
      set: function (newValue) {
        this.usuario = newValue
      }
    }
  },
  methods: {
    setUsuario () {
      this.user = this.$q.localStorage.getItem('user')
    },
    logout () {
      this.$q.localStorage.clear('user')
      window.location.reload()
    },
    routesView (params) {
      switch (params) {
        case 'home':
          this.$router.push('/')
          break;
        case 'login':
          this.$router.push('/login')
          break;
      }
    }
  },

  setup () {
  }
})
</script>
