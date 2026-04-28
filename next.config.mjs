/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psiandriellyoliveira.com.br',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redireciona qualquer caminho que tenha pelo menos 1 caractere após a barra
        // Exclui arquivos do sistema, SEO, imagens e a própria home
        source: '/:path((?!api|_next|favicon.ico|sitemap.xml|robots.txt|images|icon.png).+)',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
