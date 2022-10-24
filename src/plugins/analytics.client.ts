import { defineNuxtPlugin } from '#app';
import VueTag from 'vue-gtag';

// Nuxtプラグインの登録
export default defineNuxtPlugin((nuxtApp) => {
  // ルーター取得
  const router = useRouter();

  // Vue登録
  nuxtApp.vueApp.use(
    VueTag,
    {
      appName: 'std9', // サイトの名称
      pageTrackerScreenviewEnabled: true,
      config: { id: `G-FRP4RF4FQZ` },
    },
    router
  );
});
