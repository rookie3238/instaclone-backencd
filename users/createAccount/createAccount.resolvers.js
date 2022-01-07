import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error("사용자 명과 비밀번호에 대한 토큰이 존재합니다.");
        }
        console.log(password);
        const uglyPassword = await bcrypt.hash(password, 10); //패스워드 값을 암호화 처리 한다   인자값 10은 hash 라운드 정의
        console.log(uglyPassword);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
