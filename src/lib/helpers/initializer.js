import axios from 'axios'

export default {
  async getSubprogram (state) {
    const host = window.location.hostname
    const url = `${state.api}/Subprograms/findByHost?host=${host}&cache=${state.cacheTtl}`
    const { data } = await axios.get(url)
    return data
  },
  async init (state, subprogramId) {
    const url = `${state.api}/Subprograms/init?subprogramId=${subprogramId}`
    const { data } = await axios.get(url)
    return data
  },
  async getMemberData (state, pin) {
    const url = `${state.api}/Members/${pin}/getMemberData`
    const { data } = await axios.get(url)
    return data
  },
  async getSubprogramData (state, subprogramId, language) {
    const url = `${state.api}/Subprograms/${subprogramId}`
    const params = {}
    const { data } = await axios.get(url, params)
    return [...data, language]
  }
}