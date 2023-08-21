import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function useFavourite({
  listingId,
  currentUser,
}: IUseFavourite) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Error");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { toggleFavourite, hasFavorited };
}
