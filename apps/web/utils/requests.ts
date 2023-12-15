export const getValidSubdomain = (host: string) => {
  const domain = host.replace("www.", "").replace("localhost", "localhost.local")
  const parts = domain.split(".")

  return parts.length > 2 ? parts[0] : null
}
