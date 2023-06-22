import { IsString, IsOptional, IsNumber } from 'class-validator';

export interface CreateAccountDtoInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: number;
    address?: string;
}

export class CreateAccountDto {
    constructor({ firstName, lastName, email, phoneNumber, address }: CreateAccountDtoInterface) {
        this.firstName = firstName
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly email: string;

    @IsOptional()
    @IsNumber()
    readonly phoneNumber?: number;

    @IsOptional()
    @IsString()
    readonly address?: string;
}