import React from "react";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import getFavoriteListings from "../../actions/getFavoriteListings";
import getCurrentUser from "../../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
const Favorites = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No fav found"
          subtitle="Looks like you have no fav listings"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Favorites;
