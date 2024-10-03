export const createWebToken = (userId: string): string => {
  const token = {
    userId,
    expires: new Date().getTime() + 2 * 60 * 60 * 1000, // Current time + 2 hours in milliseconds
  }

  return JSON.stringify(token)
}

export const checkTokenExpiration = (
  tokenString: string | null | unknown,
): boolean => {
  if (!tokenString) {
    return true // Token is considered expired if it does not exist
  }

  const token = JSON.parse(tokenString as string)
  return new Date().getTime() > token.expires
}
