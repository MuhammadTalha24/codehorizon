import { query , mutation } from "./_generated/server";
import { v } from "convex/values";

export const getNotifications = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_recipient", (q) =>
        q.eq("recipientUserId", args.userId)
      )
     
      .order("desc")
      .collect();
  },
});

export const markNotificationRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) throw new Error("Notification not found");

    await ctx.db.patch(args.notificationId, {
      isRead: true,
    });
  },
});
