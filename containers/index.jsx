// @ts-check
import AuthContainer from "./auth";
import RouingContainer from "./routing";

export default function AppContainer({ children }) {
  return (
    <AuthContainer>
      <RouingContainer>
        {children}
      </RouingContainer>
    </AuthContainer>
  )
}
