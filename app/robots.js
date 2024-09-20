export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ["/dashboard", "/dashboard_admin"],
    },
    sitemap: 'https://dmayorfitness.com/sitemap.xml',
  }
}