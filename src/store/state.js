export default {
  api: '/api',
  cacheTtl: window.cacheTtl || 3600,
  app: 'member',
  spinner: 0,
  session: 'cookie',
  googleAnalyticsRootTracker: false,
  googleAnalyticsSubprogramTracker: false,
  p2mServerName: window.p2mServerName,
  p2mMode: window.p2mMode,
  skinInjected: !!window.skinDir,

  subprogram: {
    id: window.p2mSubprogramId,
    notInitialized: true,
    programType: window.programType
  },

  user: {
    authenticated: false,
    language: 'en',
    usingLayout: true,
    credentials: [],
    dashboards: [],
    hideHeaderOption: false
  },

  preferredCurrency: null,

  uiSettings: {
    displayCurrencyMenu: false,
    pageTitle: 'Member Home'
  },

  ssoOptions: window.ssoOptions,

  hasAvatarCache: {}
}
