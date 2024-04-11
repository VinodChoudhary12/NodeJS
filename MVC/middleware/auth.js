import jwt from "jsonwebtoken";

export const auth = async (request, response, next) => {
  try {
    let token = request.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      "adjlakdladklaldnkandknakdnnakndajdkjkandknadknkndkdajfnvksnfseofiwn"
    );
    next();
  } catch (err) {
    return response.status(401).json({ error: "Unauthorized access..." });
  }
};

export default auth;
