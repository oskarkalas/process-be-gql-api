import { ClassType } from 'type-graphql';
import * as tslib from 'tslib';
import * as crudResolvers from './resolvers/crud/resolvers-crud.index';
import * as argsTypes from './resolvers/crud/args.index';
import * as actionResolvers from './resolvers/crud/resolvers-actions.index';
import * as relationResolvers from './resolvers/relations/resolvers.index';
import * as models from './models';
import * as outputTypes from './resolvers/outputs';
import * as inputTypes from './resolvers/inputs';

export type MethodDecoratorOverrideFn = (
  decorators: MethodDecorator[],
) => MethodDecorator[];

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
  Catalog: crudResolvers.CatalogCrudResolver,
};
const actionResolversMap = {
  User: {
    aggregateUser: actionResolvers.AggregateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    createOneUser: actionResolvers.CreateOneUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    deleteOneUser: actionResolvers.DeleteOneUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
    users: actionResolvers.FindManyUserResolver,
    user: actionResolvers.FindUniqueUserResolver,
    getUser: actionResolvers.FindUniqueUserOrThrowResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    updateOneUser: actionResolvers.UpdateOneUserResolver,
    upsertOneUser: actionResolvers.UpsertOneUserResolver,
  },
  Catalog: {
    aggregateCatalog: actionResolvers.AggregateCatalogResolver,
    createManyCatalog: actionResolvers.CreateManyCatalogResolver,
    createOneCatalog: actionResolvers.CreateOneCatalogResolver,
    deleteManyCatalog: actionResolvers.DeleteManyCatalogResolver,
    deleteOneCatalog: actionResolvers.DeleteOneCatalogResolver,
    findFirstCatalog: actionResolvers.FindFirstCatalogResolver,
    findFirstCatalogOrThrow: actionResolvers.FindFirstCatalogOrThrowResolver,
    catalogs: actionResolvers.FindManyCatalogResolver,
    catalog: actionResolvers.FindUniqueCatalogResolver,
    getCatalog: actionResolvers.FindUniqueCatalogOrThrowResolver,
    groupByCatalog: actionResolvers.GroupByCatalogResolver,
    updateManyCatalog: actionResolvers.UpdateManyCatalogResolver,
    updateOneCatalog: actionResolvers.UpdateOneCatalogResolver,
    upsertOneCatalog: actionResolvers.UpsertOneCatalogResolver,
  },
};
const crudResolversInfo = {
  User: [
    'aggregateUser',
    'createManyUser',
    'createOneUser',
    'deleteManyUser',
    'deleteOneUser',
    'findFirstUser',
    'findFirstUserOrThrow',
    'users',
    'user',
    'getUser',
    'groupByUser',
    'updateManyUser',
    'updateOneUser',
    'upsertOneUser',
  ],
  Catalog: [
    'aggregateCatalog',
    'createManyCatalog',
    'createOneCatalog',
    'deleteManyCatalog',
    'deleteOneCatalog',
    'findFirstCatalog',
    'findFirstCatalogOrThrow',
    'catalogs',
    'catalog',
    'getCatalog',
    'groupByCatalog',
    'updateManyCatalog',
    'updateOneCatalog',
    'upsertOneCatalog',
  ],
};
const argsInfo = {
  AggregateUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  CreateManyUserArgs: ['data', 'skipDuplicates'],
  CreateOneUserArgs: ['data'],
  DeleteManyUserArgs: ['where'],
  DeleteOneUserArgs: ['where'],
  FindFirstUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindFirstUserOrThrowArgs: [
    'where',
    'orderBy',
    'cursor',
    'take',
    'skip',
    'distinct',
  ],
  FindManyUserArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindUniqueUserArgs: ['where'],
  FindUniqueUserOrThrowArgs: ['where'],
  GroupByUserArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  UpdateManyUserArgs: ['data', 'where'],
  UpdateOneUserArgs: ['data', 'where'],
  UpsertOneUserArgs: ['where', 'create', 'update'],
  AggregateCatalogArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  CreateManyCatalogArgs: ['data', 'skipDuplicates'],
  CreateOneCatalogArgs: ['data'],
  DeleteManyCatalogArgs: ['where'],
  DeleteOneCatalogArgs: ['where'],
  FindFirstCatalogArgs: [
    'where',
    'orderBy',
    'cursor',
    'take',
    'skip',
    'distinct',
  ],
  FindFirstCatalogOrThrowArgs: [
    'where',
    'orderBy',
    'cursor',
    'take',
    'skip',
    'distinct',
  ],
  FindManyCatalogArgs: [
    'where',
    'orderBy',
    'cursor',
    'take',
    'skip',
    'distinct',
  ],
  FindUniqueCatalogArgs: ['where'],
  FindUniqueCatalogOrThrowArgs: ['where'],
  GroupByCatalogArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  UpdateManyCatalogArgs: ['data', 'where'],
  UpdateOneCatalogArgs: ['data', 'where'],
  UpsertOneCatalogArgs: ['where', 'create', 'update'],
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<TModel extends ResolverModelNames> =
  keyof (typeof crudResolversMap)[TModel]['prototype'];

export type ResolverActionsConfig<TModel extends ResolverModelNames> = Partial<
  Record<
    ModelResolverActionNames<TModel>,
    MethodDecorator[] | MethodDecoratorOverrideFn
  >
> & {
  _all?: MethodDecorator[];
  _query?: MethodDecorator[];
  _mutation?: MethodDecorator[];
};

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  const mutationOperationPrefixes = [
    'createOne',
    'createMany',
    'deleteOne',
    'updateOne',
    'deleteMany',
    'updateMany',
    'upsertOne',
  ];
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName =
      resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    const allActionsDecorators = resolverActionsConfig._all;
    const resolverActionNames =
      crudResolversInfo[modelName as keyof typeof crudResolversInfo];
    for (const resolverActionName of resolverActionNames) {
      const maybeDecoratorsOrFn = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      const isWriteOperation = mutationOperationPrefixes.some((prefix) =>
        resolverActionName.startsWith(prefix),
      );
      const operationKindDecorators = isWriteOperation
        ? resolverActionsConfig._mutation
        : resolverActionsConfig._query;
      const mainDecorators = [
        ...(allActionsDecorators ?? []),
        ...(operationKindDecorators ?? []),
      ];
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(mainDecorators);
      } else {
        decorators = [...mainDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      const actionTarget = (
        actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function
      ).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof (typeof argsTypes)[TArgsType]['prototype'],
  number | symbol
>;

type ArgFieldsConfig<TArgsType extends ArgsTypesNames> = FieldsConfig<
  ArgFieldNames<TArgsType>
>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName =
      argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  User: relationResolvers.UserRelationsResolver,
  Catalog: relationResolvers.CatalogRelationsResolver,
};
const relationResolversInfo = {
  User: ['catalog'],
  Catalog: ['owner'],
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<TModel extends RelationResolverModelNames> =
  keyof (typeof relationResolversMap)[TModel]['prototype'];

export type RelationResolverActionsConfig<
  TModel extends RelationResolverModelNames,
> = Partial<
  Record<
    RelationResolverActionNames<TModel>,
    MethodDecorator[] | MethodDecoratorOverrideFn
  >
> & { _all?: MethodDecorator[] };

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(
    relationResolversEnhanceMap,
  )) {
    const modelName =
      relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig =
      relationResolversEnhanceMap[modelName]!;
    const allActionsDecorators = relationResolverActionsConfig._all ?? [];
    const relationResolverActionNames =
      relationResolversInfo[modelName as keyof typeof relationResolversInfo];
    for (const relationResolverActionName of relationResolverActionNames) {
      const maybeDecoratorsOrFn = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      tslib.__decorate(
        decorators,
        relationResolverTarget,
        relationResolverActionName,
        null,
      );
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (
  decorators: PropertyDecorator[],
) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
> & { _all?: PropertyDecorator[] };

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object,
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[],
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[typeFieldName] as
        | PropertyDecorator[]
        | PropertyDecoratorOverrideFn
        | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === 'function') {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...(maybeDecoratorsOrFn ?? [])];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  Catalog: ['id', 'title', 'description', 'type', 'author', 'ownerId'],
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof (typeof models)[TModel]['prototype'],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUser: ['_count', '_avg', '_sum', '_min', '_max'],
  UserGroupBy: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  AggregateCatalog: ['_count', '_avg', '_sum', '_min', '_max'],
  CatalogGroupBy: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  AffectedRowsOutput: ['count'],
  UserCount: ['catalog'],
  UserCountAggregate: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    '_all',
  ],
  UserAvgAggregate: ['id'],
  UserSumAggregate: ['id'],
  UserMinAggregate: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
  ],
  UserMaxAggregate: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
  ],
  CatalogCountAggregate: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    '_all',
  ],
  CatalogAvgAggregate: ['id', 'ownerId'],
  CatalogSumAggregate: ['id', 'ownerId'],
  CatalogMinAggregate: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  CatalogMaxAggregate: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof (typeof outputTypes)[TOutput]['prototype'],
  number | symbol
>;

type OutputTypeFieldsConfig<TOutput extends OutputTypesNames> = FieldsConfig<
  OutputTypeFieldNames<TOutput>
>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName =
      outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserWhereInput: [
    'AND',
    'OR',
    'NOT',
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    'catalog',
  ],
  UserOrderByWithRelationInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    'catalog',
  ],
  UserWhereUniqueInput: [
    'id',
    'email',
    'AND',
    'OR',
    'NOT',
    'firstName',
    'lastName',
    'picture',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    'catalog',
  ],
  UserOrderByWithAggregationInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    '_count',
    '_avg',
    '_max',
    '_min',
    '_sum',
  ],
  UserScalarWhereWithAggregatesInput: [
    'AND',
    'OR',
    'NOT',
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  CatalogWhereInput: [
    'AND',
    'OR',
    'NOT',
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    'owner',
  ],
  CatalogOrderByWithRelationInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    'owner',
  ],
  CatalogWhereUniqueInput: [
    'id',
    'AND',
    'OR',
    'NOT',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    'owner',
  ],
  CatalogOrderByWithAggregationInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
    '_count',
    '_avg',
    '_max',
    '_min',
    '_sum',
  ],
  CatalogScalarWhereWithAggregatesInput: [
    'AND',
    'OR',
    'NOT',
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  UserCreateInput: [
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    'catalog',
  ],
  UserUpdateInput: [
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
    'catalog',
  ],
  UserCreateManyInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  UserUpdateManyMutationInput: [
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  CatalogCreateInput: ['title', 'description', 'type', 'author', 'owner'],
  CatalogUpdateInput: ['title', 'description', 'type', 'author', 'owner'],
  CatalogCreateManyInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  CatalogUpdateManyMutationInput: ['title', 'description', 'type', 'author'],
  IntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  StringNullableFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
  ],
  StringFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
  ],
  DateTimeFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  EnumRoleFilter: ['equals', 'in', 'notIn', 'not'],
  EnumProviderNullableListFilter: [
    'equals',
    'has',
    'hasEvery',
    'hasSome',
    'isEmpty',
  ],
  CatalogListRelationFilter: ['every', 'some', 'none'],
  SortOrderInput: ['sort', 'nulls'],
  CatalogOrderByRelationAggregateInput: ['_count'],
  UserCountOrderByAggregateInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  UserAvgOrderByAggregateInput: ['id'],
  UserMaxOrderByAggregateInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
  ],
  UserMinOrderByAggregateInput: [
    'id',
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
  ],
  UserSumOrderByAggregateInput: ['id'],
  IntWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  StringNullableWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  StringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'mode',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  DateTimeWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  EnumRoleWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  UserRelationFilter: ['is', 'isNot'],
  CatalogCountOrderByAggregateInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  CatalogAvgOrderByAggregateInput: ['id', 'ownerId'],
  CatalogMaxOrderByAggregateInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  CatalogMinOrderByAggregateInput: [
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  CatalogSumOrderByAggregateInput: ['id', 'ownerId'],
  UserCreateproviderInput: ['set'],
  CatalogCreateNestedManyWithoutOwnerInput: [
    'create',
    'connectOrCreate',
    'createMany',
    'connect',
  ],
  NullableStringFieldUpdateOperationsInput: ['set'],
  StringFieldUpdateOperationsInput: ['set'],
  DateTimeFieldUpdateOperationsInput: ['set'],
  EnumRoleFieldUpdateOperationsInput: ['set'],
  UserUpdateproviderInput: ['set', 'push'],
  CatalogUpdateManyWithoutOwnerNestedInput: [
    'create',
    'connectOrCreate',
    'upsert',
    'createMany',
    'set',
    'disconnect',
    'delete',
    'connect',
    'update',
    'updateMany',
    'deleteMany',
  ],
  IntFieldUpdateOperationsInput: [
    'set',
    'increment',
    'decrement',
    'multiply',
    'divide',
  ],
  UserCreateNestedOneWithoutCatalogInput: [
    'create',
    'connectOrCreate',
    'connect',
  ],
  UserUpdateOneRequiredWithoutCatalogNestedInput: [
    'create',
    'connectOrCreate',
    'upsert',
    'connect',
    'update',
  ],
  NestedIntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringNullableFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
  ],
  NestedStringFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
  ],
  NestedDateTimeFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
  ],
  NestedEnumRoleFilter: ['equals', 'in', 'notIn', 'not'],
  NestedIntWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_avg',
    '_sum',
    '_min',
    '_max',
  ],
  NestedFloatFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringNullableWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  NestedIntNullableFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
  ],
  NestedStringWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'startsWith',
    'endsWith',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  NestedDateTimeWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'lt',
    'lte',
    'gt',
    'gte',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  NestedEnumRoleWithAggregatesFilter: [
    'equals',
    'in',
    'notIn',
    'not',
    '_count',
    '_min',
    '_max',
  ],
  CatalogCreateWithoutOwnerInput: ['title', 'description', 'type', 'author'],
  CatalogCreateOrConnectWithoutOwnerInput: ['where', 'create'],
  CatalogCreateManyOwnerInputEnvelope: ['data', 'skipDuplicates'],
  CatalogUpsertWithWhereUniqueWithoutOwnerInput: ['where', 'update', 'create'],
  CatalogUpdateWithWhereUniqueWithoutOwnerInput: ['where', 'data'],
  CatalogUpdateManyWithWhereWithoutOwnerInput: ['where', 'data'],
  CatalogScalarWhereInput: [
    'AND',
    'OR',
    'NOT',
    'id',
    'title',
    'description',
    'type',
    'author',
    'ownerId',
  ],
  UserCreateWithoutCatalogInput: [
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  UserCreateOrConnectWithoutCatalogInput: ['where', 'create'],
  UserUpsertWithoutCatalogInput: ['update', 'create', 'where'],
  UserUpdateToOneWithWhereWithoutCatalogInput: ['where', 'data'],
  UserUpdateWithoutCatalogInput: [
    'firstName',
    'lastName',
    'picture',
    'email',
    'password',
    'refreshToken',
    'createdAt',
    'updatedAt',
    'role',
    'provider',
  ],
  CatalogCreateManyOwnerInput: ['id', 'title', 'description', 'type', 'author'],
  CatalogUpdateWithoutOwnerInput: ['title', 'description', 'type', 'author'],
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof (typeof inputTypes)[TInput]['prototype'],
  number | symbol
>;

type InputTypeFieldsConfig<TInput extends InputTypesNames> = FieldsConfig<
  InputTypeFieldNames<TInput>
>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName =
      inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}
