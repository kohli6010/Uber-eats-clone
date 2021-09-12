import { InputType, OmitType } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurants.entity";

@InputType()
export class CreateNewRestaurantDTO extends OmitType(Restaurant, ['id'], InputType) {}