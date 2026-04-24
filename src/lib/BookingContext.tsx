import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Session } from '../types';

interface BookingContextType {
  bookings: Session[];
  addBooking: (booking: Session) => void;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Session[]>([
    {
      id: "b1",
      mentorName: "Ananya Sharma",
      title: "System Design Basics",
      date: "May 24, 2024",
      time: "7:30 PM",
      duration: 30,
      status: "confirmed"
    } as any
  ]);

  const addBooking = (booking: Session) => {
    setBookings(prev => [booking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
