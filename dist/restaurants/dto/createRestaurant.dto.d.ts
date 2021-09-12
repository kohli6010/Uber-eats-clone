import { Restaurant } from "../entities/restaurants.entity";
declare const CreateNewRestaurantDTO_base: import("@nestjs/common").Type<Omit<Restaurant, "id">>;
export declare class CreateNewRestaurantDTO extends CreateNewRestaurantDTO_base {
}
export {};
