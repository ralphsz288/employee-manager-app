export class Member {
    id: string;
    firstName: string;
    lastName: string;
    email: string | any;
    imageUrl: string;
    role: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        imageUrl: string,
        role: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl
        this.role = role;
    }
}
