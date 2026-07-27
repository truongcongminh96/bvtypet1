export function onlyVerified<T extends { verified: boolean }>(items: T[]) {
  return items.filter((item) => item.verified);
}
