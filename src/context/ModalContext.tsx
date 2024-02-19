import React, { useMemo, useState } from "react";

enum ModalView {
  Login = "login",
  ForgetPassword = "forgetPassword",
  Register = "Register",
  ConfirmPassword = "ConfirmPassword"
}

type AppContextProviderProps = { children: React.ReactNode };

const ModalProvider = React.createContext<
  | {
      view: ModalView;
      setView: React.Dispatch<React.SetStateAction<ModalView>>;
    }
  | undefined
>(undefined);

function ModalContextProvider({ children }: Readonly<AppContextProviderProps>) {
  const [view, setView] = useState<ModalView>(ModalView.Login);

  const value = useMemo(() => {
    return { view, setView };
  }, [view]);

  return (
    <ModalProvider.Provider value={value}>{children}</ModalProvider.Provider>
  );
}

function useModalContext() {
  const context = React.useContext(ModalProvider);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ModalContextProvider, useModalContext, ModalView };
