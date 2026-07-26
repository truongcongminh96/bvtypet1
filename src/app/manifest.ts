import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pet One Veterinary Care",
    short_name: "Pet One",
    description:
      "Chăm sóc thú y rõ ràng, nhẹ nhàng và tận tâm cho từng thú cưng.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafcfd",
    theme_color: "#1684d6",
    icons: [
      {
        src: "/brand/pet-one-source.jpg",
        sizes: "1703x1378",
        type: "image/jpeg",
      },
    ],
  };
}
