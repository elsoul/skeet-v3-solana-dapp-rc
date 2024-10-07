export enum DEFAULT_PATHS {
  home = '/',
  doc = '/doc/general/getting-started',
  blinks = '/blinks',
  news = '/news',
  privacy = '/legal/privacy-policy',
}

export const defaultHeaderNav = [
  {
    path: DEFAULT_PATHS.blinks,
    label: 'blinks.title',
  },
  {
    path: DEFAULT_PATHS.doc,
    label: 'doc.title',
  },
  {
    path: DEFAULT_PATHS.news,
    label: 'news.title',
  },
]

export const defaultFooterNav = [
  {
    path: DEFAULT_PATHS.blinks,
    label: 'blinks.title',
  },
  {
    path: DEFAULT_PATHS.doc,
    label: 'doc.title',
  },
  {
    path: DEFAULT_PATHS.news,
    label: 'news.title',
  },
  {
    path: DEFAULT_PATHS.privacy,
    label: 'legal.privacy',
  },
]
