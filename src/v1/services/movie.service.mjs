import db from '../models/index.js';
import { Op } from 'sequelize';

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
    const movie = await this.movieModel.findByPk(parseInt(id));
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

    const { actors } = movieData;
    const updatedActors = await this.createAndGetExistedActors(actors);
    await this.applyActors(updatedActors, movie.dataValues.id);
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

  async getSingle(rawId) {
    return this.movieModel.findOne({
      where: {
        id: parseInt(rawId)
      },
      include: {
        model: this.actorModel, as: 'actors'
      }
    });
  }

  async getMany(query) {
    const qb = {
      order: [[query.sort || 'id', query.order || 'ASC']],
      limit: query.limit || 20,
      offset: query.offset || 0
    };

    if (query.title) {
      qb.where = {
        title: {
          [Op.like]: `%${query.title}%`
        } 
      }
    }
    if (query.actor) {
      qb.include = {
        model: this.actorModel, as: 'actors',
        where: {
          name: {
            [Op.like]: `%${query.actor}%`
          }
        }
      }
    } else if (query.search) {
      qb.include = {
        model: this.actorModel, as: 'actors',
        where: {
          name: {
            [Op.like]: `%${query.search}%`
          }
        }
      }
    } else {
      qb.include = {
        model: this.actorModel, as: 'actors'
      }
    }

    return this.movieModel.findAll(qb);
  }
}