import { equalTo, get, getDatabase, orderByKey, push, query, ref, set } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

export async function addProduct({ title, price, description, options, category, imageUrl }) {
  try {
    const productsRef = ref(database, "products");
    const newProductRef = push(productsRef);
    return await set(newProductRef, {
      title,
      price,
      description,
      category,
      options,
      imageUrl,
      users: null,
    });
  } catch (err) {
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
  if (!productId) {
    // productId 값이 없으면 null 반환
    return null;
  }
  return get(query(ref(database, "products"), orderByKey(), equalTo(productId))).then((snapshot) => {
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val())[0];

      return { id: productId, ...data };
    } else {
      return null;
    }
  });
}
