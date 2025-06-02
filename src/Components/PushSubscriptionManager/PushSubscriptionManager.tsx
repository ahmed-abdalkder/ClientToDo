import {  useEffect } from 'react';
import axios from 'axios';
 

const PUBLIC_KEY =  import.meta.env.VITE_VAPID_PUBLIC_KEY  
const  token  = sessionStorage.getItem('tkn')
 
   
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function subscribeUserToPush() {
  try {
    const registration = await navigator.serviceWorker.ready;
 
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
       
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY ),
      });
    
    } else {
      console.log(' Using existing subscription');
    }

    const subscriptionToSend = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
        auth: arrayBufferToBase64(subscription.getKey('auth')),
      },
    };
if (!token) { return }
    await axios.post('https://server-to-do-lake.vercel.app/subscriptions/api/save-subscription', subscriptionToSend, {
      headers: {
        token,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error(' Error during push subscription:', error);
  }
}

const PushSubscriptionManager = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          subscribeUserToPush();
        } else {
          console.warn(' Notification permission denied');
        }
      });
    }
  }, []);

  return null;
};

export default PushSubscriptionManager;

