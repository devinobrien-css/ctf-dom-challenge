export const httpGet = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch HTML content');
  }
  return await response.text();
};
