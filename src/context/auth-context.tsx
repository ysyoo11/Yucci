import {
  AuthProvider,
  GoogleAuthProvider,
  User,
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
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

import { LOCAL_STORAGE_KEY } from '../constant/local-storage-key';
import firebaseApp, { db } from '../service/firebase';
import { isDev } from '../utils/env';

import { useAssertiveStore } from './assertives';

type MyUser = User & {
  isAdmin: boolean;
};

export type AuthState = {
  user: MyUser | null;
  isLoading: boolean;
  isAuthEmailSent: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthEmailSent: false,
};

type AuthServiceProvider = 'google';

export type AuthStore = AuthState & {
  login: (serviceProvider: AuthServiceProvider) => void;
  logout: () => void;
  uid: string | null;
  loginWithEmail: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthState>(initialState);

const actionCodeSettings = {
  url: isDev
    ? 'http://localhost:3000/redirect'
    : 'https://yucci.vercel.app/redirect',
  handleCodeInApp: true,
};

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MyUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthEmailSent, setIsAuthEmailSent] = useState(false);
  const { showNoti, showAlert } = useAssertiveStore();

  const auth = getAuth(firebaseApp);

  const login = async (serviceProvider: AuthServiceProvider) => {
    let authServiceProvider: AuthProvider;
    switch (serviceProvider) {
      case 'google':
        authServiceProvider = new GoogleAuthProvider();
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

  const loginWithEmail = async (email: string) => {
    setIsLoading(true);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        setIsAuthEmailSent(true);
        window.localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL_FOR_SIGNIN, email);
      })
      .catch((e) => {
        console.error(e);
        showAlert(e);
      })
      .finally(() => setIsLoading(false));
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

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem(
        LOCAL_STORAGE_KEY.EMAIL_FOR_SIGNIN
      );
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email || '', window.location.href) //
        .catch(console.error)
        .finally(() => setIsAuthEmailSent(false));
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const value = useMemo<AuthStore>(
    () => ({
      user,
      uid: user && user.uid,
      isLoading,
      login,
      logout,
      loginWithEmail,
      isAuthEmailSent,
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
