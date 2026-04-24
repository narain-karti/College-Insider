/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import MentorProfile from "./pages/MentorProfile";
import Bookings from "./pages/Bookings";
import Chat from "./pages/Chat";
import Wishlist from "./pages/Wishlist";
import MentorOnboarding from "./pages/MentorOnboarding";
import { BookingProvider } from "./lib/BookingContext";
import { Layout } from "./components/layout/Layout";

import Landing from "./pages/Landing";

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/mentor/:id" element={<MentorProfile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/mentor-onboarding" element={<MentorOnboarding />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
