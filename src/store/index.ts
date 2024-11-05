import { toSorted, toSortedTimes } from '@/assets/sort'
import { BusStop } from '@/types'
import { createStore } from 'vuex'

export enum BusStopsFetchStatus {
  UNFETCHED = 'UNFETCHED',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  ERROR = 'ERROR'
}

type State = {
  busStops: BusStop[]
  status: BusStopsFetchStatus
  lineStops: {
    [key in number]: BusStop['stop'][]
  },
  lineStopTimes: Map<{ line: BusStop['line'], stop: BusStop['stop'] }, BusStop['time'][]>
}

enum Mutation {
  SetBusStops = 'SET_BUS_STOPS',
  SetStatus = 'SET_STATUS',
  SetLineStops = 'SET_LINE_STOPS',
  SetLineStopTimes = 'SET_LINE_STOP_TIMES'
}

export default createStore<State>({
  state: {
    busStops: [],
    status: BusStopsFetchStatus.UNFETCHED,
    lineStops: {},
    lineStopTimes: new Map()
  },
  getters: {
    lines(state) {
      return toSorted(new Set(state.busStops.map(({ line }) => line)))
    },
    stops(state) {
      return toSorted(new Set(state.busStops.map(({ stop }) => stop)))
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
    },
    [Mutation.SetLineStopTimes](state, { key, times }: { key: { line: BusStop['line'], stop: BusStop['stop'] }, times: BusStop['time'][] }) {
      state.lineStopTimes.set(key, times);
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
    getLineStops({ state, commit }, line: number) {
      if (line in state.lineStops && typeof state.lineStops[line] === 'object') {
        return state.lineStops[line]
      }

      const stopFullObjects = state.busStops.filter(busStop => busStop.line === line)
      stopFullObjects.sort(({ order: aOrder }, { order: bOrder }) => aOrder - bOrder)
      
      const stops = [...new Set(stopFullObjects.map(({ stop }) => stop))]

      commit(Mutation.SetLineStops, { line, stops })

      return stops
    },
    getTimesForLineStop({ state, commit }, key: { line: BusStop['line'], stop: BusStop['stop'] }) {
      if (state.lineStopTimes.has(key)) {
        return state.lineStopTimes.get(key)
      }

      const times = toSortedTimes(new Set(state.busStops
        .filter(({ line, stop }) => line === key.line && stop === key.stop)
        .map(({ time }) => time)
      ))

      commit(Mutation.SetLineStopTimes, { key, times })

      return times
    }
  },
  modules: {
  }
})
