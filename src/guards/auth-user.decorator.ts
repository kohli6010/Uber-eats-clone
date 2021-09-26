import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const AuthUser =  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    if(gqlContext['user']){
        return gqlContext['user']
    }

    return {};
})