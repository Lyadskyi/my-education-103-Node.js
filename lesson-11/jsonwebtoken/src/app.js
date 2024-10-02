import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const payload = {
  email: "xikibi9732@abevw.com",
};

const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
// console.log(jwtToken);
const decodeToken = jwt.decode(jwtToken);
// console.log(decodeToken);

try {
  const { email } = jwt.verify(jwtToken, JWT_SECRET);
  // console.log(email);
  const invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inhpa2liaTk3MzJAYWJldncuY29tIiwiaWF0IjoxNzI3OTExMzI3LCJleHAiOjE3Mjc5OTc3Mjd9.OrMjq70OEvkcXKaHAN6G2N05ikj182qrTKDU5x4U-cw";
  jwt.verify(invalidToken, JWT_SECRET);
} catch (error) {
  console.log(error.message);
}
