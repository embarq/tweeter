import init from '../core/firebase'
// @ts-check
import AuthContainer from "./auth";
import RouingContainer from "./routing";

export default function AppContainer({ children }) {
  init()

  return (
    <AuthContainer>
      <RouingContainer>
        {children}
      </RouingContainer>
    </AuthContainer>
  )
}
