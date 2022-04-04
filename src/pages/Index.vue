<template>
  <q-page class="row justify-center items-center">
    <q-btn color="white" text-color="primary">
    Charger un fichier
    <input
        type="file"
        class="q-uploader__input overflow-hidden absolute-full"
        @change="loadFile"
        ref="fileInput"
        accept="audio/mpeg"
    />
    </q-btn>
      <div id="waveform" class="full-width q-pl-xs" autocenter></div>
      <div class="controls row fixed-bottom q-pb-md q-pt-md shadow-10">
        <div class="row col-4 justify-start">
          <q-img
            src="https://i0.wp.com/playose.com/wp-content/uploads/2022/02/EARTHGANG-Ghetto-Gods-Album.jpg?fit=600%2C600&ssl=1"
            spinner-color="blue"
            style="height: 100px; width: 100px"
            class="on-right q-mr-xs"
          />
          <div class="column justify-end">
            <span class="col-3">{{ this.titre }}</span>
            <span class="col-3"> Auteur </span>
          </div>
        </div>
        <div class="row col-4 justify-center items-center">
          <q-btn
            color="primary"
            flat
            round
            icon="fast_rewind"
            size="xl"
            @click="wavesurfer.skipBackward(7)"
          />
          <q-circular-progress v-if="isLoading" size="72px" indeterminate color="primary" />
          <q-btn
            v-if="isPlaying"
            color="primary"
            flat
            round
            icon="pause"
            size="xl"
            @click="wavesurfer.playPause()"
          />
          <q-btn
            v-if="!isPlaying && !isLoading"
            color="primary"
            flat
            round
            icon="play_arrow"
            size="xl"
            @click="wavesurfer.playPause()"
          />
          <q-btn
            color="primary"
            flat
            round
            icon="fast_forward"
            size="xl"
            @click="wavesurfer.skipForward(7)"
          />
        </div>
        <div class="row col-4 justify-end items-center q-pr-lg">
          <q-icon :name="value === 0 ? 'volume_off' : 'volume_up'" color="primary" class="col-1 on-left" size="md" @click="mute()" />
          <q-slider
            v-model="value"
            :min="0"
            :max="1"
            :step="0.1"
            label
            class="col-4"
            color="primary"
            @change="setVolume()"
          />
        </div>
      </div>
    <!-- <audio controls>
      <source src="EG-GG.mp3">
    </audio> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      value: ref(true)
    }
  },
  data: () => ({
    wavesurfer: null,
    isLoading: false,
    titre: 'Waterboyz',
    auteur: ''
  }),
  async mounted () {
    if (!this.wavesurfer) this.createWaveSurfer()
  },
  methods: {
    createWaveSurfer () {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'grey',
        progressColor: 'blue',
        barWidth: 3
      })
      this.wavesurfer.load('EG-Waterboyz.mp3')
      // Loading spinner
      this.wavesurfer.on('error', err => {
        console.error(err)
        this.isLoading = false
        this.$q.notify({ message: err })
      })
      this.wavesurfer.on('loading', () => {
        this.isLoading = true
      })
      this.wavesurfer.on('ready', () => {
        this.isLoading = false
      })
    },
    loadFile (file) {
      console.log('loadFile running')
      console.log(file.target.files)
      // const blob = new window.Blob([new Uint8Array()])
      this.titre = file.target.files[0].name
      this.wavesurfer.loadBlob(file.target.files[0])
    },
    setVolume () {
      this.wavesurfer.setVolume(this.value)
    },
    mute () {
      const currentVolume = this.wavesurfer.getVolume()
      console.log(currentVolume)
      if (this.value !== 0) {
        this.wavesurfer.setMute(true)
        this.value = 0
      } else {
        this.wavesurfer.setMute(false)
        this.value = currentVolume
        console.log(currentVolume)
      }
    }
  },
  computed: {
    isPlaying () {
      if (!this.wavesurfer) return false

      return this.wavesurfer.isPlaying()
    }
  }
})
</script>

<style>
.controls {
  background-color: white;
}
</style>
