import { Restaurant } from "./entities/restaurants.entity";
import { Repository } from 'typeorm';
import { CreateNewRestaurantDTO } from "./dto/createRestaurant.dto";
export declare class RestaurantService {
    private readonly restaurants;
    constructor(restaurants: Repository<Restaurant>);
    getAllRestaurants(): Promise<Restaurant[]>;
    createRestaurant(createNewRestaurant: CreateNewRestaurantDTO): Promise<Restaurant>;
}
