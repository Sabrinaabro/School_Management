import { useSelector } from 'react-redux';

const useRole = () => {
    const state = useSelector((state) => state);
    console.log('Redux State:', state);
    const role = state.users ? state.users.role : null;
    return role;
};

export default useRole;