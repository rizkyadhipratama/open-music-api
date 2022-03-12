/* eslint-disable linebreak-style */
/* eslint-disable arrow-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

// Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi.
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const albums = require('./api/albums');
const SongsService = require('./services/postgres/SongsService');
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsValidator = require('./validator/songs');
const AlbumsValidator = require('./validator/albums');

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();