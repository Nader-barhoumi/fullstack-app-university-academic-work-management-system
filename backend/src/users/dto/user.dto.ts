import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    profile_picture: string;

    @Expose()
    email: string;

}
