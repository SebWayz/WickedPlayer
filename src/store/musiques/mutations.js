export function ajouterMusique (state, musique) {
  state.musiques.push(musique)
}

export function supprimerMusique (state, id) {
  state.musiques = state.musiques.filter(el => el.id !== id)
}

export function modifierMusique (state, payload) {
  const index = state.musiques.findIndex(musique => musique.id === payload.id)
  if (index !== -1) {
    Object.assign(state.musiques[index], payload.updates)
  }
}
