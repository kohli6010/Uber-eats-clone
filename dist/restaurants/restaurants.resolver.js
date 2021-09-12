"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createRestaurant_dto_1 = require("./dto/createRestaurant.dto");
const restaurants_entity_1 = require("./entities/restaurants.entity");
const restaurants_service_1 = require("./restaurants.service");
let RestaurantsResolver = class RestaurantsResolver {
    constructor(restaurant) {
        this.restaurant = restaurant;
    }
    restaurants() {
        return this.restaurant.getAllRestaurants();
    }
    async createNewRestaurant(createNewRestaurant) {
        try {
            await this.restaurant.createRestaurant(createNewRestaurant);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => [restaurants_entity_1.Restaurant]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantsResolver.prototype, "restaurants", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRestaurant_dto_1.CreateNewRestaurantDTO]),
    __metadata("design:returntype", Promise)
], RestaurantsResolver.prototype, "createNewRestaurant", null);
RestaurantsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantService])
], RestaurantsResolver);
exports.RestaurantsResolver = RestaurantsResolver;
//# sourceMappingURL=restaurants.resolver.js.map