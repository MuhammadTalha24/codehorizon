'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function NotificationBell() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [fadingOut, setFadingOut] = useState<string | null>(null);

  const notifications = useQuery(api.notifications.getNotifications, {
    userId: user?.id || '',
  });

  const markAsRead = useMutation(api.notifications.markNotificationRead);

  // 🟢 Only show unread notifications
  const unread = (notifications || []).filter((n) => !n.isRead);

  const handleMarkAsRead = async (id: string) => {
  setFadingOut(id); // trigger animation
  // Wait longer than CSS duration for a smooth transition
  setTimeout(async () => {
    await markAsRead({ notificationId: id });
    setFadingOut(null);
  }, 500); // match with CSS transition time
};


  return (
    <div className="relative mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-white hover:text-blue-400 cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {unread.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[340px] bg-[#111] border border-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-3 text-sm font-semibold border-b border-gray-700 text-white">
            Notifications
          </div>

          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-700">
            {/* Show message if no unread notifications */}
            {unread.length === 0 && (
              <li className="p-3 text-gray-400 text-sm">No unread notifications</li>
            )}

            {unread.map((n) => (
              <li
               key={n._id}
  className={`p-3 text-sm text-white space-y-1 transition-all duration-500 ease-in-out overflow-hidden
    bg-gray-800
    ${fadingOut === n._id ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[200px]'}
  `}
              >
                <div>
                  <strong>{n.senderName}</strong>{' '}
                  {n.type === 'comment' ? 'commented on' : 'starred'} your snippet
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <Link
                    href={`/snippets/${n.snippetId}`}
                    className="text-blue-400 text-xs hover:underline"
                  >
                    View snippet
                  </Link>

                  <button
                    onClick={() => handleMarkAsRead(n._id)}
                    className="text-gray-400 hover:text-green-400 text-xs cursor-pointer"
                  >
                    Mark as read
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
