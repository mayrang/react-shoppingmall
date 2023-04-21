import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProduct, getProduct, getProducts } from "../firebase/product";

export default function useProduct(productId) {
  const queryClient = useQueryClient();
  const addProductQuery = useMutation(({ product }) => addProduct(product), {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
  const productsQuery = useQuery(["products"], async () => getProducts(), {
    staleTime: 1000 * 60 * 5,
  });
  const productQuery = useQuery(["productDetail", productId], async () => getProduct(productId));
  return { addProductQuery, productsQuery, productQuery };
}
