import { Order } from "../entity/Order";
import { Repository } from "./Repository";

export interface OrderRepositoryInterface extends Repository<Order> { }
