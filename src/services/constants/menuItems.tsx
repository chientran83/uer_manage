import { NavLink } from 'react-router-dom';

export const menuItems = [
    {
        key: 'center',
        label: <NavLink to="/">
            List
        </NavLink>
    },
    {
        key: 'settings',
        label: <NavLink to="create">
            Create
        </NavLink>
    }
];