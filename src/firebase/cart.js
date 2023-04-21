import { equalTo, get, getDatabase, orderByChild, orderByKey, push, query, ref, remove, set } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

export function addOrUpdateCart(userId, product) {
  const processProduct = {
    ...product,
    count: product?.count ? product.count + 1 : 1,
  };
  return set(ref(database, `carts/${userId}/${product.id}`), processProduct);
}

export function getCarts(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    console.log("123123");
    if (snapshot.exists()) {
      const data = snapshot.val();
      const filteredData = Object.values(data);

      return filteredData;
    } else {
      return [];
    }
  });
}

export function removeCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
