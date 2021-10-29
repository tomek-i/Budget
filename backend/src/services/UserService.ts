const getById = async (id: string) => {
  return new Promise((res, rej) => {
    res({
      id,
      username: "test",
      email: "test@example.com",
    });
  });
};

export const UserService = { get: getById };
