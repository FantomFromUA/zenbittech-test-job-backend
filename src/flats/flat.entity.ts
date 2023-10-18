import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flats')
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  price: number;

  @Column()
  ticket: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  yield: number;

  @Column()
  days_left: number;

  @Column()
  sold: number;

  @Column()
  image: string;
}