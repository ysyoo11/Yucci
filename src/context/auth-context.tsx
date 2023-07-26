import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import firebaseApp from '../service/firebase';

import { useAssertiveStore } from './assertives';

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

type AuthServiceProvider = 'google' | 'github';

export type AuthStore = AuthState & {
  login: (serviceProvider: AuthServiceProvider) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState>(initialState);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { showNoti, showAlert } = useAssertiveStore();

  const auth = getAuth(firebaseApp);

  const login = async (serviceProvider: AuthServiceProvider) => {
    let authServiceProvider: AuthProvider;
    switch (serviceProvider) {
      case 'google':
        authServiceProvider = new GoogleAuthProvider();
        break;
      case 'github':
        authServiceProvider = new GithubAuthProvider();
        break;
      default:
        throw new Error('The service provider is not available');
    }
    await signInWithPopup(auth, authServiceProvider).catch(showAlert);
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .then(() => showNoti({ title: 'Signed out successfully' }))
      .catch(showAlert);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthStore>(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context as AuthStore;
};
