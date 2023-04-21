import { equalTo, get, getDatabase, orderByChild, orderByKey, push, query, ref, set } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

export async function addProduct({ title, price, description, options, category, imageUrl }) {
  try {
    const productsRef = ref(database, "products");
    const newProductRef = push(productsRef);
    await set(newProductRef, {
      title,
      price,
      description,
      category,
      options,
      imageUrl,
      users: null,
    });
    return "success";
  } catch (err) {
    console.log("err", err);
    return "error;";
  }
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const productArray = [];
      for (const key in data) {
        productArray.push({ id: key, ...data[key] });
      }
      return productArray;
    } else {
      return [];
    }
  });
}

export async function getProduct(productId) {
  return get(query(ref(database, "products"), orderByKey(), equalTo(productId))).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("data", Object.values(snapshot.val()));
      const data = Object.values(snapshot.val())[0];

      return { id: productId, ...data };
    } else {
      return null;
    }
  });
}
