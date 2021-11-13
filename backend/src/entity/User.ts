import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import crypto from 'crypto';

export type UserType = {
  username: string;
  email: string;
  password: string;
};

@Entity()
export class User implements UserType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // cheack if that password changing or not
    if (
      this.password &&
      this.password.trim().length >= Number(process.env.MIN_PASSWORD_LENGTH!)
    ) {
      try {
        // Creating a unique salt for a particular user
        const salt = crypto.randomBytes(16).toString('hex');

        // Hash the salt and password with 1000 iterations, 64 length and sha512 digest
        const hash = crypto
          .pbkdf2Sync(this.password, salt, 1000, 64, 'sha512')
          .toString('hex');
        this.password = hash;
      } catch (e) {
        throw new Error('Issue hashing the password.');
      }
    }
  }
}
