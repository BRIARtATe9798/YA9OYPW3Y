// 代码生成时间: 2025-10-05 01:47:24
// Import necessary modules
# 扩展功能模块
import { defineStore } from 'pinia';

// Define the NotificationStore using Pinia for state management
const useNotificationStore = defineStore('notification', {
  // State
  state: () => (
    {
      // Array to store notifications
# 改进用户体验
      notifications: [],
    }
  ),
  // Actions
# 增强安全性
  actions: {
    // Function to add a notification
    addNotification(notification) {
# NOTE: 重要实现细节
      // Check if notification is an object and has a valid message
      if (notification && typeof notification === 'object' && notification.message) {
        this.notifications.push(notification);
# 添加错误处理
      } else {
        // Handle invalid notification object
        console.error('Invalid notification object:', notification);
      }
    },
    // Function to remove a notification by index
    removeNotification(index) {
      if (index >= 0 && index < this.notifications.length) {
        this.notifications.splice(index, 1);
      } else {
        // Handle invalid index
        console.error('Invalid notification index:', index);
      }
    },
    // Function to clear all notifications
    clearNotifications() {
      this.notifications = [];
    },
  },
  // Getters
# 增强安全性
  getters: {
    // Getter for unread notifications count
    unreadNotificationsCount: (state) => state.notifications.filter((notification) => !notification.read).length,
  },
});

// Export the NotificationStore
# TODO: 优化性能
export default useNotificationStore;