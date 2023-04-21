import { equalTo, get, getDatabase, orderByChild, orderByKey, push, query, ref, set } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

export function addOrUpdateCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export function getCarts(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const filteredData = [];
      for (const key in data) {
        const index = filteredData.findIndex((item) => item.uid === data[key].uid && item.option === data[key].option);
        if (index > 0) {
          filteredData[index] = { ...filteredData[index], count: filteredData[index] + 1 };
        } else {
          filteredData.push({ id: key, count: 1, ...data[key] });
        }
      }
      return filteredData;
    } else {
      return [];
    }
  });
}
