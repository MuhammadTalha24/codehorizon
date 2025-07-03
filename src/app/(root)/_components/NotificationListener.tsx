'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';

export default function NotificationListener() {
  const { user } = useUser();
  const [latest, setLatest] = useState<any[]>([]);
  const seenRef = useRef(new Set());

  const allNotifications = useQuery(api.notifications.getNotifications, {
    userId: user?.id || '',
  });

  useEffect(() => {
    if (!allNotifications) return;

    const unread = allNotifications.filter(n => !n.isRead);

    // Check for new notifications
    unread.forEach(n => {
      if (!seenRef.current.has(n._id)) {
        seenRef.current.add(n._id);
        toast(`${n.senderName} ${n.type === 'comment' ? 'commented on' : 'starred'} your snippet`, {
          action: {
            label: 'View',
            onClick: () => {
              window.location.href = `/snippets/${n.snippetId}`;
            },
          },
        });
      }
    });

    setLatest(unread);
  }, [allNotifications]);

  return null;
}
