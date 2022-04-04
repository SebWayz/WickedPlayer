<template>
  <q-page padding>
    <h3 class="text-grey-8">Liste de musiques</h3>
    <q-list v-if="musiques.length" class="rounded-borders q-gutter-sm" bordered separator>
      <musique v-for="musique in musiques" :key="musique.id" :musique="musique"></musique>
    </q-list>

    <p v-else>Pas de musiques . . .</p>

    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn fab icon="add" color="primary" @click="afficherFormMusique = true" />
    </q-page-sticky>

    <q-dialog v-model="afficherFormMusique" persistent>
      <FormMusique @fermer="afficherFormMusique = false" bouton="Ajouter">
        Ajouter une musique
      </FormMusique>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PagePlaylist',
  data () {
    return {
      afficherFormMusique: false
    }
  },
  computed: {
    ...mapGetters('musiques', ['musiques'])
  },
  components: {
    musique: require('components/musique.vue').default,
    FormMusique: require('components/FormMusique.vue').default
  }

}
</script>
