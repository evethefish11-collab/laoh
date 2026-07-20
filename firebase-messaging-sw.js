// ══════════════════════════════════════════════════════════════════
// firebase-messaging-sw.js
// ── ต้องวางไฟล์นี้ไว้ที่ "root" ของโดเมน (ระดับเดียวกับ index.html) ──
// ── เช่น https://laohmarket.com/firebase-messaging-sw.js ──
// ── ห้ามวางไว้ในโฟลเดอร์ย่อย ไม่งั้น browser จะหาไม่เจอ ──
// ══════════════════════════════════════════════════════════════════

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// ── ต้องใช้ config ชุดเดียวกับที่ใช้ในไฟล์เว็บหลัก (laoh-v...html) ──
firebase.initializeApp({
  apiKey: "AIzaSyDhU20JIFenMRJ7waw5oA4IHURt546PS-k",
  authDomain: "laoh-marketplace.firebaseapp.com",
  projectId: "laoh-marketplace",
  storageBucket: "laoh-marketplace.firebasestorage.app",
  messagingSenderId: "868290544419",
  appId: "1:868290544419:web:1a73eb44077681c80c4296",
  measurementId: "G-MY1JV7V280"
});

const messaging = firebase.messaging();

// ── จัดการข้อความที่มาถึงตอนแอป/แท็บปิดอยู่ หรือทำงานอยู่เบื้องหลัง (background) ──
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const notificationTitle = (payload.notification && payload.notification.title) || "LaoH ລາວເຮັດ";
  const notificationOptions = {
    body: (payload.notification && payload.notification.body) || "",
    icon: "/icon-192.png", // TODO: เปลี่ยนเป็น path ไอคอนแอปจริงของคุณ
    badge: "/icon-192.png",
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ── ตอนผู้ใช้กดที่การแจ้งเตือน ให้เปิด/โฟกัสหน้าเว็บ ──
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
