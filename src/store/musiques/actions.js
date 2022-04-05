export function ajouterMusique ({ commit, getters }, musique) {
  let uId = 1
  if (getters.musiques.length) {
    uId = Math.max(...getters.musiques.map(musique => musique.id)) + 1
  }
  musique.id = uId
  commit('ajouterMusique', musique)
}

export function supprimerMusique ({ commit }, id) {
  commit('supprimerMusique', id)
}

export function modifierMusique ({ commit }, musique) {
  commit('modifierMusique', musique)
}
