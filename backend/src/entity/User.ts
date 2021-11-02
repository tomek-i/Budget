import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserType = {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};
@Entity()
export class User implements UserType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username: string;

  @Column()
  email!: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  age?: number;

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
