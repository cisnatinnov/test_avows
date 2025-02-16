const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Adjust this to your Kafka broker address
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('Producer connected.');

  // Send message from user input
  process.stdin.on('data', async (input) => {
    const message = input.toString().trim();
    if (message === 'exit') {
      await producer.disconnect();
      console.log('Producer disconnected.');
      process.exit(0);
    }
    
    try {
      await producer.send({
        topic: 'my-topic', // Topic name
        messages: [
          { value: message },
        ],
      });
      console.log(`Message sent: ${message}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
};

runProducer();
