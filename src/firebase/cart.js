import { equalTo, get, getDatabase, orderByChild, orderByKey, push, query, ref, set } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

export function addOrUpdateCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
