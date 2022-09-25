import { MovieService } from '../services/index.mjs';

export class MovieController {
  constructor() {
    this.movieService = new MovieService();
  }

  createMovie(req, res) {
    this.movieService.createMovie(req.body)
      .then(movie => res.send({ data: movie }))
      .catch(err => res.status(400).send(err.message));
  }

  deleteMovie(req, res) {
    this.movieService.deleteMovie(req.params.id)
      .then(status => res.send({ status }))
      .catch(err => res.status(400).send(err.message));
  }

  updateMovie(req, res) {
    this.movieService.updateMovie(req.params.id, req.body)
      .then(movie => res.send({ data: movie }))
      .catch(err => res.status(400).send(err.message));
  }

  getSingle(req, res) {
    this.movieService.getSingle(req.params.id)
      .then(movie => res.send({ data: movie }))
      .catch(err => res.status(400).send(err.message));
  }

  getMany(req, res) {
    this.movieService.getMany(req.query)
      .then(movies => res.send({ data: movies }))
      .catch(err => res.status(400).send(err.message));
  }

  importMovies(req, res) {
    this.movieService.importMovies(req.file)
    .then(movies => res.send({ data: movies }))
    .catch(err => res.status(400).send(err.message));
  }
}