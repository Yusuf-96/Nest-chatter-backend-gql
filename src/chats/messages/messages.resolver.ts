import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards()
  async createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput, @CurrentUser() user:TokenPayload) {
    return this.messagesService.create(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
    return this.messagesService.update(updateMessageInput.id, updateMessageInput);
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }
}
