import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
import { addOrUpdateCart, getCarts, removeCart } from "../firebase/cart";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useCart() {
  const user = useRecoilValue(authAtom);
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["cartList", user?.uid || ""], async () => getCarts(user?.uid), {
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5,
  });
  const updateCartQuery = useMutation(
    ({ product }) => {
      return addOrUpdateCart(user?.uid, product);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartList", user?.uid]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const removeCartQuery = useMutation(
    ({ productId }) => {
      return removeCart(user?.uid, productId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartList", user?.uid]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return { cartQuery, updateCartQuery, removeCartQuery };
}
