import type { IronSession } from 'iron-session';
import type { SessionData } from './types';

export const getSessionFromServer = async (): Promise<
  IronSession<SessionData>
> => {
  const { getSession } = await import('./session');
  return getSession();
};
