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
        // Exclui arquivos do sistema e a própria home (que não tem nada após a barra no matcher)
        source: '/:path((?!api|_next|favicon.ico).+)',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
