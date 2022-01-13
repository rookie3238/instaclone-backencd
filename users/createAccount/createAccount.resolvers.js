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

        const uglyPassword = await bcrypt.hash(password, 10); //패스워드 값을 암호화 처리 한다   인자값 10은 hash 라운드 정의
        
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok:true,
        };  

      } catch (e) {
        return {
          ok:false,
          error:"“사용자를 생성할 수 없습니다”",
        };    
      }
    },
  },
};
