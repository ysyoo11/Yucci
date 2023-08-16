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
import { get, ref } from 'firebase/database';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import firebaseApp, { db } from '../service/firebase';

import { useAssertiveStore } from './assertives';

type MyUser = User & {
  isAdmin: boolean;
};

export type AuthState = {
  user: MyUser | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

type AuthServiceProvider = 'google' | 'github';

export type AuthStore = AuthState & {
  login: (serviceProvider: AuthServiceProvider) => void;
  logout: () => void;
  uid: string | null;
};

export const AuthContext = createContext<AuthState>(initialState);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MyUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    await signInWithPopup(auth, authServiceProvider).catch(console.error);
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .then(() => showNoti({ title: 'Signed out successfully' }))
      .catch(showAlert);
  };

  const checkAdmin = async (user: User): Promise<MyUser> => {
    return get(ref(db, 'admins')) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins = snapshot.val() as string[];
          const isAdmin = admins.includes(user.uid);
          return { ...user, isAdmin };
        }
        return { ...user, isAdmin: false };
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const updatedUser = await checkAdmin(user) //
          .finally(() => setIsLoading(false));
        setUser(updatedUser);
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthStore>(
    () => ({
      user,
      uid: user && user.uid,
      isLoading,
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
