import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CreateNewRestaurantDTO } from './dto/createRestaurant.dto';
import { UpdateRestaurantDTO } from './dto/updateRestaurant.dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';

@Resolver()
export class RestaurantsResolver {
  constructor(private readonly restaurant: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(
    @Context() context
  ): Promise<Restaurant[]> {
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

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('id') id:number,
    @Args('dto') updateRestaurantDTO: UpdateRestaurantDTO
  ): Promise<Boolean>{
    try{
      await this.restaurant.updateRestaurant(id, updateRestaurantDTO);
      return true;
    }catch(e){
      console.log(e);
      return false;
    }
  }
}
