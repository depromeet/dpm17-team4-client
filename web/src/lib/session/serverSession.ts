export const getSessionFromServer = async () => {
  const { getSession } = await import('./session');
  return await getSession();
};
