// Level 1: Global
// Level 2: Continents
// Level 3: Countries
// Level 4: States
// Level 5: Municipios
// etc

export const state = () => ({
  geopolitics: [
    {
      name: 'Comunidad Global',
      divisionName: 'Continents',
      items: ['Africa', 'Asia', 'Americas', 'Europe', 'Oceania'],
      polls: [],
      statics: [],
      debates: [],
      aims: []
    }
  ],
  ideologics: [],
  organizations: []
})

export const getters = {
  geopoliticsBreadcrumbs: (state) => {
    return state.geopolitics.map((item) => {
      const name = item.country || item.state || item.name
      return {
        division: item.divisionName,
        level: state.geopolitics.indexOf(item),
        items: item.items,
        name
      }
    })
  },
  continentName: (state) => {
    if (state.geopolitics && state.geopolitics[1])
      return state.geopolitics[1].name
    else return null
  },
  countryName: (state) => {
    if (state.geopolitics && state.geopolitics[2])
      return state.geopolitics[2].name
    else return null
  },
  stateName: (state) => {
    if (state.geopolitics && state.geopolitics[3])
      return state.geopolitics[3].name
    else return null
  }
}

export const mutations = {
  UPDATE_CONTINENT: (state, payload = {}) => {
    state.geopolitics = [...state.geopolitics.slice(0, 1), payload]
  },
  UPDATE_COUNTRY: (state, payload = {}) => {
    state.geopolitics = [...state.geopolitics.slice(0, 2), payload]
  },
  UPDATE_STATE: (state, payload = {}) => {
    state.geopolitics = [...state.geopolitics.slice(0, 3), payload]
  }
}

export const actions = {
  update_continent({ commit }, continent) {
    this.$axios.$get(`/geocommunities/${continent}/countries`).then((data) => {
      const countries = data.body.map((item) => ({
        label: item.name,
        divisionName: item.division_name,
        population: item.population,
        uuid: item.uuid
      }))
      const payload = {
        name: continent,
        divisionName: 'Paises',
        items: countries,
        polls: [],
        statics: [],
        debates: [],
        aims: []
      }
      commit('UPDATE_CONTINENT', payload)
    })
  },
  update_country({ commit }, country) {
    this.$axios.$get(`/geocommunities/${country}/states`).then((data) => {
      const states = data.body.map((item) => ({
        label: item.name,
        uuid: item.uuid
      }))
      const payload = {
        name: country,
        divisionName: 'States',
        items: states,
        polls: [],
        statics: [],
        debates: [],
        aims: []
      }
      commit('UPDATE_COUNTRY', payload)
    })
  },
  update_state({ commit }, payload) {
    const { country, state } = payload
    this.$axios
      .$get(`/geocommunities/${country}/${state}/cities`)
      .then((data) => {
        const cities = data.body.map((item) => ({
          label: item.name,
          uuid: item.uuid
        }))
        const payload = {
          name: state,
          divisionName: 'Cities',
          items: cities,
          polls: [],
          statics: [],
          debates: [],
          aims: []
        }
        commit('UPDATE_STATE', payload)
      })
  }
}
