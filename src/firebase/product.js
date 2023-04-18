import { getDatabase, push, ref, set } from "firebase/database";
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
    });
    return "success";
  } catch (err) {
    console.log("err", err);
    return "error;";
  }
}
