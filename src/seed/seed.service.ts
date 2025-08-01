import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  // async executeSeed() {
  //   await this.pokemonModel.deleteMany({}); // delete * from pokemon

  //   const { data } = await this.axios.get<PokeResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=10',
  //   );

  //   const insertPromisesArray = [];

  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2];

  //     // await this.pokemonModel.create({ name, no });
  //     insertPromisesArray.push(this.pokemonModel.create({ name, no }));
  //   });

  //   const newArray = await Promise.all(insertPromisesArray);

  //   return newArray;
  // }

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemon

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no }); // [{name: bulbasaur, no: 1}]
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    // insert into pokemons (name,no)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)
    // (name: bulbasaur, no: 1)

    return 'Seed Executed';
  }
}
