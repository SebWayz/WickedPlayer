// State : données du magasin
const state = {
  musiques: [
    {
      id: 1,
      titre: 'Ghetto Gods',
      auteur: 'Earthgang',
      lien: 'EG-GG.mp3',
      cover: 'https://i0.wp.com/playose.com/wp-content/uploads/2022/02/EARTHGANG-Ghetto-Gods-Album.jpg?fit=600%2C600&ssl=1'
    },
    {
      id: 2,
      titre: 'Waterboyz',
      auteur: 'Earthgang',
      lien: 'EG-Waterboyz.mp3',
      cover: 'https://i0.wp.com/playose.com/wp-content/uploads/2022/02/EARTHGANG-Ghetto-Gods-Album.jpg?fit=600%2C600&ssl=1'
    },
    {
      id: 3,
      titre: 'Surround Sound',
      auteur: 'J.I.D',
      lien: 'JID-SurroundSound.mp3',
      cover: 'https://images.genius.com/75cd0084530f28993bb2e0339ac1a150.1000x1000x1.png'
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  ajouterMusique (state, musique) {
    state.musiques.push(musique)
  },
  supprimerMusique (state, id) {
    state.musiques = state.musiques.filter(el => el.id !== id)
  },
  modifierMusique (state, payload) {
    // REcherche la musique et retourne sa position dans le tableau (son index)
    const index = state.musiques.findIndex(musique => musique.id === payload.id
    )
    if (index !== -1) {
      Object.assign(state.musiques[index], payload.updates)
    }
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  ajouterMusique ({ commit }, musique) {
    let uId = 1
    if (state.musiques.length) {
      uId = Math.max(...state.musiques.map(musique => musique.id)) + 1
    }
    musique.id = uId
    commit('ajouterMusique', musique)
  },
  supprimerMusique ({ commit }, id) {
    commit('supprimerMusique', id)
  },
  modifierMusique ({ commit }, musique) {
    commit('modifierMusique', musique)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  musiques: (state) => {
    return state.musiques
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
