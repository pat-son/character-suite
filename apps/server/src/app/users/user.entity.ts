import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'site_user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'site_user_id' })
    id: string;

    @Column()
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    constructor(email: string, passwordHash: string, displayName: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
    }
}
