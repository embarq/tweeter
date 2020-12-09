export default function Conditional({ children, displayIf }) {
  return displayIf ? children : null
}
