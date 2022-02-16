// backend/src/index.ts
import { createUser, showUser, User } from 'shared';

const user: User = createUser('eddie', 1000);

showUser(user);