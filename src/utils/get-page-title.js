import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Fil Batch Transfer Tool(v2.0)'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
