import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UsersRepository } from './users.repository';
import {  IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log("createUserDto");
    console.log(createUserDto);

    if (!createUserDto.email && createUserDto.phoneNumber) {
      return new BadRequestException("Please Provide either Phone Number or email id ")

    } else {
      if (createUserDto["phoneNumber"]) {

      } else {
        return new BadRequestException("Please Provide either ")
      }
    }


    
    return 'This action adds a new user';
  }

  getUsers() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
