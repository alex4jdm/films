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
}