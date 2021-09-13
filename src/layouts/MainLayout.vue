<template>
  <q-layout view="lHh Lpr fff">
    <q-header>
      <q-toolbar class="bg-grey-4">

        <svg viewBox="-800 -30 5200 250">
          <use xlink:href="logo-de-olho.svg#image0"></use>
        </svg>
        <q-btn
          flat
          class="q-pr-md"
          color="primary"
          label="entrar"
        />
        <q-btn
          color="primary"
          label="cadastrar"
        />

      </q-toolbar>
    </q-header>
    <q-page-container>
      <img
        class="absolute-top"
        style="width: 100%; height: 94%;"
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

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
   data () {
    return {
      tab: 'home'
    }
  },

  components: {
  },
  methods: {
    routesView (params) {
      switch (params) {
        case 'home':
          this.$router.push('/')
          break;
        case 'search':
          this.$router.push('/search')
          break;
      }
      
    }
  },

  setup () {
  }
})
</script>
