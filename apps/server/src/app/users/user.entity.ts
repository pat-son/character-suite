import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'site_user' })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'site_user_id' })
    id: number;

    @Column()
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @CreateDateColumn({ name: 'create_timestamp' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'modify_timestamp' })
    updatedDate: Date;

    constructor(email: string, passwordHash: string, displayName: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
    }
}
