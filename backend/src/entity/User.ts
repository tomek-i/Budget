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
  mobile?: string;
  fisrtname?: string;
  lastname?: string;
};

@Entity()
export class User implements UserType {
  constructor(data?: UserType) {
    if (data) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
    }
    this.salt = this.salt = crypto.randomBytes(16).toString('hex');
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email!: string;

  //TODO: select false should be OK however with type ORM you need to specidy manually the columns then you want to return if you DO need the password column
  @Column(/*{ select: false }*/)
  password!: string;

  //TODO: select false should be OK however with type ORM you need to specidy manually the columns then you want to return if you DO need the password column
  @Column({
    /*select: false*/
  })
  salt?: string;

  @Column({ unique: true, nullable: true })
  mobile?: string;

  @Column({ nullable: true })
  /**
   * ID which is linked to basiq API
   */
  basiqId?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async normalizeMobile(): Promise<void> {
    if (this.mobile) {
      this.mobile = this.mobile.replaceAll(' ', '');
    }
  }

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
        if (!this.salt) this.salt = crypto.randomBytes(16).toString('hex');

        // Hash the salt and password with 1000 iterations, 64 length and sha512 digest
        const hash = crypto
          .pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512')
          .toString('hex');
        this.password = hash;
      } catch (e) {
        throw new Error('Issue hashing the password.');
      }
    }
  }

  async checkPassword(passwordToCheck: string) {
    // Hash the salt and password with 1000 iterations, 64 length and sha512 digest
    const hash = crypto
      .pbkdf2Sync(passwordToCheck, this.salt ?? '', 1000, 64, 'sha512')
      .toString('hex');

    return hash === this.password;
  }
}
