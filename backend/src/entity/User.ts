import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserType = {
  username: string;
  email: string;
  password: string;
};

@Entity()
export class User implements UserType {
  constructor(data?: UserType) {
    if (data) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username: string;

  @Column()
  email!: string;

  @Column()
  password: string;

  /*
  @OneToMany(_type => Post, (post: Post) => post.user)
    posts!: Array<Post>

    @OneToMany(_type=> Comment, (comment: Comment) => comment.user)
    comments!: Array<Comment>;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    */
}
