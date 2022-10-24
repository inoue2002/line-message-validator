<script setup lang="ts">
type MessageType = 'reply' | 'push' | 'multicast' | 'narrowcast' | 'broadcast';
type Result = { data: string; details?: string };
definePageMeta({
  layout: 'default',
});

const accessToken = ref<string>();
const messageType = ref<MessageType>('reply');
const messageText = ref('[\n  {\n    "type":"text",\n    "text": "hello world!"\n  }\n]');
const messageObject = computed(() => {
  try {
    return JSON.parse(messageText.value);
  } catch (e) {}
});

const result = ref<Result>({ data: 'メッセージは配列で入力してください' });

const messageValidate = async () => {
  result.value = { data: '確認しています・・・' };
  console.log(accessToken.value);
  if (accessToken.value === undefined) {
    result.value = { data: 'チャネルアクセストークンが入力されていません' };
    return;
  }
  try {
    const res = await useAsyncData(
      'validate',
      () =>
        $fetch('/api/validate', {
          method: 'POST',
          body: {
            token: accessToken.value,
            messageType: messageType.value,
            messages: messageObject.value,
          },
        }),
      {
        initialCache: false,
      }
    );
    console.log(res.data.value?.statusCode);
    if (res.data.value == null) return;
    if (res.data.value.statusCode === 200) {
      result.value = { data: '使用できます🙆‍♂️' };
    } else {
      const error = res.data.value.error;
      console.log(error);
      result.value = { data: error.message, details: error.details };
    }
  } catch (error) {
    console.log('--');
    console.log(error);
    result.value = error.data;
  }
};
</script>
<template>
  <div>
    <div style="margin-left: 20px; margin-top: 20px">
      <a href="https://developers.line.biz/ja/news/2022/10/24/validate-message-objects-api/">公式ドキュメントを見る</a>
      <v-text-field
        style="width: 90%"
        v-model="accessToken"
        label="チャネルアクセストークン"
        variant="underlined"
      ></v-text-field>
      <v-select
        style="width: 90%"
        v-model="messageType"
        label="配信方法"
        variant="underlined"
        :items="['reply', 'push', 'multicast', 'narrowcast', 'broadcast']"
      ></v-select>
    </div>
    <MonacoEditor v-model="messageText" lang="json" class="editor" style="height: 300px; width: 90%" />
    <v-btn @click="messageValidate" style="margin-left: 20px"> 検証する </v-btn>
    <div style="width: 80%; margin-left: 20px">
      {{ result }}
    </div>

    <div style="margin-left: 20px; margin-top: 20px; margin-top: 5px">
      <a href="https://qiita.com/inoue2002/items/2c3257738edb7b4e3379">Flexメッセージが送信できない時に確認すること</a>
    </div>
    <Footer />
  </div>
</template>
