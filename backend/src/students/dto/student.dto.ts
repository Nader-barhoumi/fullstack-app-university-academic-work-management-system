import {Expose} from "class-transformer";

export class StudentDto {
    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    profile_picture: string;

    @Expose()
    email: string;

    @Expose()
    student_id: string;
    
}