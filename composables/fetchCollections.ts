export const useFetchCollections = async () => {
  try {
    const response = await $fetch<
      {
        id: number;
        name: string;
        target_audience: string;
        image: string;
      }[]
    >("/collections/", {
      baseURL: useRuntimeConfig().public.baseUrl,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
