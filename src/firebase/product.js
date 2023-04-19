import { get, getDatabase, push, ref, set } from "firebase/database";
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
    console.log("snapshot", snapshot.val());
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
