import { CreateNewRestaurantDTO } from './dto/createRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';
export declare class RestaurantsResolver {
    private readonly restaurant;
    constructor(restaurant: RestaurantService);
    restaurants(): Promise<Restaurant[]>;
    createNewRestaurant(createNewRestaurant: CreateNewRestaurantDTO): Promise<boolean>;
}
