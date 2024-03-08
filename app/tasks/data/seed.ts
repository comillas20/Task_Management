import { faker } from "@faker-js/faker";

import { priorities, statuses } from "./data";
import { Task } from "@/schema/task-form-schema";

export const tasks: Task[] = Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    title: faker.hacker
        .phrase()
        .replace(/^./, (letter) => letter.toUpperCase()),
    description: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(statuses).value,
    priority: faker.helpers.arrayElement(priorities).value,
}));
