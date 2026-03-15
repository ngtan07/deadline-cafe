import { useState, useMemo } from 'react';

export const useUserFilter = (usersList) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = useMemo(() => {
    if (!usersList) return [];
    
    let result = usersList;

    // Search by name or email
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
      );
    }

    // Filter by role
    if (roleFilter) {
      result = result.filter(user => String(user.role).toLowerCase() === String(roleFilter).toLowerCase());
    }

    return result;
  }, [usersList, searchQuery, roleFilter]);

  return {
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    filteredUsers
  };
};
