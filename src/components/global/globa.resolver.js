import { GraphQLDateTime } from "graphql-iso-date";
import faker from "faker";

import { UserModel } from "../user";
import { TaskModel } from "../task";

import { randomDate } from "./global.helper";

export const globalResolver = {
  DateTime: GraphQLDateTime,
  Mutation: {
    async seed() {
      if (process.env.NODE_ENV !== "development") {
        return "Hello World";
      }

      await Promise.all([UserModel.deleteMany({}), TaskModel.deleteMany({})]);

      const userIds = (await UserModel.insertMany([
        new UserModel({
          email: "lednhatkhanh@gmail.com",
          password: "Abc123@@",
          name: "Nhat Khanh",
        }),
        ...Array.from(new Array(4)).map(
          () =>
            new UserModel({
              email: faker.internet.email().toLowerCase(),
              name: faker.name.firstName(),
              password: "Abc123@@",
            }),
        ),
      ])).map(user => user.id);

      await TaskModel.insertMany(
        Array.from(new Array(100)).map(() => {
          const due = faker.random.arrayElement([
            randomDate(new Date(), new Date(2019, 11, 31)),
            undefined,
          ]);
          const notification = due
            ? faker.random.arrayElement([randomDate(new Date(), due), undefined])
            : undefined;

          return new TaskModel({
            title: faker.name.title(),
            color: faker.random.arrayElement([
              "#f2a3bd",
              "#d6d963",
              "#6fe7db",
              "#c4adc9",
              "#ed7777",
              "#fad48b",
              "#f5f9ad",
              "#bcdf8a",
              "#94c0cc",
            ]),
            due,
            notification,
            ownerId: faker.random.arrayElement(userIds),
          });
        }),
      );

      return `Seeding succeeded`;
    },
  },
};
