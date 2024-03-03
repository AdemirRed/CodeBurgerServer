import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

export default (request, response, next) => {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({
      erro: "Token not provided",
      message: "Token não encontrado",
    });
  }

  const token = authToken.split(" ")[1];

  // console.log("----------------------------------------------------------------------------------------------");
  // console.log(token);
  // console.log("----------------------------------------------------------------------------------------------");

  try {
    // Tenta verificar o token JWT
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      // Se ocorrer um erro durante a verificação do token
      if (err) {
        // Lança um erro para ser capturado pelo bloco catch
        throw new Error();
      }

      request.userId = decoded.id;
      request.userName = decoded.name;

      // Chama a próxima função middleware na cadeia de middleware
      return next();
    });
  } catch (error) {
    // Se houver um erro durante a verificação do token, retorna uma resposta de erro 401
    return response
      .status(401)
      .json({ Erro: "Token is invalid", message: "Token é inválido" });
  }
};
// Se a verificação do token for bem-sucedida, chama a próxima função middleware na cadeia de middleware
