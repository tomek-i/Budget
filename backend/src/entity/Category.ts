import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

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

  @Column({ unique: true })
  title: string;

  /**
   * the description columns
   */
  @Column()
  description?: string;

  //TODO: add subcategories relation
  @Column({ nullable: true })
  icon?: string;

  @OneToMany(
    (_type) => Transaction,
    (transaction: Transaction) => transaction.category,
  )
  transactions?: Array<Transaction>;
}
