<template>
  <q-page class="row q-pa-md">
    <div class=" offset-md-2 col-8">
      <span class="text-center text-h6 text-weight-regular text-grey-6">
        Utilize nosso buscador de tag’s para encontrar seus dados, você pode fazer buscas diretas ou recorrentes.
      </span>
      <q-select
        outlined
        clearable
        use-chips
        multiple
        use-input
        class="q-py-md"
        v-model="model.mainSeeker"
        :options="filterOptions"
        @new-value="createValue"
          @filter="filterFn"
        label="Insira um termo de pesquisa"
      >
        <template v-slot:before>
          <q-btn-dropdown
            color="primary"
            label="Recorrentes"
            class="q-py-md"
            v-model="model.searchRecurring"
          >
            <q-list>
              <q-item clickable v-for="(history, index) in historyResearch" :key="index">
                <q-item-section>
                  <q-item-label>
                    {{ history }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-select>
      <span class=" text-center text-weight-medium text-grey-5">
        Mais buscador
      </span>
        <div class="q-py-md q-gutter-md">
        <q-badge outline color="primary" label="Auxílio Emergencial" />
        <q-badge outline color="primary" label="Governo Federal" />
      </div>
       <q-separator />
       <span class=" text-center text-weight-medium text-grey-5">
        Resultados para as tags
      </span>
      <!-- <q-list>
        <q-item
          class="q-gutter-xs"
          v-for="(history, index) in historyResearch"
          :key="index"
        >
          <q-chip
            removable
            v-model="icecream"
            @remove="log('Icecream')"
            color="primary"
            text-color="white"
            icon="cake">
            Ice cream
          </q-chip>
        </q-item>
      </q-list> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      model: {
        mainSeeker: null,
        searchRecurring: null,
      },
      options: [],
      filterOptions: [],
      historyResearch: []
    }
  },
  methods: {
    createValue (val, done) {
        if (val.length > 0) {
          const modelValue = (model.value || []).slice()

          val
            .split(/[,;|]+/)
            .map(v => v.trim())
            .filter(v => v.length > 0)
            .forEach(v => {
              if (options.includes(v) === false) {
                options.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v)
              }
            })

          done(null)
          model.value = modelValue
        }
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          filterOptions.value = options
        }
        else {
          const needle = val.toLowerCase()
          filterOptions.value = options.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }
})
</script>
