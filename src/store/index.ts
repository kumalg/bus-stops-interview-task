import { BusStop } from '@/types'
import { createStore } from 'vuex'

enum BusStopsFetchStatus {
  UNFETCHED = 'UNFETCHED',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  ERROR = 'ERROR'
}

type State = {
  busStops: BusStop[]
  status: BusStopsFetchStatus
  lineStops: {
    [key in number]: string[]
  }
}

enum Mutation {
  SetBusStops = 'SET_BUS_STOPS',
  SetStatus = 'SET_STATUS',
  SetLineStops = 'SET_LINE_STOPS'
}

export default createStore<State>({
  state: {
    busStops: [],
    status: BusStopsFetchStatus.UNFETCHED,
    lineStops: {}
  },
  getters: {
    lines(state) {
      const lines = [...new Set(state.busStops.map(({ line }) => line))]
      lines.sort((a, b) => a - b)
      return lines
    }
  },
  mutations: {
    [Mutation.SetBusStops](state, value: BusStop[]) {
      state.busStops = value
    },
    [Mutation.SetStatus](state, value: BusStopsFetchStatus) {
      state.status = value
    },
    [Mutation.SetLineStops](state, { line, stops }: { line: BusStop['line'], stops: BusStop['stop'][] }) {
      state.lineStops[line] = stops
    }
  },
  actions: {
    async fetchBusStops({ state, commit }) {
      if (state.status === BusStopsFetchStatus.FETCHING) {
        return
      }

      commit(Mutation.SetStatus, BusStopsFetchStatus.FETCHING)

      try {
        const response = await fetch('http://localhost:3000/stops')
  
        if (!response.ok) {
          commit(Mutation.SetStatus, BusStopsFetchStatus.ERROR)
        }
  
        const json = await response.json();
        commit(Mutation.SetBusStops, json)
        commit(Mutation.SetStatus, BusStopsFetchStatus.FETCHED)
      } catch {
        commit(Mutation.SetStatus, BusStopsFetchStatus.ERROR)
      }
    },
    getLineStops({state, commit}, line: number) {
      if (line in state.lineStops && typeof state.lineStops[line] === 'object') {
        return state.lineStops[line]
      }

      const stops = [...new Set(state.busStops.filter(busStop => busStop.line === line).map(({ stop }) => stop))]

      commit(Mutation.SetLineStops, { line, stops })
    }
  },
  modules: {
  }
})
