import loadingGif from '../assets/loader.gif';

function Loader() {
  return (
    <div className="">
      <img
        src={loadingGif}
        alt="Loading..."
        className='w-32 h-32'
      />
    </div>
  )
}

export default Loader
