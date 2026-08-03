export const SANITY_CONTENT_TAG = "sanity-content";

export const sanityFetchOptions = {
  next: {
    revalidate: 300,
    tags: [SANITY_CONTENT_TAG],
  },
};
