<template>
  <q-page class="row justify-center q-pa-md">
    <svg v-if="!this.$q.screen.lt.sm" :viewBox="this.$q.screen.lt.sm ? '-500 20 2000 200' : '-500 20 2000 200'">
      <use xlink:href="logo-de-olho.svg#image0"></use>
    </svg>
    <div class="row col-lg-6 col-md-8 col-xs-12">
      <span :class="!this.$q.screen.lt.sm
        ? 'text-h5 text-weight-bold text-grey-9'
        : 'text-h6 text-weight-bold text-grey-9'">
        Encontre e acompanhe informações de dados públicos fornecidos por
        <span class="text-green-12">fontes seguras</span>
      </span>
      <br>
      <br>
      <span :class="!this.$q.screen.lt.sm
        ? 'text-center text-h6 text-weight-regular text-grey-6'
        : 'text-center text-subtitle1 text-weight-regular text-grey-6'">
        Utilize nosso buscador de tag’s para encontrar seus dados, você pode fazer buscas diretas ou utilizar tags sugeridas.
      </span>
      <div class="row justify-between col-12">
        <q-btn-dropdown
          v-if="this.$q.screen.lt.sm"
          color="primary"
          dense
          label="recorrente"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Transparência</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          v-if="this.$q.screen.lt.sm"
          dense
          color="grey-6"
          :label="model.cidade">
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Itapecerica da Serra', doSearch()"
            >
              <q-item-section>
                <q-item-label>Itapecerica da Serra</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Mogi das Cruzes', doSearch()"
            >
              <q-item-section>
                <q-item-label>Mogi das Cruzes</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Tatuí', doSearch()"
            >
              <q-item-section>
                <q-item-label>Tatuí</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Taboão da Serra', doSearch()"
            >
              <q-item-section>
                <q-item-label>Taboão da Serra</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'municípios', doSearch()"
            >
              <q-item-section>
                <q-item-label>Todos municípios</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <q-input
        outlined
        class="q-pt-md col-12"
        bg-color="white"
        v-model="model.mainSeeker"
        debounce="1800"
        :loading="loading"
        @update:model-value="doSearch()"
        label="Faça sua pesquisa"
      >
        <template v-slot:after>
          <q-btn-dropdown
            v-if="!this.$q.screen.lt.sm"
            color="grey-6"
            class="q-py-md"
            :label="model.cidade">
            <q-list>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Itapecerica da Serra', doSearch()"
            >
              <q-item-section>
                <q-item-label>Itapecerica da Serra</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Mogi das Cruzes', doSearch()"
            >
              <q-item-section>
                <q-item-label>Mogi das Cruzes</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Tatuí', doSearch()"
            >
              <q-item-section>
                <q-item-label>Tatuí</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'Taboão da Serra', doSearch()"
            >
              <q-item-section>
                <q-item-label>Taboão da Serra</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="model.cidade = 'municípios', doSearch()"
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
            v-if="!this.$q.screen.lt.sm"
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
      <div class="row items-center q-py-md col-12 justify-between">
        <span class="text-center text-weight-medium text-grey-5">
          Selecione alguma tag para pesquisar
        </span>
        <q-btn
          :label="!this.$q.screen.lt.sm ? 'criar recorrência' : ''"
          icon="fas fa-plus"
          color="primary"
          @click="dialog = true"
          v-model="dialog"
        />
      </div>
      <div class="q-py-md q-gutter-sm">
        <q-chip
          v-for=" (category, index) in categories"
          :key="index"
          v-model:selected="categories[index]"
          square
          dense
          color="primary"
          text-color="white"
          @click="doSearch()"
          :outline="!categories[index]"
        >
          {{ index }}
        </q-chip>
      </div>
      <q-separator />
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
                  {{ props.row.title }}
                </q-card-section>
                <q-list dense>
                  <q-item
                    v-for="col in props.cols.filter(col => col.name !== 'title')"
                    :key="col.name"
                  >
                    <q-item-section>
                      <q-item-label :class="col.style">{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-card-section>
                  <q-badge
                    v-for=" (category, index) in props.row.categories"
                    :key="index"
                    class="cursor-pointer q-ma-xs"
                    color="primary"
                    :label="category"
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
          <div class="full-width row text-h6 flex-center text-primary q-gutter-sm">
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
            text-color="white"
            active-text-color="white"
            :max="pagesNumber"
            size="md"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card>
        <q-bar dark class="bg-primary text-white">
          <q-space />
          <div class="col text-center text-weight-bold">
            Criar Recorrência
          </div>
          <q-space />
          <q-btn
            v-close-popup
            flat
            class="text-white"
            icon="close">
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">Cadastre seu filtro de interesse e receba as notificações por onde desejar</div>
        </q-card-section>
        <div class="row justify-center q-col-gutter-md">
          <q-input
            outlined
            class="col-8"
            dense
            label="Nome de Identificação"
          />
          <q-select
            dense
            outlined
            clearable
            class="col-8"
            label="Filtro Selecionado"
          />
          <q-select
            dense
            outlined
            class="col-8"
            label="Selecione a recorrência"
          />
        </div>
        <q-card-section align="start">
          <div class="text-subtitle2">Receber as notificações via</div>
          <div class="row q-col-gutter-sm">
            <q-toggle
              class="col-12"
              v-model="toggle.mail"
              label="E-mail"
            />
            <q-toggle
              class="col-12"
              v-model="toggle.zap"
              label="Whatsapp"
            />
            <q-toggle
              class="col-12"
              v-model="toggle.sms"
              label="SMS"
            />
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            label="confirmar recorrência"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ServiceCategories from '../service/categories'
import ServiceProposal from '../service/proposals'

export default defineComponent({
  name: 'PageIndex',
  mounted () {
    this.getCategories()
  },
  computed: {
    pagesNumber: function () {
        return Math.ceil(this.rows.length / 3)
      }
  },
  data () {
    return {
      toggle: {
        mail: false,
        zap: false,
        sms: false
      },
      dialog: false,
      loading: false,
      rows: [],
      categories: [],
      model: {
        mainSeeker: null,
        cidade: 'municípios',
        categories: []
      },
      pagination: {
        page: 1,
        sortBy: 'desc',
        descending: true,
        rowsPerPage: 3
      },
      columns: [
        {
          name: 'title',
          required: true,
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { style: 'text-weight-bold text-grey-6 text-subtitle1',
          name: 'author',
          field: 'author',
          sortable: true
        },
        { style: 'text-weight-regular text-grey',
          name: 'description',
          field: 'description',
          sortable: true
        }
      ]
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
      this.$q.loading.show()
      this.loading = true
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
          this.rows = response.data.map((val) => {
            return {
              author: val.author +' - '+ val.cidade + ' / ' + val.uf,
              cidade: val.cidade,
              description: val.description,
              title: val.title,
              uf: val.uf,
              categories: val.categories.map((val) => {
              return val
              })
            }
          })
          console.log(this.rows)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.$q.loading.hide()
          this.loading = false
        })
    }
  }
})
</script>
