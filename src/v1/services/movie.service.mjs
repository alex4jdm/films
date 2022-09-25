import db from '../models/index.js';

export class MovieService {
  constructor() {
    this.movieModel = db.Movie;
    this.actorModel = db.Actor;
    this.moviesActorsModel = db.MoviesActors;
  }

  async createAndGetExistedActors(actors) {
    return Promise.all(actors.map(async (actorName) => {
      const actor = await this.actorModel.findOne({
        where: {
          name: actorName
        }
      });
      if (actor) return actor;
      return this.actorModel.create({ name: actorName });
    }));
  }

  async applyActors(actors, movieId) {
    actors.map(actor => actor.dataValues).forEach(actor => this.moviesActorsModel.create({
      actorId: actor.id,
      movieId
    }));
  }

  async createMovie(movieData) {
    const { title, year, format } = movieData;
    const movie = await this.movieModel.create({
      title,
      year,
      format
    });

    const actors = await this.createAndGetExistedActors(movieData.actors);
    await this.applyActors(actors, movie.dataValues.id);

    return this.movieModel.findOne({
      where: {
        id: movie.dataValues.id
      },
      include: {
        model: this.actorModel, as: 'actors'
      }
    });
  }

  async deleteMovie(id) {
    const movie = await this.movieModel.findById(parseInt(id));
    await movie.destroy();
    return 1;
  }

  async updateMovie(rawId, movieData) {
    const id = parseInt(rawId);
    const movie = await this.movieModel.findOne({
      where: {
        id
      },
      include: {
        model: this.actorModel, as: 'actors'
      }
    });

    this.moviesActorsModel.destroy({
      where: {
        movieId: id
      }
    });

    const { rawActors } = movieData;
    const actors = await this.createAndGetExistedActors(rawActors);
    await this.applyActors(actors, movie.dataValues.id);
    await movie.update(movieData);

    return this.movieModel.findOne({
      where: {
        id
      },
      include: {
        model: this.actorModel, as: 'actors'
      }
    });
  }
}