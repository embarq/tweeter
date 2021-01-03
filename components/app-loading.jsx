import Loader from './loader'

export default function AppLoading() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center bg-indigo-400 text-white">
      <h1 className="text-4xl font-bold">Tweeter</h1>
      <div className="w-1/6 p-4 flex flex-row justify-center items-center">
        <div className="w-6 h-6">
          <Loader />
        </div>
        <p className="ml-2">Loading</p>
      </div>
    </div>
  )
}
