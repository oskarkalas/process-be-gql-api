import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GqlReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = ctx.getArgByIndex(2);
    return context.req;
  },
);
