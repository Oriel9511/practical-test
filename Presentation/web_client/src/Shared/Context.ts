import {UserServices} from "../Users/services.ts";
import {TasksServices} from "../Tasks/services.ts";


let _services: ServicesContext | null = null;

class ServicesContext {
  constructor() {
    this.user = new UserServices();
    this.tasks = new TasksServices();
  }
  user: UserServices;
  tasks: TasksServices;
}

const getContext = () => {
  if (!_services) {
    _services = new ServicesContext();
  }
  return _services;
};

export const context = getContext();
