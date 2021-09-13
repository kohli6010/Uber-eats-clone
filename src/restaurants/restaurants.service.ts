import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurants.entity";
import {Repository} from 'typeorm';
import { CreateNewRestaurantDTO } from "./dto/createRestaurant.dto";
import { UpdateRestaurantDTO } from "./dto/updateRestaurant.dto";


@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurants.find();
  }

  async createRestaurant(createNewRestaurant: CreateNewRestaurantDTO): Promise<Restaurant> {
      const newRestaurant = await this.restaurants.create(createNewRestaurant);
      return this.restaurants.save(newRestaurant);
  }

  async updateRestaurant(id: number, updateRestaurantDTO: UpdateRestaurantDTO){
    return this.restaurants.update(id, {...updateRestaurantDTO});
  }
}