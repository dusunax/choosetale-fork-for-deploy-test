"use server";
type formFields = Record<string, string>;

export const createGame = async (formData: formFields) => {
  const game = {
    title: formData.title,
    pageOneContent: formData.pageOneContent,
  };

  try {
    console.log("post", game);
    return new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
