<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col">
          <h6 class="h2 d-inline-block mb-0">{{ $t('page.bromide.table') }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`/`)"><i class="fas fa-home mr-2"></i>{{ $t('page.home') }}</nuxt-link></li>
              <li class="breadcrumb-item"><nuxt-link :to="localePath(`bromide`)">{{ $t('page.bromide.title') }}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ $t('page.bromide.table') }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <card class="no-border-card" body-classes="px-0 py-0" footer-classes="pb-2 border-0" header-classes="border-0">
            <template>
              <el-table :data="myumons" height="600" row-key="id" header-row-class-name="thead-light" @sort-change="sortChange">
                <el-table-column :label="$t('sort.rarity')" sortable prop="rarity" :filter-method="filterHandler" :filters="rarityList" min-width="150">
                  <template slot-scope="{row}">
                    {{ $store.state.rarityConst[row.rarity] }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sort.character')" sortable prop="myumon_basic_id" min-width="160">
                  <template slot-scope="{row}">
                    {{ characters.find(artistMyumon => artistMyumon.value === row.myumon_basic_id).text }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sort.name')" sortable prop="name" min-width="200">
                  <template slot-scope="{row}">
                    <nuxt-link :to="localePath(`/bromide/${row.id}`)" class="text-reset">
                      <small class="d-block"
                             style="font-size: 0.175rem !important;"
                             v-if="row.translation && row.translation[$i18n.locale] && row.translation[$i18n.locale].name && $store.state.showJP">
                        {{row.name}}
                      </small>
                      {{ row.translation && row.translation[$i18n.locale] && row.translation[$i18n.locale].name ? row.translation[$i18n.locale].name : row.name }}
                    </nuxt-link>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('total')" sortable prop="total" min-width="180">
                  <template slot-scope="{row}">
                    <base-progress type="info" :value="(row.total / 160)" :height="8"></base-progress>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('life')" sortable prop="life" min-width="180">
                  <template slot-scope="{row}">
                    <base-progress type="success" :value="(row.life / 9)" :height="8"></base-progress>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('rhythm')" sortable prop="rhythm" min-width="180">
                  <template slot-scope="{row}">
                    <base-progress type="rhythm" :value="(row.rhythm / 80)" :height="8"></base-progress>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('melody')" sortable prop="melody" min-width="180">
                  <template slot-scope="{row}">
                    <base-progress type="melody" :value="(row.melody / 80)" :height="8"></base-progress>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('harmony')" sortable prop="harmony" min-width="180">
                  <template slot-scope="{row}">
                    <base-progress type="harmony" :value="(row.harmony / 80)" :height="8"></base-progress>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import { Table, TableColumn } from 'element-ui';
  import { BasePagination } from '@/components/argon-core';
  
  export default {
    head() {
      return {
        title: this.$t('page.bromide.table'),
        titleTemplate: `%s - ${this.$t('page.bromide.title')} | ${this.$t('siteName')}`,
        meta: [
          { name: 'og:title', content: this.$t('page.bromide.table'), hid: 'og:title', template: chunk => `${chunk} - ${this.$t('page.bromide.title')} | ${this.$t('siteName')}` },
          { name: 'og:url', content: `https://db.showbyrock.net${this.$route.fullPath}`, hid: 'og:url' },
          { name: 'og:site_name', content: this.$t('siteName'), hid: 'og:site_name' }
        ]
      }
    },
    async asyncData ({ $axios }) {
      let myumons = await $axios.$get(`/api/bromide/table`)
      
      myumons.filter(myumon => myumon.total = myumon.rhythm + myumon.melody + myumon.harmony)

      return {
        myumons: myumons
      }
    },
    components: {
      BaseHeader,
      RouteBreadCrumb,
      BasePagination,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
    },
    data() {
      return {
        rarityList: [
          {text: 'UR', value: 5},
          {text: 'SRR', value: 4},
          {text: 'SR', value: 3},
          {text: 'RR', value: 2},
          {text: 'R', value: 1},
        ],
        artistConst: {
          1: this.$t('artist.mashumairesh'),
          2: this.$t('artist.plasmagica'),
          3: this.$t('artist.mugenan'),
          4: this.$t('artist.bvl'),
          5: this.$t('artist.reijingsignal'),
          6: this.$t('artist.dokonjofinger'),
          7: this.$t('artist.shingan'),
          8: this.$t('artist.trichronika'),
          9: this.$t('artist.arcareafact'),
          10: this.$t('artist.criticrista'),
          11: this.$t('artist.yokazenohorizon'),
          12: this.$t('artist.shinimonogurui'),
          13: this.$t('artist.uwasanopetals'),
          14: this.$t('artist.ninjinriot'),
          90: this.$t('artist.special'),
          99: this.$t('artist.independent'),
        },
        characters: [
          {value: 11, artist_id: 1, text: this.$t('character.howan')},
          {value: 12, artist_id: 1, text: this.$t('character.himeko')},
          {value: 13, artist_id: 1, text: this.$t('character.delmin')},
          {value: 14, artist_id: 1, text: this.$t('character.ruhuyu')},
          {value: 21, artist_id: 2, text: this.$t('character.cyan')},
          {value: 22, artist_id: 2, text: this.$t('character.chuchu')},
          {value: 23, artist_id: 2, text: this.$t('character.retoree')},
          {value: 24, artist_id: 2, text: this.$t('character.moa')},
          {value: 31, artist_id: 3, text: this.$t('character.darudayu')},
          {value: 32, artist_id: 3, text: this.$t('character.a')},
          {value: 33, artist_id: 3, text: this.$t('character.un')},
          {value: 41, artist_id: 4, text: this.$t('character.ailane')},
          {value: 42, artist_id: 4, text: this.$t('character.peipain')},
          {value: 43, artist_id: 4, text: this.$t('character.hundrekko')},
          {value: 51, artist_id: 5, text: this.$t('character.rararin')},
          {value: 52, artist_id: 5, text: this.$t('character.sumomone')},
          {value: 53, artist_id: 5, text: this.$t('character.uiui')},
          {value: 61, artist_id: 6, text: this.$t('character.yasu')},
          {value: 62, artist_id: 6, text: this.$t('character.hachin')},
          {value: 63, artist_id: 6, text: this.$t('character.joe')},
          {value: 64, artist_id: 6, text: this.$t('character.sojun')},
          {value: 71, artist_id: 7, text: this.$t('character.crow')},
          {value: 72, artist_id: 7, text: this.$t('character.aion')},
          {value: 73, artist_id: 7, text: this.$t('character.yaiba')},
          {value: 74, artist_id: 7, text: this.$t('character.rom')},
          {value: 81, artist_id: 8, text: this.$t('character.shuuzo')},
          {value: 82, artist_id: 8, text: this.$t('character.kai')},
          {value: 83, artist_id: 8, text: this.$t('character.riku')},
          {value: 91, artist_id: 9, text: this.$t('character.titan')},
          {value: 92, artist_id: 9, text: this.$t('character.orion')},
          {value: 93, artist_id: 9, text: this.$t('character.selen')},
          {value: 94, artist_id: 9, text: this.$t('character.argon')},
          {value: 101, artist_id: 10, text: this.$t('character.rosia')},
          {value: 102, artist_id: 10, text: this.$t('character.tsukino')},
          {value: 103, artist_id: 10, text: this.$t('character.holmy')},
          {value: 104, artist_id: 10, text: this.$t('character.jacklyn')},
          {value: 111, artist_id: 11, text: this.$t('character.rikao')},
          {value: 112, artist_id: 11, text: this.$t('character.jalop')},
          {value: 113, artist_id: 11, text: this.$t('character.kusuka')},
          {value: 114, artist_id: 11, text: this.$t('character.uraragi')},
          {value: 121, artist_id: 12, text: this.$t('character.marimari')},
          {value: 122, artist_id: 12, text: this.$t('character.dyuradyura')},
          {value: 123, artist_id: 12, text: this.$t('character.monmon')},
          {value: 124, artist_id: 12, text: this.$t('character.tsugihagi')},
          {value: 125, artist_id: 12, text: this.$t('character.gashigashi')},
          {value: 131, artist_id: 13, text: this.$t('character.shibarin')},
          {value: 132, artist_id: 13, text: this.$t('character.pokoe')},
          {value: 133, artist_id: 13, text: this.$t('character.kittsun')},
          {value: 134, artist_id: 13, text: this.$t('character.hakkun')},
          {value: 141, artist_id: 14, text: this.$t('character.arashi')},
          {value: 142, artist_id: 14, text: this.$t('character.oboro')},
          {value: 143, artist_id: 14, text: this.$t('character.rin')},
          {value: 144, artist_id: 14, text: this.$t('character.kamui')}
        ]
      }
    },
    mounted() {
    },
    methods: {
      sortChange({ prop, order }) {
        if (prop) {
          this.myumons.sort((a, b) => {
            let aVal = a[prop]
            let bVal = b[prop]
            if (order === 'ascending') {
              return aVal > bVal ? 1 : -1
            }
            return bVal - aVal ? 1 : -1
          })
        } else {
          this.tableData.sort((a, b) => {
            return a.id - b.id
          })
        }
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },
    computed: {
      //
    }
  };
</script>
<style>
</style>
