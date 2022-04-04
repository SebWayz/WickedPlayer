<template>
  <q-item>
    <!-- Section cover -->
    <q-item-section avatar>
      <q-img
        rounded-borders
        :src="musique.cover"
        spinner-color="blue"
        style="height: 75px; width: 75px"
        class="q-mr-xs"
      />
    </q-item-section>
    <!-- Section titre et auteur -->
    <q-item-section>
      <span class="col-3"> {{ musique.titre }} </span>
      <span> par {{ musique.auteur }} </span>
    </q-item-section>

    <!-- Section actions (ajout, suppression, modification de la cover) -->
    <q-item-section side>
      <q-btn round size="md" icon="edit" color="primary" @click="afficherFormMusique = true" />
    </q-item-section>
    <q-item-section side>
      <q-btn round size="md" icon="delete" color="negative" @click="confirmerSuppression(musique.id)" />
    </q-item-section>

    <q-dialog
      v-model="afficherFormMusique"
      persistent
    >
      <form-musique
        @fermer="afficherFormMusique = false"
        :musiqueAModifier="musique"
        bouton="Modifier"
      >
        Modifier une musique
      </form-musique>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'musique.vue',
  data () {
    return {
      afficherFormMusique: false
    }
  },
  props: {
    musique: {
      type: Object,
      required: true
    }
  },
  components: {
    'form-musique': require('components/FormMusique.vue').default
  },
  methods: {
    ...mapActions('musiques', ['modifierMusique', 'supprimerMusique']),
    confirmerSuppression (id) {
      this.$q.dialog({
        title: 'Supprimer musique',
        message: 'Voulez-vous vraiment supprimer cette musique ?',
        cancel: 'Annuler',
        ok: 'Supprimer',
        persistent: true
      }).onOk(() => {
        this.supprimerMusique(id)
      })
    }
  }
}
</script>
