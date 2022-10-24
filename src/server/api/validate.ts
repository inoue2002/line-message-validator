export default defineEventHandler(async (event) => {
  const { token, messageType, messages } = await useBody(event);
  const mainUrl = 'https://api.line.me/v2/bot/message/validate/';
  try {
    await $fetch(mainUrl + messageType, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', `Bearer ${token}`],
      ],
      body: { messages },
    });
    return { statusCode: 200 };
  } catch (error) {
    return { statusCode: 400, error: error.data };
  }
});
