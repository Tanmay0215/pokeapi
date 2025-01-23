import { loadingGif } from '../assets/loader.gif';

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
    <img
      src={loadingGif}
      alt="Loading..."
    />
  </div>
  )
}

export default Loader
