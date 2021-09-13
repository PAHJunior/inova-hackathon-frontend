<template>
  <q-page class="row q-pa-md">
    <svg viewBox="-500 20 2000 200">
      <use xlink:href="logo-de-olho.svg#image0"></use>
    </svg>
    <div class="row justify-center">
      <div class=" offset-md-4 col-md-8 col-xs-12">
        <span class="text-h5 text-weight-bold text-grey-9">
          Encontre e acompanhe informações de dados públicos fornecidos por
          <span class="text-green-12">fontes seguras</span>
        </span>
        <br>
        <br>
        <span class="text-center text-h6 text-weight-regular text-grey-6">
          Utilize nosso buscador de tag’s para encontrar seus dados, você pode fazer buscas diretas ou utilizar tags sugeridas.
        </span>
        <q-input
          outlined
          class="q-py-md"
          bg-color="white"
          v-model="model.mainSeeker"
          debounce="600"
          label="Faça sua pesquisa"
        >
          <template v-slot:after>
            <q-btn-dropdown
              color="grey-6"
              class="q-py-md"
              :label="model.cidade">
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="model.cidade = 'Itapecerica da Serra'"
                >
                  <q-item-section>
                    <q-item-label>Itapecerica da Serra</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="model.cidade = 'Mogi das Cruzes'"
                >
                  <q-item-section>
                    <q-item-label>Mogi das Cruzes</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="model.cidade = 'Tatuí'"
                >
                  <q-item-section>
                    <q-item-label>Tatuí</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="model.cidade = 'Taboão da Serra'"
                >
                  <q-item-section>
                    <q-item-label>Taboão da Serra</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="model.cidade = 'municípios'"
                >
                  <q-item-section>
                    <q-item-label>Todos municípios</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
          <template v-slot:before>
            <q-btn-dropdown
              color="primary"
              class="q-py-md"
              label="recorrente">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Transparência</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
        </q-input>
        <q-btn label="teste" @click="doSearch()" />
        <span class=" text-center text-weight-medium text-grey-5">
          Tags sugeridos para pesquisa
        </span>
        <div class="q-py-md q-gutter-sm">
          <q-chip
            v-for=" (category, index) in categories"
            :key="index"
            v-model:selected="categories[index]"
            square
            dense
            color="primary"
            text-color="white"
            :outline="!categories[index]"
          >
            {{ index }}
          </q-chip>
        </div>
        <q-separator />
        <span class=" text-center text-weight-medium text-grey-5">
          Resultados para as tags
        </span>

        <div class="q-pa-md">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            v-model:pagination="pagination"
            hide-pagination
            grid
            no-data-label = "Não encontrei nada para você"
            no-results-label = "O filtro não revelou nenhum resultado"
            :filter="model.mainSeeker"
          >
            <template v-slot:item="props">
              <div
                class="q-pa-xs col-12 grid-style-transition"
              >
                <q-card :style="`border-left: 7px solid #1976D2`" >
                  <q-card-section class="text-h6 text-weight-bold text-grey-8">
                    {{ props.row.name }}
                  </q-card-section>
                  <q-list dense>
                    <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                      <q-item-section>
                        <q-item-label :class="col.style">{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-card-section>
                    <q-badge
                      class="cursor-pointer"
                      color="primary"
                      label="Auxílio Emergencial"
                    />
                  </q-card-section>
                  <q-card-section>
                    <q-icon name="fas fa-bookmark"
                      size="sm"
                      color="grey"
                    />
                    <q-icon name="fas fa-share-alt"
                      size="sm"
                      color="grey"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </template>
            <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-primary q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>
          </q-table>

          <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="pagination.page"
              color="primary"
              :max="pagesNumber"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, ref, computed, defineComponent } from 'vue'
import ServiceCategories from '../service/categories'
import ServiceProposal from '../service/proposals'

const columns = [
  {
    name: 'desc',
    required: true,
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { style: 'text-weight-bold text-grey-6 text-subtitle1',
    name: 'calories',
    field: 'calories',
    sortable: true
  },
  { style: 'text-weight-regular text-grey',
    name: 'fat',
    field: 'fat',
    sortable: true
  }
]

const rows = []
export default defineComponent({
  name: 'PageIndex',
  mounted () {
    this.getCategories()
  },
  setup () {
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3
      // rowsNumber: xx if getting data from a server
    })
    let categoryElements = null

    return {
      pagination,
      columns,
      rows,
      selectionCategories: computed(() => {
        return Object.keys(categories)
          .filter(type => categories[ type ] === true)
          .join(', ')
      }),

      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
    }
  },
  data () {
    return {
      categories: [],
      model: {
        mainSeeker: null,
        cidade: 'municípios',
        categories: []
      }
    }
  },
  methods: {
    getCategories () {
      ServiceCategories.getQuery()
        .then((response) => {
          this.categories = {...response.data}
        })
        .catch((err) => {
          console.error(err)
        })
    },
    doSearch () {
      // this.$q.loading.show()

      const categories = Object.keys(this.categories)
        .filter((key) => {
          return this.categories[key]
        }).join(',')

      let query = {
        categories: categories,
        cidade: this.model.cidade === 'municípios' // municípios é o default do filtro
          ? null : this.model.cidade 
      }

      ServiceProposal.getQuery(query)
        .then((response) => {
          this.row = response.data.map((val) => {
            return {
              ...val
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          // this.$q.loading.hide()
        })
    }
  }
})
</script>
