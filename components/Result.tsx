import { PiClockDuotone } from "react-icons/pi";
import { FaImdb } from "react-icons/fa";

export default function Result(props: {
  r: any;
  view: string;
  colorMode: string;
}) {
  return (
    <>
      <div className={`my-2 flex space-x-2 ${props.view == 'grid' && 'flex-col'} items-center p-2 rounded-xl cursor-default ${props.colorMode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700' }`}>
        <img 
          src={`${props.r.Poster != 'N/A' ? props.r.Poster : 'poster.png'}`} 
          className={`${props.view == 'grid' ? 'w-full mb-2' : 'w-10'} rounded-lg border border-gray-400`} 
          alt={`Poster for ${props.r.Title}`} 
        />
        <div className={`flex-grow ${props.view == 'list' && 'flex flex-col sm:flex-row space-x-4 sm:space-x-10'}`}>
          <div className={`flex-grow font-semibold w-full sm:px-0 ${props.view == 'grid' ? '' : 'mx-5'}`}>{props.r.Title}</div>
          <div className={`flex items-center text-center`}><PiClockDuotone className="mr-1" /> {props.r.Year}</div>
          <a href={`https://www.imdb.com/title/${props.r.imdbID}/`} target="_blank">
            <div className="flex items-center text-center font-mono">
              <FaImdb className="mr-1" /> {props.r.imdbID}
            </div>
          </a>
        </div>
      </div>
    </>
  );
}