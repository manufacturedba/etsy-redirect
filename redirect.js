const listingUrl = new URL(window.location.href);

// Using etsrc for now to infer referrer to listing
if (!listingUrl.searchParams.has("etsrc")) {
  const allLinks = document.querySelectorAll("a");

  for (let i = 0; i < allLinks.length; i++) {
    const url = new URL(allLinks[i].href);

    // Link on page that contains listing ID and shopname
    // TODO: Use a comparison between page URL and this link's listing ID
    if (
      url.searchParams.get("from_page") === "listing" &&
      url.searchParams.has("listing_id")
    ) {
      const paths = url.pathname.split("/").slice(1);
      const listingId = url.searchParams.get("listing_id");

      // Treading carefully
      if (paths[0] === "shop") {
        const shopName = paths[1];
        window.location.href = `https://${shopName}.etsy.com/listing/${listingId}`;
        break;
      }
    }
  }

  console.debug("Etsy Redirect: No redirect for shop page found");
}
