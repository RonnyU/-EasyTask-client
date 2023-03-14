import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

const useAuth = () => {
  let context = useContext(AuthContext);
  // If context is undefined, we know we used RadioGroupItem
  // outside of our provider so we can throw a more helpful
  // error!
  if (context === undefined) {
    throw Error(
      'useAuth must be used inside of a AuthProvider, ' +
        'otherwise it will not function correctly.'
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
};

export default useAuth;
