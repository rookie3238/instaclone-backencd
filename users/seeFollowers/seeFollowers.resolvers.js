import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }, //특정 필드를 성택 한다
      });
      if (!ok) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다!",
        };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: { username }, //some: 필터링 되는 요소에 하나 이상 부합하는 값
            //every: 필터링  관계 없이 모든 값을  가져옴
            //none:  아무것도 가져 오지 않음
          },
        },
      });
      console.log(followers);
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
