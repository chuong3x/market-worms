import jwt_decode, { JwtPayload } from "jwt-decode";
const verifyToken = (token: string): boolean => {
  const data: JwtPayload = jwt_decode(token);
  const expired = data.exp;
  const now = Date.now();
  if (expired) {
    if (expired * 1000 - now < 0) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};

export default verifyToken;
