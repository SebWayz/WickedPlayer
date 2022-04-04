<template>
    <q-card>
      <q-card-section class="row">
        <div class="text-h6"><slot></slot></div>
        <q-space />
        <q-btn
          dense
          flat
          round
          icon="close"
          v-close-popup
        />
      </q-card-section>

      <q-form @submit="formSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="musique.titre"
            label="Titre"
            :rules="[val => !!val || 'Le titre est obligatoire']"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="musique.auteur"
            label="Auteur"
            :rules="[val => !!val || 'Auteur obligatoire']"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            clearable
            v-model="musique.cover"
            label="Lien de l'image"
          />
          <q-img
            :src="musique.cover"
            class="q-mt-sm"
            style="border-radius: 20px; height: 250px;"
            contain
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat type="submit" class="column" label="Ajouter" color="primary" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'

export default {
  name: 'FormMusique',
  setup () {
    return {
      value: ref(true)
    }
  },
  data () {
    return {
      musique: {
        id: '',
        titre: '',
        auteur: '',
        cover: ''
      }
    }
  },
  props: {
    musiqueAModifier: {
      type: Object
    },
    bouton: {
      type: String,
      default: 'OK'
    }
  },
  mounted () {
    if (this.musiqueAModifier) {
      this.musique = Object.assign({}, this.musiqueAModifier)
    }
  },
  methods: {
    ...mapActions('musiques', ['ajouterMusique', 'modifierMusique']),
    formSubmit () {
      if (this.musique.id) {
        const payload = {
          id: this.musique.id,
          updates: this.musique
        }
        this.modifierMusique(payload)
      } else {
        this.ajouterMusique(this.musique)
      }
    }
  }
}
</script>

<style>
  .q-card {
    width: 400px;
    max-width: 80vw;
}
</style>
