import type { BlogStats } from '../plugins/blog-stats'

declare module 'virtual:blog-stats' {
  const stats: BlogStats
  export default stats
}
