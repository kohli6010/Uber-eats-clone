import { InputType, PartialType } from "@nestjs/graphql";
import { CreateNewRestaurantDTO } from "./createRestaurant.dto";


@InputType()
export class UpdateRestaurantDTO extends PartialType(CreateNewRestaurantDTO){

}