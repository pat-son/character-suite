import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    displayName: string;

    constructor(email: string, passwordHash: string, displayName: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
    }
}
