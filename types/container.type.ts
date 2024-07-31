import { Item } from "./item.type";

export interface Container {
  id: string;
  title: string;
  items: Item[];
}
