module.exports = {
  async redirects() {
    return [
      {
        source: '/posts/using-usestate-in-reasonreact/',
        destination: '/posts/using-usestate-in-rescript-react/',
        permanent: true,
      },
      {
        source: '/posts/using-usereducer-in-reasonreact/',
        destination: '/posts/using-usereducer-in-rescript-react/',
        permanent: true,
      },
      {
        source: '/posts/using-usecontext-in-reasonreact/',
        destination: '/posts/using-usecontext-in-rescript-react/',
        permanent: true,
      },
    ]
  },
}
