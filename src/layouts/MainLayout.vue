<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Music player
        </q-toolbar-title>

        <q-drawer
          v-model="leftDrawerOpen"
          :width="250"
          bordered
        >
          <q-list dark>
            <q-item-label
              header
              class="text-grey-10"
            >
              Menu de navigation
            </q-item-label>

            <q-item clickable exact to="/">
              <q-item-section avatar>
                <q-icon name="music_note" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lecteur de musique</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable exact to="/playlist">
              <q-item-section avatar>
                <q-icon name="playlist_add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Playlist</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-drawer>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

const linksList = []

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
/* Lien actif du menu latéral */
.q-drawer .q-link {
  color: rgb(161, 156, 156);
}
.q-drawer .q-router-link--exact-active {
  color: #1976D2;
}
</style>
