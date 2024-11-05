import { toSortedTimes } from '@/assets/time'
import { BusStop } from '@/types'
import { k } from 'vitest/dist/reporters-trlZlObr'
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
      const lines = [...new Set(state.busStops.map(({ line }) => line))]

      lines.sort((a, b) => a - b)

      return lines
    },
    stops(state) {
      const stops = [...new Set(state.busStops.map(({ stop }) => stop))]

      stops.sort((a, b) => a > b ? 1 : -1)

      return stops
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

      const stops = [...new Set(state.busStops.filter(busStop => busStop.line === line).map(({ stop }) => stop))]
      stops.sort((a, b) => a > b ? 1 : -1)

      commit(Mutation.SetLineStops, { line, stops })

      return stops
    },
    getTimesForLineStop({ state, commit }, key: { line: BusStop['line'], stop: BusStop['stop'] }) {
      if (state.lineStopTimes.has(key)) {
        return state.lineStopTimes.get(key)
      }

      const unorderedTimes = [...new Set(state.busStops.filter(({ line, stop }) => line === key.line && stop === key.stop).map(({ time }) => time))]
      const times = toSortedTimes(unorderedTimes)

      commit(Mutation.SetLineStopTimes, { key, times })

      return times
    }
  },
  modules: {
  }
})
