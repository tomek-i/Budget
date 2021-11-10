import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type CategoryType = {
  title: string;
  description?: string;
  icon?: string;
  buffer?: Buffer;
};

/**
 * Category to classify transactions together.
 *
 * @class
 * @classdesc This is a description of the Category class.
 *
 * @property {string} id the identifier
 * @property {string} title the tile of the category
 * @property {string} description? the description
 */
@Entity()
export class Category implements CategoryType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;
  /**
   * the description columns
   */
  @Column()
  description?: string;

  //TODO: add subcategories relation
  @Column({ nullable: true })
  icon?: string;
}
