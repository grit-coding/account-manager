import { IsString, IsOptional, IsNumber } from 'class-validator';

export interface UpdateAccountDtoInterface {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: number;
    address?: string;
}

export class UpdateAccountDto {
    constructor({ firstName, lastName, email, phoneNumber, address }: UpdateAccountDtoInterface) {
        this.firstName = firstName
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    @IsOptional()
    @IsString()
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsNumber()
    readonly phoneNumber?: number;

    @IsOptional()
    @IsString()
    readonly address?: string;
}