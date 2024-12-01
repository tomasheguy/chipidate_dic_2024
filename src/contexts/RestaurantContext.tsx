import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Menu, Table, Availability } from '../types';
import { useAuth } from './AuthContext';

interface RestaurantContextType {
  menus: Menu[];
  tables: Table[];
  availability: Availability[];
  addMenu: (menu: Menu) => Promise<void>;
  updateMenu: (menu: Menu) => Promise<void>;
  deleteMenu: (menuId: string) => Promise<void>;
  addTable: (table: Table) => Promise<void>;
  updateTable: (table: Table) => Promise<void>;
  deleteTable: (tableId: string) => Promise<void>;
  updateAvailability: (availability: Availability) => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'owner') {
      loadRestaurantData();
    }
  }, [user]);

  const loadRestaurantData = async () => {
    if (!user) return;

    try {
      // Load menus
      const menusQuery = query(
        collection(db, 'menus'),
        where('restaurantId', '==', user.id)
      );
      const menusSnapshot = await getDocs(menusQuery);
      const menusData = menusSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Menu[];
      setMenus(menusData);

      // Load tables
      const tablesQuery = query(
        collection(db, 'tables'),
        where('restaurantId', '==', user.id)
      );
      const tablesSnapshot = await getDocs(tablesQuery);
      const tablesData = tablesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Table[];
      setTables(tablesData);

      // Load availability
      const availabilityQuery = query(
        collection(db, 'availability'),
        where('restaurantId', '==', user.id)
      );
      const availabilitySnapshot = await getDocs(availabilityQuery);
      const availabilityData = availabilitySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Availability[];
      setAvailability(availabilityData);
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    }
  };

  const addMenu = async (menu: Menu) => {
    if (!user) return;
    try {
      const menuRef = await addDoc(collection(db, 'menus'), {
        ...menu,
        restaurantId: user.id
      });
      setMenus([...menus, { ...menu, id: menuRef.id }]);
    } catch (error) {
      console.error('Error adding menu:', error);
      throw error;
    }
  };

  const updateMenu = async (menu: Menu) => {
    try {
      await updateDoc(doc(db, 'menus', menu.id), menu);
      setMenus(menus.map(m => m.id === menu.id ? menu : m));
    } catch (error) {
      console.error('Error updating menu:', error);
      throw error;
    }
  };

  const deleteMenu = async (menuId: string) => {
    try {
      await deleteDoc(doc(db, 'menus', menuId));
      setMenus(menus.filter(m => m.id !== menuId));
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  };

  const addTable = async (table: Table) => {
    if (!user) return;
    try {
      const tableRef = await addDoc(collection(db, 'tables'), {
        ...table,
        restaurantId: user.id
      });
      setTables([...tables, { ...table, id: tableRef.id }]);
    } catch (error) {
      console.error('Error adding table:', error);
      throw error;
    }
  };

  const updateTable = async (table: Table) => {
    try {
      await updateDoc(doc(db, 'tables', table.id), table);
      setTables(tables.map(t => t.id === table.id ? table : t));
    } catch (error) {
      console.error('Error updating table:', error);
      throw error;
    }
  };

  const deleteTable = async (tableId: string) => {
    try {
      await deleteDoc(doc(db, 'tables', tableId));
      setTables(tables.filter(t => t.id !== tableId));
    } catch (error) {
      console.error('Error deleting table:', error);
      throw error;
    }
  };

  const updateAvailability = async (newAvailability: Availability) => {
    if (!user) return;
    try {
      const availabilityRef = doc(db, 'availability', newAvailability.id);
      await updateDoc(availabilityRef, {
        ...newAvailability,
        restaurantId: user.id
      });
      
      setAvailability(prev => {
        const index = prev.findIndex(a => a.id === newAvailability.id);
        if (index === -1) {
          return [...prev, newAvailability];
        }
        const updated = [...prev];
        updated[index] = newAvailability;
        return updated;
      });
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  };

  return (
    <RestaurantContext.Provider value={{
      menus,
      tables,
      availability,
      addMenu,
      updateMenu,
      deleteMenu,
      addTable,
      updateTable,
      deleteTable,
      updateAvailability,
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};