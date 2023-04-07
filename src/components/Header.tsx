import { Link, useNavigate } from 'react-router-dom';
import { useProject } from '../hooks';
import SearchBar from './SearchBar';

const Header = () => {
  const { handleSearchBar } = useProject();
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          <span
            onClick={() => navigate('/projects')}
            className='hover:cursor-pointer hover:text-sky-800'
          >
            EasyTask
          </span>
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleSearchBar}
          >
            Search Project
          </button>

          <Link to='/projects' className='font-bold uppercase'>
            Projects
          </Link>

          <button
            type='button'
            className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
            onClick={LogOut}
          >
            Logout
          </button>

          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
