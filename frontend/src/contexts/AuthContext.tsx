import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import userServiceAxiosInstance from "../services/userService";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any | null;
}

interface IAuthContext extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferredLanguage: (language: string) => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<IAuthContext>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updatePreferredLanguage: () => Promise.resolve(),
});

interface InitializeAction {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    user: any | null;
  };
}

interface LoginAction {
  type: "LOGIN";
  payload: {
    user: any;
  };
}

interface LogoutAction {
  type: "LOGOUT";
}

interface UpdatePreferredLanguage {
  type: "UPDATELANGUAGE",
  payload: {
    user: any;
  }
}

type AuthAction = InitializeAction | LoginAction | LogoutAction | UpdatePreferredLanguage;

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "UPDATELANGUAGE":
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);

          const response = await userServiceAxiosInstance.get("/users/me");
          const { data: user } = response;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();

    isMounted.current = true;
  }, []);

  const getTokens = async (email: string, password: string) => {
    try {
      const response = await userServiceAxiosInstance.post("/auth/login", {
        email,
        password,
      });

      setSession(response.data.access_token, response.data.refresh_token);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await getTokens(email, password);

      const response = await userServiceAxiosInstance.get("/users/me");
      const { data: user } = response;

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
  };

  const updatePreferredLanguage = async (language: string) => {
    try {
      const response = await userServiceAxiosInstance.post("/users/update", {
        language
      });
      const { data: user } = response;

      dispatch({
        type: "UPDATELANGUAGE",
        payload: {
          user,
        },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updatePreferredLanguage,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuth = () => useContext(AuthContext);
