import { User } from "../../../auth/user.model";

export class Team {
    id: string;
    name: string;
    owner: User;
    members: User[];

    constructor(
        id: string,
        name: string,
        owner: User,
        members: User[],
    ) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.members = members;
    }
}
