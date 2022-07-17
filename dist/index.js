/******/ (() => { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
const triggerSubscription = document.getElementById('trigger-subscription');
triggerSubscription.addEventListener('click', () => {
  registWebPush();
});

const triggerPush = document.getElementById('trigger-push');
triggerPush.addEventListener('click', () => {
  tryPush();
});

const registWebPush = async () => {
  registServiceWorker();
  registBroadcastChannel();
};

const tryPush = async () => {
  await fetch('/api/push', {
    method: 'POST',
    body: JSON.stringify({ title: 'Push notifications From Server sddsds' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const registServiceWorker = async () => {
  // VAPID keys should be generated only once. => same with variables.env
  const publicVapidKey = 'BAJQxEDFDWhOHnjtXw2AqcYXJlS0oGYpfJvwsOxCTYq8gM1_vvkyyL4kl4rIdytt5zhvVPZHyGeP-CeD8Szc69Y';

  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('waiting for acceptance');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // send [subscription] json for server save
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('acceptance complete');
  } else {
    console.error('Service workers are not supported in this browser');
  }
};

const registBroadcastChannel = () => {
  const channelGuilId = 'd235a86e-bc13-4539-b4a5-077de485a2fd';
  const broadcast = new BroadcastChannel(channelGuilId);
  broadcast.onmessage = (event) => {
    console.log(event);
  };
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./client/index.scss ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IjtVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnREFBZ0Q7QUFDM0U7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6RUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLW5vZGVtb24taHRtbC1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLW5vZGVtb24taHRtbC1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stbm9kZW1vbi1odG1sLWpzLy4vY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stbm9kZW1vbi1odG1sLWpzLy4vY2xpZW50L2luZGV4LnNjc3M/MzhjMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgdHJpZ2dlclN1YnNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmlnZ2VyLXN1YnNjcmlwdGlvbicpO1xyXG50cmlnZ2VyU3Vic2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHJlZ2lzdFdlYlB1c2goKTtcclxufSk7XHJcblxyXG5jb25zdCB0cmlnZ2VyUHVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmlnZ2VyLXB1c2gnKTtcclxudHJpZ2dlclB1c2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdHJ5UHVzaCgpO1xyXG59KTtcclxuXHJcbmNvbnN0IHJlZ2lzdFdlYlB1c2ggPSBhc3luYyAoKSA9PiB7XHJcbiAgcmVnaXN0U2VydmljZVdvcmtlcigpO1xyXG4gIHJlZ2lzdEJyb2FkY2FzdENoYW5uZWwoKTtcclxufTtcclxuXHJcbmNvbnN0IHRyeVB1c2ggPSBhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgZmV0Y2goJy9hcGkvcHVzaCcsIHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0aXRsZTogJ1B1c2ggbm90aWZpY2F0aW9ucyBGcm9tIFNlcnZlciBzZGRzZHMnIH0pLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlZ2lzdFNlcnZpY2VXb3JrZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgLy8gVkFQSUQga2V5cyBzaG91bGQgYmUgZ2VuZXJhdGVkIG9ubHkgb25jZS4gPT4gc2FtZSB3aXRoIHZhcmlhYmxlcy5lbnZcclxuICBjb25zdCBwdWJsaWNWYXBpZEtleSA9ICdCQUpReEVERkRXaE9Ibmp0WHcyQXFjWVhKbFMwb0dZcGZKdndzT3hDVFlxOGdNMV92dmt5eUw0a2w0cklkeXR0NXpodlZQWkh5R2VQLUNlRDhTemM2OVknO1xyXG5cclxuICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xyXG4gICAgY29uc3QgcmVnaXN0ZXIgPSBhd2FpdCBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJywge1xyXG4gICAgICBzY29wZTogJy8nLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ3dhaXRpbmcgZm9yIGFjY2VwdGFuY2UnKTtcclxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGF3YWl0IHJlZ2lzdGVyLnB1c2hNYW5hZ2VyLnN1YnNjcmliZSh7XHJcbiAgICAgIHVzZXJWaXNpYmxlT25seTogdHJ1ZSxcclxuICAgICAgYXBwbGljYXRpb25TZXJ2ZXJLZXk6IHVybEJhc2U2NFRvVWludDhBcnJheShwdWJsaWNWYXBpZEtleSksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzZW5kIFtzdWJzY3JpcHRpb25dIGpzb24gZm9yIHNlcnZlciBzYXZlXHJcbiAgICBhd2FpdCBmZXRjaCgnL2FwaS9zdWJzY3JpYmUnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzdWJzY3JpcHRpb24pLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coJ2FjY2VwdGFuY2UgY29tcGxldGUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcignU2VydmljZSB3b3JrZXJzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlZ2lzdEJyb2FkY2FzdENoYW5uZWwgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2hhbm5lbEd1aWxJZCA9ICdkMjM1YTg2ZS1iYzEzLTQ1MzktYjRhNS0wNzdkZTQ4NWEyZmQnO1xyXG4gIGNvbnN0IGJyb2FkY2FzdCA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKGNoYW5uZWxHdWlsSWQpO1xyXG4gIGJyb2FkY2FzdC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdXJsQmFzZTY0VG9VaW50OEFycmF5ID0gKGJhc2U2NFN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHBhZGRpbmcgPSAnPScucmVwZWF0KCg0IC0gKGJhc2U2NFN0cmluZy5sZW5ndGggJSA0KSkgJSA0KTtcclxuICBjb25zdCBiYXNlNjQgPSAoYmFzZTY0U3RyaW5nICsgcGFkZGluZykucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuXHJcbiAgY29uc3QgcmF3RGF0YSA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XHJcbiAgY29uc3Qgb3V0cHV0QXJyYXkgPSBuZXcgVWludDhBcnJheShyYXdEYXRhLmxlbmd0aCk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3RGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgb3V0cHV0QXJyYXlbaV0gPSByYXdEYXRhLmNoYXJDb2RlQXQoaSk7XHJcbiAgfVxyXG4gIHJldHVybiBvdXRwdXRBcnJheTtcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9