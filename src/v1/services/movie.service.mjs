import db from '../models/index.js';

export class MovieService {
  constructor() {
    this.movieModel = db.Movie;
    this.actorModel = db.Actor;
    this.moviesActorsModel = db.MoviesActors;
  }

  async createMovie(movieData) {
    const actors = await Promise.all(movieData.actors.map(async (actorName) => {
      const actor = await this.actorModel.findOne({
        where: {
          name: actorName
        }
      });
      if (actor) return actor;
      return this.actorModel.create({ name: actorName });
    }));

    const { title, year, format } = movieData;
    const movie = await this.movieModel.create({
      title,
      year,
      format
    });

    actors.map(actor => actor.dataValues).forEach(actor => this.moviesActorsModel.create({
      actorId: actor.id,
      movieId: movie.dataValues.id
    }));

    return this.movieModel.findOne({
      where: {
        id: movie.dataValues.id
      },
      include: {
        model: this.actorModel, as: 'actors'
      }
    });
  }
}