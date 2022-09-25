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
}