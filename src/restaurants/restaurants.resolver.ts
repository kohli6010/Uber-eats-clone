import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateNewRestaurantDTO } from './dto/createRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';

@Resolver()
export class RestaurantsResolver {
  constructor(private readonly restaurant: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurant.getAllRestaurants();
  }

  @Mutation((returns) => Boolean)
  async createNewRestaurant(
    @Args('input') createNewRestaurant: CreateNewRestaurantDTO,
  ): Promise<boolean> {
    try {
      await this.restaurant.createRestaurant(createNewRestaurant);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
