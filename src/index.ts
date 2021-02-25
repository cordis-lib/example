import { RoutingClient, createAmqp } from '@cordis/brokers';
import { buildRestRouter } from '@cordis/routers';
import { RestManager } from '@cordis/rest';
import { GatewayDispatchEvents } from 'discord-api-types/v8';
import type { DiscordEvents } from '@cordis/common';

const main = async () => {
  const manager = new RestManager(process.env.CORDIS_AUTH!);
  const router = buildRestRouter(manager);

  const { channel } = await createAmqp(process.env.CORDIS_AMQP_HOST!);

  const gateway = new RoutingClient<keyof DiscordEvents, DiscordEvents>(channel);

  gateway.on(GatewayDispatchEvents.MessageCreate, async message => {
    if (message.content === '!ping') {
      await router.channels[message.channel_id].messages.post({
        data: {
          content: 'Pong!'
        }
      });
    }
  });

  await gateway.init({ name: 'gateway', keys: [GatewayDispatchEvents.MessageCreate], queue: 'bot' });
};

void main();
